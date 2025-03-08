import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { ApiResponse } from '../utils/api-response';
import { ApiError } from '../utils/api-error';
import prisma from '@repo/db';

const fetchEditor = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id } = req.body;

        try {
            const editor = await prisma.youTubeEditor.findFirst({
                where: { ownerId: id },
                select: {
                    id: true, // Fetch the editor ID
                },
            });

            if (!editor) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Editor not found'));
            }

            // Count total videos and statuses
            const totalVideos = await prisma.youTubeVideo.count({
                where: { editorId: editor.id },
            });

            const approvedVideos = await prisma.youTubeVideo.count({
                where: { editorId: editor.id, status: 'Approved' },
            });

            const rejectedVideos = await prisma.youTubeVideo.count({
                where: { editorId: editor.id, status: 'Rejected' },
            });

            const pendingVideos = await prisma.youTubeVideo.count({
                where: { editorId: editor.id, status: 'Pending' },
            });

            return res.status(200).json(
                new ApiResponse(
                    200,
                    {
                        totalVideos,
                        approvedVideos,
                        rejectedVideos,
                        pendingVideos,
                    },
                    'Editor fetched successfully'
                )
            );
        } catch (error) {
            console.error('Error fetching editor data:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Error fetching editor data'));
        }
    }
);

const fetchEditorRequests = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id } = req.body;

        try {
            const user = await prisma.user.findFirst({
                where: { id },
            });
            if (!user) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'User not found'));
            }

            const editor = await prisma.youTubeEditor.findFirst({
                where: { ownerId: user.id },
            });
            if (!editor) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Editor not found'));
            }

            const editorRequests = await prisma.joinRequest.findMany({
                where: { recieverEmail: user.email },
                select: {
                    requestId: true,
                    senderName: true,
                    senderEmail: true,
                    senderImage: true,
                    senderYouTubeChannelName: true,
                    senderYouTubeChannelId: true,
                    senderYouTubeChannelImage: true,
                    senderYouTubeSubscriberCount: true,
                    status: true,
                },
            });
            if (!editorRequests) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Editor requests not found'));
            }

            const responseData = {
                pendingRequests: editorRequests.filter(
                    (request) => request.status === 'Pending'
                ),
            };

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        responseData,
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

const handleCreatorRequest = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id, requestId, action } = req.body;

        if (!id || !requestId) {
            return res
                .status(400)
                .json(new ApiError(400, 'User ID and request ID are required'));
        }

        try {
            const editor = await prisma.youTubeEditor.findFirst({
                where: { ownerId: id },
            });
            if (!editor) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Editor not found'));
            }

            const request = await prisma.joinRequest.findFirst({
                where: { requestId },
            });
            if (!request) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Request not found'));
            }

            if (request.status !== 'Pending') {
                return res
                    .status(400)
                    .json(new ApiError(400, 'Request is not pending'));
            }

            await prisma.youTubeCreator.update({
                where: { id: request.senderId },
                data: {
                    editors: {
                        connect: {
                            id: editor.id,
                        },
                    },
                },
                include: {
                    editors: true,
                },
            });

            await prisma.joinRequest.update({
                where: { id: request.id },
                data: { status: action },
            });

            return res
                .status(200)
                .json(new ApiResponse(200, 'Request accepted successfully'));
        } catch (error) {
            console.error('Error accepting join request:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

const fetchYouTubeEnvironment = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id } = req.body; // Editor's ID

        try {
            // Find the editor and get the associated creators
            const editor = await prisma.youTubeEditor.findUnique({
                where: { ownerId: id },
                include: {
                    youtuberEnvironment: {
                        include: {
                            owner: {
                                select: {
                                    name: true,
                                    email: true,
                                    image: true,
                                },
                            },
                            youtubeChannel: {
                                select: {
                                    channelId: true,
                                    channelTitle: true,
                                    channelDescription: true,
                                    subscriberCount: true,
                                    videoCount: true,
                                    thumbnailUrl: true,
                                },
                            },
                        },
                    },
                },
            });

            if (!editor) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Editor not found'));
            }

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        editor.youtuberEnvironment,
                        'Creator(s) fetched successfully'
                    )
                );
        } catch (error) {
            console.error('Error fetching YouTube Creator:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Error fetching YouTube Creator'));
        }
    }
);

const fetchRequestedVideos = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id } = req.body;

        try {
            const editor = await prisma.youTubeEditor.findFirst({
                where: { ownerId: id },
            });
            if (!editor) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Editor not found'));
            }

            const requestedVideos = await prisma.youTubeVideo.findMany({
                where: {
                    editorId: editor.id,
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    thumbnailString: true,
                    category: true,
                    visibility: true,
                    tags: true,
                    status: true,
                    createdAt: true,
                },
            });

            if (!requestedVideos) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Requested videos not found'));
            }

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        requestedVideos,
                        'Requested videos fetched successfully'
                    )
                );
        } catch (error) {
            console.error('Error fetching requested videos:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

export {
    fetchEditor,
    handleCreatorRequest,
    fetchEditorRequests,
    fetchYouTubeEnvironment,
    fetchRequestedVideos,
};
