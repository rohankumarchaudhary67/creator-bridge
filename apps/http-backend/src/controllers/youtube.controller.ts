import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { TokenEncryption } from '../lib/encryption';
import { ApiError } from '../utils/api-error';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import { ApiResponse } from '../utils/api-response';
import prisma from '@repo/db';
import { google } from 'googleapis';

const youtubeAuth = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const userId = req.body.id;

        try {
            const oauth2Client = new OAuth2Client(
                process.env.YOUTUBE_CLIENT_ID as string,
                process.env.YOUTUBE_CLIENT_SECRET as string,
                process.env.YOUTUBE_REDIRECT_URI as string
            );

            const stateObj = {
                userId: userId,
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
                state: state,
            });

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        { authUrl },
                        'Youtube auth url generated'
                    )
                );
        } catch (error) {
            console.log(error);
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
            let userId;

            try {
                const stateObj = JSON.parse(
                    Buffer.from(state as string, 'base64').toString('utf-8')
                );
                userId = stateObj.userId;
            } catch (error) {
                return res.status(400).json(new ApiError(400, 'Invalid state'));
            }

            const oauth2Client = new OAuth2Client(
                process.env.YOUTUBE_CLIENT_ID as string,
                process.env.YOUTUBE_CLIENT_SECRET as string,
                process.env.YOUTUBE_REDIRECT_URI as string
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

            // Extract channel data
            const channel = response.data.items?.[0];

            if (!channel) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'No YouTube channel found'));
            }

            await prisma.youtubeChannel.create({
                data: {
                    ownerId: userId,
                    channelId: channel.id!,
                    channelTitle: channel.snippet?.title!,
                    channelDescription: channel.snippet?.description!,
                    subscriberCount: channel.statistics?.subscriberCount!
                        ? parseInt(channel.statistics.subscriberCount!)
                        : 0,
                    videoCount: channel.statistics?.videoCount!
                        ? parseInt(channel.statistics.videoCount!)
                        : 0,
                    thumbnailUrl: channel.snippet?.thumbnails?.high?.url! || '',
                },
            });

            const encryptionKey = TokenEncryption.generateKey();

            const tokenEncryption = new TokenEncryption(encryptionKey);

            const encryptedToken = tokenEncryption.encrypt(
                token.tokens.access_token!
            );

            await prisma.userYoutubeToken.create({
                data: {
                    userId: userId,
                    encryptedToken: encryptedToken.encryptedToken,
                    iv: encryptedToken.iv,
                    authTag: encryptedToken.authTag,
                },
            });

            return res
                .status(200)
                .json(
                    new ApiResponse(200, 'Youtube token stored successfully')
                );
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

export { youtubeAuth, youtubeCallback };
