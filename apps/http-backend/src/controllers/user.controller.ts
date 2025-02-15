import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { ApiResponse } from '../utils/api-response';
import prisma from '@repo/db';
import { ApiError } from '../utils/api-error';

const userRole = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const id = req.body.id;
        const { role } = req.body;

        try {
            if (role === 'Creator' || role === 'Editor') {
                await prisma.user.update({
                    where: { id },
                    data: { role },
                });

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
    async (req: Request, res: Response): Promise<any> => {}
);

export { userRole };
