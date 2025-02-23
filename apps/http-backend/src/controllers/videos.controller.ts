import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import prisma from '@repo/db';
import { uploadOnCloudinary } from '../lib/cloudinary';
import { ApiError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';
import { v4 as uuidv4 } from 'uuid';
import { sendVideoUploadRequestEmail } from '../emails/send-request';

interface MulterFiles {
    video?: Express.Multer.File[];
}

const generateRequestId = () => uuidv4();

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
                .json(new ApiResponse(201, 'Video uploaded successfully'));
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal Server Error'));
        }
    }
);

const sendRequestToCreator = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id, videoId } = req.body;

        if (!id || !videoId) {
            return res
                .status(400)
                .json(new ApiError(400, 'User ID and video ID are required'));
        }

        try {
            const user = await prisma.user.findUnique({ where: { id } });
            if (user?.role !== 'Editor') {
                return res
                    .status(401)
                    .json(new ApiError(401, 'user is not an editor'));
            }

            const video = await prisma.youTubeVideo.findUnique({
                where: { id: videoId },
            });
            if (!video) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Video not found'));
            }

            const youtubeOwner = await prisma.youTubeCreator.findFirst({
                where: {
                    editors: {
                        some: {
                            id: user.id,
                        },
                    },
                },
            });

            const youtuberData = await prisma.user.findFirst({
                where: { id: youtubeOwner?.ownerId },
            });

            const request = await prisma.joinRequest.create({
                data: {
                    senderId: user.id,
                    requestId: generateRequestId(),
                    status: 'Pending',
                },
            });

            const requestEmail = await sendVideoUploadRequestEmail({
                email: youtuberData?.email!,
                edtorName: user.name!,
                editorEmail: user.email,
                requestId: request.requestId,
                videoTitle: video?.title!,
                videoDescription: video?.description!,
                videoString: video?.videoString!,
            });

            return res
                .status(201)
                .json(
                    new ApiResponse(
                        201,
                        requestEmail,
                        'Video upload request sent successfully'
                    )
                );
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal Server Error'));
        }
    }
);

export { uploadVideo, sendRequestToCreator };
