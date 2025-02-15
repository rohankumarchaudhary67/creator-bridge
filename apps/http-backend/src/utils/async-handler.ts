import { NextFunction, Request, Response } from 'express';

type AsynHandlerFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>;

export const asyncHandler =
    (fn: AsynHandlerFunction) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
