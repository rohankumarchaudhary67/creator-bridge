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
        const { id, title, description, category, visibility } = req.body;

        if (!title || !description || !id) {
            return res
                .status(400)
                .json(new ApiError(400, 'Missing required fields'));
        }

        try {
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) {
                return res
                    .status(401)
                    .json(new ApiError(401, 'User not found'));
            }
            // Verify if user is an editor
            const editor = await prisma.youTubeEditor.findUnique({
                where: { ownerId: id },
                include: { youtuberEnvironment: true }, // Fetch creator details
            });

            if (!editor) {
                return res
                    .status(401)
                    .json(new ApiError(401, 'User is not an editor'));
            }

            const files = req.files as MulterFiles;
            const videoFilePath = files?.video?.[0]?.path;

            if (!videoFilePath) {
                return res
                    .status(400)
                    .json(new ApiError(400, 'Missing video file'));
            }

            // Upload video to Cloudinary
            const uploadedVideo = await uploadOnCloudinary(videoFilePath);
            if (!uploadedVideo) {
                return res
                    .status(400)
                    .json(new ApiError(400, 'Error uploading video'));
            }

            // Save video metadata in the database
            const video = await prisma.youTubeVideo.create({
                data: {
                    editorId: editor.id,
                    videoString: uploadedVideo.secure_url, // Cloudinary URL
                    title,
                    description,
                    category,
                    visibility,
                    status: 'Pending',
                },
            });

            // Get Creator details
            const creator = editor.youtuberEnvironment[0];
            if (!creator) {
                return res
                    .status(400)
                    .json(
                        new ApiError(400, 'No associated YouTube Creator found')
                    );
            }

            // Get Creator's owner (User) details
            const creatorOwner = await prisma.user.findUnique({
                where: { id: creator.ownerId },
            });

            if (!creatorOwner) {
                return res
                    .status(400)
                    .json(new ApiError(400, 'YouTube Creator owner not found'));
            }

            // Create a video request for the creator
            const request = await prisma.videoRequest.create({
                data: {
                    senderId: editor.id,
                    recieverId: creator.id,
                    videoId: video.id,
                    requestId: generateRequestId(),
                    status: 'Pending',
                },
            });

            // Send email notification to the creator
            await sendVideoUploadRequestEmail({
                email: creatorOwner.email!,
                edtorName: user.name!,
                editorEmail: user.email!,
                requestId: request.requestId,
                videoTitle: video.title!,
                videoDescription: video.description!,
                videoString: video.videoString!,
            });

            return res
                .status(201)
                .json(
                    new ApiResponse(
                        201,
                        'Video uploaded and request sent successfully'
                    )
                );
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal Server Error'));
        }
    }
);

export { uploadVideo };
