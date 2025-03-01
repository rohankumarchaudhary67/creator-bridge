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
                    totalVideos: true,
                    approvedVideos: true,
                    rejectedVideos: true,
                    pendingVideos: true,
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
                    new ApiResponse(200, editor, 'Editor fetched successfully')
                );
        } catch (error) {
            console.error('Error fetching user:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Error fetching user'));
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

export { fetchEditor, handleCreatorRequest, fetchEditorRequests };
