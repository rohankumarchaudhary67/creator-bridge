import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import prisma from '@repo/db';
import { uploadOnCloudinary } from '../lib/cloudinary';
import { ApiError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';

// Define the shape of req.files
interface MulterFiles {
    video?: Express.Multer.File[];
}

const uploadVideo = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { title, description, id } = req.body;

        if (!title || !description || !id) {
            return res
                .status(400)
                .json(new ApiError(400, 'Missing required fields'));
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });

            if (user?.role !== 'Editor') {
                return res
                    .status(401)
                    .json(new ApiError(401, 'user is not an editor'));
            }

            const files = req.files as MulterFiles;
            const videoFilePath = files?.video?.[0]?.path;

            if (!videoFilePath) {
                return res.status(400).json({
                    message: 'Missing video file',
                });
            }

            const video = await uploadOnCloudinary(videoFilePath);

            if (!video) {
                return res
                    .status(400)
                    .json(new ApiError(400, 'Error uploading video'));
            }

            await prisma.youTubeVideo.create({
                data: {
                    title,
                    description,
                    videoString: video.url,
                    editorId: id,
                },
            });

            return res
                .status(201)
                .json(
                    new ApiResponse(201, video, 'Video uploaded successfully')
                );
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json(new ApiError(500, 'Error uploading video'));
        }
    }
);

export { uploadVideo };
