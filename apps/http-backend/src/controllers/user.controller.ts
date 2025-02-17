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
            if (role === 'Creator') {
                await prisma.youtubeCreator.create({ data: { userId: id } });
            } else {
                await prisma.youtubeEditor.create({ data: { userId: id } });
            }

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

const addEditor = asyncHandler(
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

            const creator = await prisma.youtubeCreator.findFirst({
                where: { userId: id },
            });
            if (!creator) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'User is not a creator'));
            }

            const youtubeChannel = await prisma.youtubeChannel.findFirst({
                where: { ownerId: creator.id },
            });
            if (!youtubeChannel) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'YouTube channel not found'));
            }

            const requestId = generateRequestId();
            await prisma.joinRequest.create({
                data: { senderId: creator.id, requestId, status: 'Pending' },
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

export { userRole, addEditor };
