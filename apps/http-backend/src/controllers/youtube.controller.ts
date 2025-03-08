import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { TokenEncryption } from '../lib/encryption';
import { ApiError } from '../utils/api-error';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import { ApiResponse } from '../utils/api-response';
import prisma from '@repo/db';
import { google } from 'googleapis';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream';
import util from 'util';

const streamPipeline = util.promisify(pipeline);

const youtubeAuth = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id: userId } = req.body;

        if (!userId) {
            return res
                .status(400)
                .json(new ApiError(400, 'User ID is required'));
        }

        try {
            const oauth2Client = new OAuth2Client(
                process.env.YOUTUBE_CLIENT_ID!,
                process.env.YOUTUBE_CLIENT_SECRET!,
                process.env.YOUTUBE_REDIRECT_URI!
            );

            const stateObj = {
                userId,
                csrf: crypto.randomBytes(16).toString('hex'),
            };

            const state = Buffer.from(JSON.stringify(stateObj)).toString(
                'base64'
            );

            const scopes = [
                'https://www.googleapis.com/auth/youtube.readonly',
                'https://www.googleapis.com/auth/youtube.upload',
            ];

            const authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopes,
                prompt: 'consent',
                state,
            });

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        { authUrl },
                        'YouTube auth URL generated'
                    )
                );
        } catch (error) {
            console.error('Error generating YouTube auth URL:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

const youtubeCallback = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        try {
            const { code, state } = req.query;
            if (!code || !state) {
                return res
                    .status(400)
                    .json(
                        new ApiError(
                            400,
                            'Authorization code and state are required'
                        )
                    );
            }

            let userId;
            try {
                const stateObj = JSON.parse(
                    Buffer.from(state as string, 'base64').toString('utf-8')
                );
                userId = stateObj.userId;
            } catch (error) {
                return res
                    .status(400)
                    .json(new ApiError(400, 'Invalid state format'));
            }

            const oauth2Client = new OAuth2Client(
                process.env.YOUTUBE_CLIENT_ID!,
                process.env.YOUTUBE_CLIENT_SECRET!,
                process.env.YOUTUBE_REDIRECT_URI!
            );

            const token = await oauth2Client.getToken(code as string);
            oauth2Client.setCredentials(token.tokens);

            const youtube = google.youtube({
                version: 'v3',
                auth: oauth2Client,
            });

            const response = await youtube.channels.list({
                part: ['snippet', 'contentDetails', 'statistics'],
                mine: true,
            });

            const channel = response.data.items?.[0];
            if (!channel) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'No YouTube channel found'));
            }

            const user = await prisma.user.findFirst({
                where: { id: userId },
            });
            if (!user) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'User not found'));
            }

            const creator = await prisma.youTubeCreator.findFirst({
                where: { ownerId: user.id },
            });
            if (!creator) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Creator not found'));
            }

            await prisma.youtubeChannel.create({
                data: {
                    ownerId: creator.id!,
                    channelId: channel.id!,
                    channelTitle: channel.snippet?.title!,
                    channelDescription: channel.snippet?.description || '',
                    subscriberCount: parseInt(
                        channel.statistics?.subscriberCount || '0'
                    ),
                    videoCount: parseInt(channel.statistics?.videoCount || '0'),
                    thumbnailUrl: channel.snippet?.thumbnails?.high?.url || '',
                },
            });

            const encryptionKey = TokenEncryption.generateKey();
            const tokenEncryption = new TokenEncryption(encryptionKey);
            const encryptedAcessToken = tokenEncryption.encrypt(
                token.tokens.access_token!
            );
            const encryptedRefreshToken = tokenEncryption.encrypt(
                token.tokens.refresh_token!
            );

            await prisma.userYoutubeToken.deleteMany({
                where: { userId: creator.id },
            });

            await prisma.userYoutubeToken.create({
                data: {
                    userId: creator.id!,
                    encryptionKey,
                    accessToken: encryptedAcessToken.encryptedToken,
                    accessIv: encryptedAcessToken.iv,
                    accessAuthTag: encryptedAcessToken.authTag,
                    refreshToken: encryptedRefreshToken.encryptedToken,
                    refreshIv: encryptedRefreshToken.iv,
                    refreshAuthTag: encryptedRefreshToken.authTag,
                },
            });

            return res.redirect(`${process.env.NEXT_PUBLIC_WEB_URL}/dashboard`);
        } catch (error) {
            console.error('Error processing YouTube callback:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

const uploadVideoToYouTubeHelper = async (id: string, videoId: string) => {
    try {
        // Fetch video and user token details
        const youtubeVideo = await prisma.youTubeVideo.findFirst({
            where: { id: videoId },
        });

        console.log('Uploading video with metadata:', {
            title: youtubeVideo?.title,
            description: youtubeVideo?.description,
            category: youtubeVideo?.category,
            tags: youtubeVideo?.tags,
        });

        if (!youtubeVideo) {
            throw new Error('YouTube video not found');
        }

        const youtubeToken = await prisma.userYoutubeToken.findFirst({
            where: { userId: id },
        });

        if (!youtubeToken) {
            throw new Error('YouTube token not found');
        }

        // Decrypt access token
        const tokenEncryption = new TokenEncryption(youtubeToken.encryptionKey);
        const decryptedAccessToken = tokenEncryption.decrypt({
            encryptedToken: youtubeToken.accessToken,
            iv: youtubeToken.accessIv,
            authTag: youtubeToken.accessAuthTag,
        });

        const decryptedRefreshToken = youtubeToken.refreshToken
            ? tokenEncryption.decrypt({
                  encryptedToken: youtubeToken.refreshToken,
                  iv: youtubeToken.refreshIv,
                  authTag: youtubeToken.refreshAuthTag,
              })
            : null;

        const oauth2Client = new OAuth2Client(
            process.env.YOUTUBE_CLIENT_ID!,
            process.env.YOUTUBE_CLIENT_SECRET!,
            process.env.YOUTUBE_REDIRECT_URI!
        );

        oauth2Client.setCredentials({
            access_token: decryptedAccessToken,
            refresh_token: decryptedRefreshToken || undefined,
        });

        let newAccessToken = decryptedAccessToken!;

        try {
            const tokenInfo =
                await oauth2Client.getTokenInfo(decryptedAccessToken);
            console.log('Token Info:', tokenInfo);
        } catch (tokenError) {
            if (!decryptedRefreshToken) {
                console.log('No refresh token available');
            }
            try {
                const { credentials } = await oauth2Client.refreshAccessToken();
                newAccessToken = credentials.access_token!;
                oauth2Client.setCredentials({
                    access_token: newAccessToken,
                });
            } catch (refreshError) {
                console.log('Failed to refresh access token');
            }
        }

        const youtube = google.youtube({
            version: 'v3',
            auth: oauth2Client,
        });

        if (youtubeVideo.videoString) {
            // Download video from Cloudinary or storage URL
            const response = await axios({
                url: youtubeVideo.videoString,
                method: 'GET',
                responseType: 'stream',
            });

            const tempFilePath = path.join(__dirname, 'temp.mp4');
            const tempFile = fs.createWriteStream(tempFilePath);
            await streamPipeline(response.data, tempFile);

            // Upload video to YouTube
            const uploadResponse = await youtube.videos.insert({
                part: ['snippet', 'status'],
                requestBody: {
                    snippet: {
                        title:
                            youtubeVideo.title?.toString() || 'Untitled Video', // ✅ Default value
                        description:
                            youtubeVideo.description ||
                            'No description provided.',
                        categoryId: youtubeVideo.category || '22', // Default to 'Entertainment' if missing
                        tags: youtubeVideo.tags || [],
                    },
                    status: {
                        privacyStatus: youtubeVideo.visibility,
                    },
                },
                media: {
                    body: fs.createReadStream(tempFilePath),
                },
            });

            // Clean up temp file
            fs.unlinkSync(tempFilePath);

            return uploadResponse.data;
        } else {
            throw new Error('Invalid video string');
        }
    } catch (error) {
        console.error('Error uploading video to YouTube:', error);
        throw error;
    }
};

const getYoutubeChannelDetails = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id } = req.body;

        try {
            const youtubeCreator = await prisma.youTubeCreator.findFirst({
                where: { ownerId: id },
            });
            if (!youtubeCreator) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Creator not found'));
            }

            const youtubeToken = await prisma.userYoutubeToken.findFirst({
                where: { userId: youtubeCreator.id },
            });
            if (!youtubeToken) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'YouTube token not found'));
            }

            const tokenEncryption = new TokenEncryption(
                youtubeToken.encryptionKey
            );

            const decryptedAccessToken = tokenEncryption.decrypt({
                encryptedToken: youtubeToken.accessToken,
                iv: youtubeToken.accessIv,
                authTag: youtubeToken.accessAuthTag,
            });

            const decryptedRefreshToken = youtubeToken.refreshToken
                ? tokenEncryption.decrypt({
                      encryptedToken: youtubeToken.refreshToken,
                      iv: youtubeToken.refreshIv,
                      authTag: youtubeToken.refreshAuthTag,
                  })
                : null;

            const oauth2Client = new OAuth2Client(
                process.env.YOUTUBE_CLIENT_ID!,
                process.env.YOUTUBE_CLIENT_SECRET!,
                process.env.YOUTUBE_REDIRECT_URI!
            );

            oauth2Client.setCredentials({
                access_token: decryptedAccessToken,
                refresh_token: decryptedRefreshToken || undefined,
            });

            let newAccessToken = decryptedAccessToken!;

            try {
                const tokenInfo =
                    await oauth2Client.getTokenInfo(decryptedAccessToken);
                console.log('Token Info:', tokenInfo);
            } catch (tokenError) {
                if (!decryptedRefreshToken) {
                    return res
                        .status(401)
                        .json(
                            new ApiError(
                                401,
                                'Access token invalid and no refresh token available'
                            )
                        );
                }
                try {
                    const { credentials } =
                        await oauth2Client.refreshAccessToken();
                    newAccessToken = credentials.access_token!;
                    oauth2Client.setCredentials({
                        access_token: newAccessToken,
                    });
                } catch (refreshError) {
                    return res
                        .status(401)
                        .json(
                            new ApiError(401, 'Failed to refresh access token')
                        );
                }
            }

            const youtube = google.youtube({
                version: 'v3',
                auth: oauth2Client,
            });

            const response = await youtube.channels.list({
                part: ['snippet', 'contentDetails', 'statistics'],
                mine: true,
            });

            const channel = response.data.items?.[0];

            if (!channel) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'No YouTube channel found'));
            }

            const youtubeChannel = await prisma.youtubeChannel.findFirst({
                where: { ownerId: youtubeCreator.id },
            });

            const updatedChannel = await prisma.youtubeChannel.upsert({
                where: { id: youtubeChannel?.id || '' },
                update: {
                    channelId: channel.id,
                    channelTitle: channel.snippet?.title,
                    channelDescription: channel.snippet?.description,
                    subscriberCount: parseInt(
                        channel.statistics?.subscriberCount || '0'
                    ),
                    videoCount: parseInt(channel.statistics?.videoCount || '0'),
                    thumbnailUrl: channel.snippet?.thumbnails?.high?.url,
                },
                create: {
                    ownerId: youtubeCreator.id,
                    channelId: channel.id,
                    channelTitle: channel.snippet?.title,
                    channelDescription: channel.snippet?.description,
                    subscriberCount: parseInt(
                        channel.statistics?.subscriberCount || '0'
                    ),
                    videoCount: parseInt(channel.statistics?.videoCount || '0'),
                    thumbnailUrl: channel.snippet?.thumbnails?.high?.url,
                },
            });

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        updatedChannel,
                        'YouTube channel details fetched and stored successfully'
                    )
                );
        } catch (error) {
            console.error('Error fetching YouTube channel details:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

export {
    youtubeAuth,
    youtubeCallback,
    getYoutubeChannelDetails,
    uploadVideoToYouTubeHelper,
};
