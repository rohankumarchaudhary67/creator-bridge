import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import prisma from '@repo/db';
import { uploadOnCloudinary } from '../lib/cloudinary';
import { ApiError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';
import { v4 as uuidv4 } from 'uuid';
import { sendVideoUploadRequestEmail } from '../emails/send-request';
import { deleteOnCloudinary } from '../lib/cloudinary';
import { uploadVideoToYouTubeHelper } from './youtube.controller';

interface MulterFiles {
    video?: Express.Multer.File[];
    thumbnail?: Express.Multer.File[];
}

const generateRequestId = () => uuidv4();

const uploadVideo = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id, title, description, category, visibility, tags } = req.body;

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
            const thumbnailFilePath = files?.thumbnail?.[0]?.path;

            if (!videoFilePath) {
                return res
                    .status(400)
                    .json(new ApiError(400, 'Missing video file'));
            }

            // Upload video to Cloudinary
            const uploadedVideo = await uploadOnCloudinary(
                videoFilePath as string
            );
            if (!uploadedVideo) {
                return res
                    .status(400)
                    .json(new ApiError(400, 'Error uploading video'));
            }

            const uploadedThumbnail = await uploadOnCloudinary(
                thumbnailFilePath as string
            );

            if (!uploadedThumbnail) {
                return res
                    .status(400)
                    .json(new ApiError(400, 'Error uploading thumbnail'));
            }

            const tagsArray = Array.isArray(tags) ? tags : tags ? [tags] : [];

            // Save video metadata in the database
            const video = await prisma.youTubeVideo.create({
                data: {
                    editorId: editor.id,
                    videoString: uploadedVideo.secure_url, // Cloudinary URL
                    thumbnailString: uploadedThumbnail.secure_url,
                    title,
                    description,
                    category,
                    visibility,
                    tags: tagsArray,
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

const handleVideoRequest = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id, requestId, status } = req.body;

        try {
            console.log('Request Body:', req.body); // Debugging

            // Find YouTube Creator by ownerId
            const youtubeCreator = await prisma.youTubeCreator.findUnique({
                where: { ownerId: id },
            });

            if (!youtubeCreator) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'YouTube creator not found'));
            }

            // Find the Video Request using requestId
            const videoRequest = await prisma.videoRequest.findUnique({
                where: { requestId },
            });

            if (!videoRequest) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Video request not found'));
            }

            if (videoRequest.status !== 'Pending') {
                return res
                    .status(400)
                    .json(new ApiError(400, 'Video request is not pending'));
            }

            // Fetch the associated video
            const video = await prisma.youTubeVideo.findUnique({
                where: { id: videoRequest.videoId },
            });

            if (!video) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Associated video not found'));
            }

            if (status === 'Approved') {
                // Call YouTube upload API
                const uploadResponse = await uploadVideoToYouTubeHelper(
                    youtubeCreator.id,
                    video.id
                );

                // Update video request status to Approved
                await prisma.videoRequest.update({
                    where: { requestId },
                    data: { status: 'Approved' },
                });

                // Update YouTube video status to Approved
                await prisma.youTubeVideo.update({
                    where: { id: video.id },
                    data: { status: 'Approved' },
                });

                // Delete video from Cloudinary if it was uploaded successfully
                if (video.videoString) {
                    await deleteOnCloudinary(video.videoString);
                }

                return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            200,
                            uploadResponse,
                            'Video approved and uploaded to YouTube'
                        )
                    );
            }

            if (status === 'Rejected') {
                // Delete video from Cloudinary if it exists
                if (video.videoString) {
                    await deleteOnCloudinary(video.videoString);
                }

                // Update video request status to Rejected
                await prisma.videoRequest.update({
                    where: { requestId },
                    data: { status: 'Rejected' },
                });

                // Update YouTube video status to Rejected and remove videoString
                await prisma.youTubeVideo.update({
                    where: { id: video.id },
                    data: {
                        status: 'Rejected',
                        videoString: null,
                    },
                });

                return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            200,
                            null,
                            'Video request rejected successfully'
                        )
                    );
            }

            return res.status(400).json(new ApiError(400, 'Invalid status'));
        } catch (error) {
            console.error('Error handling video request:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

export { uploadVideo, handleVideoRequest };
