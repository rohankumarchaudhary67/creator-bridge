import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { ApiError } from '../utils/api-error';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '@repo/db';

interface DecodedToken extends JwtPayload {
    email: string;
}

const verifySessionToken = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const sessionToken = req
                .header('Authorization')
                ?.replace('Bearer ', '');

            if (!sessionToken) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Session token not found'));
            }

            const decodedToken = jwt.verify(
                sessionToken,
                process.env.SESSION_TOKEN_SECRET!
            ) as DecodedToken;

            if (!decodedToken || !decodedToken.email) {
                return res
                    .status(401)
                    .json(new ApiError(401, 'Invalid session token'));
            }

            const user = await prisma.user.findUnique({
                where: { email: decodedToken.email },
            });

            if (!user) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'User not found'));
            }

            if (user.sessionToken !== sessionToken) {
                return res
                    .status(401)
                    .json(new ApiError(401, 'Invalid session token'));
            }

            req.body.id = user.id;

            next();
        } catch (error) {
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

export { verifySessionToken };
