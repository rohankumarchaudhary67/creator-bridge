import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { ApiResponse } from '../utils/api-response';
import prisma from '@repo/db';
import { ApiError } from '../utils/api-error';
import { v4 as uuidv4 } from 'uuid';
import { sendJoinRequestEmail } from '../emails/send-request';

const generateRequestId = () => uuidv4();

const fetchCreator = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id } = req.body;

        try {
            const creator = await prisma.youTubeCreator.findFirst({
                where: { ownerId: id },
                select: {
                    id: true,
                    approvedVideos: true,
                    rejectedVideos: true,
                    pendingVideos: true,
                    editors: true,
                },
            });
            if (!creator) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Creator not found'));
            }

            let connectionStatus = false;

            const youtubeChannel = await prisma.youtubeChannel.findFirst({
                where: { ownerId: creator.id },
            });

            if (youtubeChannel) {
                connectionStatus = true;
            }

            const response = {
                approvedVideos: creator.approvedVideos,
                rejectedVideos: creator.rejectedVideos,
                pendingVideos: creator.pendingVideos,
                editors: creator.editors.length,
                connectionStatus,
            };

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        response,
                        'Creator fetched successfully'
                    )
                );
        } catch (error) {
            console.error('Error fetching user:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

const sendRequestToAddEditor = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id, email } = req.body;

        if (!id || !email) {
            return res
                .status(400)
                .json(new ApiError(400, 'User ID and email are required'));
        }

        try {
            const user = await prisma.user.findFirst({
                where: { id },
            });
            if (!user) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'User not found'));
            }
            const creator = await prisma.youTubeCreator.findFirst({
                where: { ownerId: id },
            });
            if (!creator) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Creator not found'));
            }

            const youtubeChannel = await prisma.youtubeChannel.findFirst({
                where: { ownerId: creator.id },
            });

            if (!youtubeChannel) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'YouTube channel not found'));
            }

            const request = await prisma.joinRequest.findFirst({
                where: { recieverEmail: email },
            });

            if (request) {
                return res
                    .status(200)
                    .json(new ApiResponse(200, {}, 'Request already sent'));
            }

            const requestId = generateRequestId();
            await prisma.joinRequest.create({
                data: {
                    senderName: user.name!,
                    senderEmail: user.email!,
                    senderImage: user.image!,
                    senderYouTubeChannelName: youtubeChannel.channelTitle!,
                    senderYouTubeChannelId: youtubeChannel.channelId!,
                    senderYouTubeChannelImage: youtubeChannel.thumbnailUrl!,
                    senderYouTubeSubscriberCount:
                        youtubeChannel.subscriberCount!,
                    recieverEmail: email,
                    senderId: creator.id,
                    requestId,
                    status: 'Pending',
                },
            });

            await sendJoinRequestEmail({
                email,
                requestId,
                creatorName: user.name!,
                creatorEmail: user.email!,
                youtubeChannelName: youtubeChannel.channelTitle!,
            });

            return res
                .status(200)
                .json(new ApiResponse(200, 'Request sent successfully'));
        } catch (error) {
            console.error('Error sending join request:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

const fetchEditorRequests = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id } = req.body;

        try {
            const creator = await prisma.youTubeCreator.findFirst({
                where: { ownerId: id },
            });
            if (!creator) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Creator not found'));
            }

            const editorRequests = await prisma.joinRequest.findMany({
                where: { senderId: creator.id },
                select: {
                    recieverEmail: true,
                    status: true,
                },
            });
            if (!editorRequests) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Editor requests not found'));
            }

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        editorRequests,
                        'Editor requests fetched successfully'
                    )
                );
        } catch (error) {
            console.error('Error fetching editor requests:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

export { fetchCreator, sendRequestToAddEditor, fetchEditorRequests };
