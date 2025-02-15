import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { ApiResponse } from '../utils/api-response';

const healthCheckController = asyncHandler(
    async (req: Request, res: Response) => {
        const response = new ApiResponse(200, { message: 'Healthy' });
        res.status(response.statusCode).json(response);
    }
);

export { healthCheckController };
