import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { ApiResponse } from '../utils/api-response';
import prisma from '@repo/db';
import { ApiError } from '../utils/api-error';
import { v4 as uuidv4 } from 'uuid';
import { sendJoinRequestEmail } from '../emails/send-request';

const generateRequestId = () => {
    return uuidv4();
};

const userRole = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const id = req.body.id;
        const { role } = req.body;

        try {
            if (role === 'Creator' || role === 'Editor') {
                if (role === 'Creator') {
                    await prisma.youtubeCreator.create({
                        data: {
                            userId: id,
                        },
                    });
                } else if (role === 'Editor') {
                    await prisma.youtubeEditor.create({
                        data: {
                            userId: id,
                        },
                    });
                }

                return res
                    .status(200)
                    .json(new ApiResponse(200, 'Role updated successfully'));
            } else {
                return res.status(400).json(new ApiError(400, 'Invalid role'));
            }
        } catch (error) {
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

const addEditor = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const id = req.body.id;
        const { email } = req.body;

        try {
            const requestId = generateRequestId();
            const user = await prisma.user.findUnique({
                where: {
                    id,
                },
            });

            if (!user) {
                return res
                    .status(400)
                    .json(new ApiError(400, 'User not found'));
            }

            const youtubeChannel = await prisma.youtubeChannel.findFirst({
                where: {
                    ownerId: id,
                },
            });

            const joinRequest = await prisma.joinRequest.create({
                data: {
                    senderId: user.id,
                    requestId,
                    status: 'Pending',
                },
            });

            const sendRequestEmail = await sendJoinRequestEmail({
                email,
                requestId,
                creatorName: user.name!,
                creatorEmail: user.email,
                youtubeChannelName: youtubeChannel?.channelTitle!,
            });

            return res
                .status(200)
                .json(new ApiResponse(200, 'Request sent successfully'));
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

export { userRole, addEditor };
