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

            if (user.role !== 'Creator') {
                return res
                    .status(404)
                    .json(new ApiError(404, 'User is not a creator'));
            }

            await prisma.youtubeChannel.create({
                data: {
                    ownerId: user.id!,
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

            await prisma.youTuberEnvironment.create({
                data: {
                    ownerId: user.id!,
                },
            });

            const encryptionKey = TokenEncryption.generateKey();
            const tokenEncryption = new TokenEncryption(encryptionKey);
            const encryptedToken = tokenEncryption.encrypt(
                token.tokens.access_token!
            );

            await prisma.userYoutubeToken.create({
                data: {
                    userId: user.id!,
                    encryptionKey,
                    encryptedToken: encryptedToken.encryptedToken,
                    iv: encryptedToken.iv,
                    authTag: encryptedToken.authTag,
                },
            });

            return res
                .status(200)
                .json(
                    new ApiResponse(200, 'YouTube token stored successfully')
                );
        } catch (error) {
            console.error('Error processing YouTube callback:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

const uploadVideoToYoutube = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id, videoId } = req.body;

        if (!id || !videoId) {
            return res
                .status(400)
                .json(new ApiError(400, 'Missing required fields'));
        }

        try {
            const youtubeVideo = await prisma.youTubeVideo.findFirst({
                where: { id: videoId },
            });
            console.log(youtubeVideo);
            const youtubeChannel = await prisma.youtubeChannel.findFirst({
                where: { ownerId: id },
            });
            console.log(youtubeChannel);
            if (!youtubeChannel) {
                return res
                    .status(400)
                    .json(new ApiError(400, 'YouTube channel not found'));
            }

            const youtubeToken = await prisma.userYoutubeToken.findFirst({
                where: { userId: id },
            });
            console.log(youtubeToken);
            if (!youtubeToken) {
                return res
                    .status(400)
                    .json(new ApiError(400, 'YouTube token not found'));
            }

            const tokenEncryption = new TokenEncryption(
                youtubeToken.encryptionKey
            );
            const decryptedYouTubeToken = tokenEncryption.decrypt({
                encryptedToken: youtubeToken.encryptedToken,
                iv: youtubeToken.iv,
                authTag: youtubeToken.authTag,
            });
            console.log(decryptedYouTubeToken);

            const oauth2Client = new OAuth2Client(
                process.env.YOUTUBE_CLIENT_ID!,
                process.env.YOUTUBE_CLIENT_SECRET!,
                process.env.YOUTUBE_REDIRECT_URI!
            );

            oauth2Client.setCredentials({
                access_token: decryptedYouTubeToken,
            });

            const youtube = google.youtube({
                version: 'v3',
                auth: oauth2Client,
            });

            if (youtubeVideo?.videoString) {
                const response = await axios({
                    url: youtubeVideo.videoString,
                    method: 'GET',
                    responseType: 'stream',
                });
                console.log(response);
                const tempFilePath = path.join(__dirname, 'temp.mp4');
                console.log(tempFilePath);
                const tempFile = fs.createWriteStream(tempFilePath);
                console.log(tempFile);
                await streamPipeline(response.data, tempFile);
                console.log('done');

                const uploadResponse = await youtube.videos.insert({
                    part: ['snippet', 'status'],
                    requestBody: {
                        snippet: {
                            title: youtubeVideo.title,
                            description: youtubeVideo.description,
                            categoryId: '22', // Topic category
                            tags: ['gossipu', 'creator', 'video'],
                        },
                        status: {
                            privacyStatus: 'private',
                        },
                    },
                    media: {
                        body: fs.createReadStream(tempFilePath),
                    },
                });
                console.log(uploadResponse);

                fs.unlinkSync(tempFilePath);

                return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            200,
                            'YouTube video uploaded successfully'
                        )
                    );
            } else {
                return res
                    .status(400)
                    .json(new ApiError(400, 'Invalid video string'));
            }
        } catch (error) {
            console.error('Error uploading video to YouTube:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

export { youtubeAuth, youtubeCallback, uploadVideoToYoutube };
