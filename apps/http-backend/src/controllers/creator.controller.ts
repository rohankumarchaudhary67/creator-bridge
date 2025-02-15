import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';

const addEditor = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const userId = req.body.id;
        const { editorEmail } = req.body;
    }
);

export { addEditor };
