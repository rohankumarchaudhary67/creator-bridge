import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { ApiResponse } from '../utils/api-response';
import prisma from '@repo/db';
import { ApiError } from '../utils/api-error';
import { v4 as uuidv4 } from 'uuid';
import { sendJoinRequestEmail } from '../emails/send-request';

const generateRequestId = () => uuidv4();

const userRole = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id, role } = req.body;

        if (!id || !role) {
            return res
                .status(400)
                .json(new ApiError(400, 'User ID and role are required'));
        }

        if (role !== 'Creator' && role !== 'Editor') {
            return res.status(400).json(new ApiError(400, 'Invalid role'));
        }

        try {
            await prisma.user.update({ where: { id }, data: { role } });

            return res
                .status(200)
                .json(new ApiResponse(200, 'Role updated successfully'));
        } catch (error) {
            console.error('Error updating role:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

const fetchUser = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id } = req.body;

        if (!id) {
            return res
                .status(400)
                .json(new ApiError(400, 'User ID is required'));
        }

        try {
            const user = await prisma.user.findUnique({
                where: { id },
                select: { name: true, email: true, role: true, image: true },
            });
            if (!user) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'User not found'));
            }

            return res
                .status(200)
                .json(new ApiResponse(200, user, 'User fetched successfully'));
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
            const user = await prisma.user.findUnique({ where: { id } });
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

            const youtubeChannel = await prisma.youtubeChannel.findFirst({
                where: { ownerId: user.id },
            });
            if (!youtubeChannel) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'YouTube channel not found'));
            }

            const requestId = generateRequestId();
            await prisma.request.create({
                data: { senderId: user.id, requestId, status: 'Pending' },
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

const acceptCreatorRequest = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id, requestId } = req.body;

        if (!id || !requestId) {
            return res
                .status(400)
                .json(new ApiError(400, 'User ID and request ID are required'));
        }

        try {
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'User not found'));
            }
            if (user.role !== 'Editor') {
                return res
                    .status(404)
                    .json(new ApiError(404, 'User is not a editor'));
            }

            const request = await prisma.request.findFirst({
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

            await prisma.youTuberEnvironment.update({
                where: { ownerId: request.senderId },
                data: {
                    editors: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
                include: {
                    editors: true,
                },
            });

            await prisma.request.update({
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

export { userRole, sendRequestToAddEditor, acceptCreatorRequest, fetchUser };
