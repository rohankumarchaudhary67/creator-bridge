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
                    video: true,
                    totalVideos: true,
                    approvedVideos: true,
                    rejectedVideos: true,
                    pendingVideos: true,
                    videoRequests: true,
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

const acceptCreatorRequest = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id, requestId } = req.body;

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
                data: { status: 'Approved' },
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

export { fetchEditor, acceptCreatorRequest };
