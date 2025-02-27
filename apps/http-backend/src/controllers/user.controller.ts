import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { ApiResponse } from '../utils/api-response';
import prisma from '@repo/db';
import { ApiError } from '../utils/api-error';

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
            if (role === 'Editor') {
                await prisma.youTubeEditor.create({
                    data: {
                        ownerId: id,
                    },
                });
            } else if (role === 'Creator') {
                await prisma.youTubeCreator.create({
                    data: {
                        ownerId: id,
                    },
                });
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

export { userRole, fetchUser };
