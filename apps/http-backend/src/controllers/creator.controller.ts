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
                },
            });

            if (!creator) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Creator not found'));
            }

            // Count the number of videos based on their status
            const approvedVideos = await prisma.youTubeVideo.count({
                where: {
                    editor: {
                        youtuberEnvironment: { some: { id: creator.id } },
                    },
                    status: 'Approved',
                },
            });

            const rejectedVideos = await prisma.youTubeVideo.count({
                where: {
                    editor: {
                        youtuberEnvironment: { some: { id: creator.id } },
                    },
                    status: 'Rejected',
                },
            });

            const pendingVideos = await prisma.youTubeVideo.count({
                where: {
                    editor: {
                        youtuberEnvironment: { some: { id: creator.id } },
                    },
                    status: 'Pending',
                },
            });

            // Count the number of editors assigned to this creator
            const editorsCount = await prisma.youTubeEditor.count({
                where: { youtuberEnvironment: { some: { id: creator.id } } },
            });

            // Check if the creator has a linked YouTube channel
            const connectionStatus = !!(await prisma.youtubeChannel.findFirst({
                where: { ownerId: creator.id },
            }));

            const response = {
                approvedVideos,
                rejectedVideos,
                pendingVideos,
                editors: editorsCount,
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
            console.error('Error fetching creator data:', error);
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

const fetchRequestVideos = asyncHandler(
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

            // Fetch all video requests with related video details
            const videos = await prisma.videoRequest.findMany({
                where: {
                    recieverId: creator.id,
                },
                select: {
                    requestId: true,
                    videoId: true,
                    status: true,
                    video: {
                        select: {
                            title: true,
                            thumbnailString: true,
                            description: true,
                            category: true,
                            tags: true,
                            visibility: true,
                            videoString: true,
                            createdAt: true,
                        },
                    }, // Fetch related video details
                    sender: {
                        select: {
                            owner: {
                                select: {
                                    name: true,
                                    email: true,
                                    image: true,
                                },
                            },
                        },
                    }, // Fetch related sender details
                },
            });

            if (!videos.length) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Request videos not found'));
            }

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        videos,
                        'Request videos fetched successfully'
                    )
                );
        } catch (error) {
            console.error('Error fetching request videos:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

export {
    fetchCreator,
    sendRequestToAddEditor,
    fetchEditorRequests,
    fetchRequestVideos,
};
