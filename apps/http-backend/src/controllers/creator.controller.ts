import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { ApiResponse } from '../utils/api-response';
import prisma from '@repo/db';
import { ApiError } from '../utils/api-error';
import { v4 as uuidv4 } from 'uuid';
import { sendJoinRequestEmail } from '../emails/send-request';
import axios from 'axios';
import { deleteOnCloudinary } from '../lib/cloudinary';
import fs from 'fs';
import { uploadVideoToYouTubeHelper } from './youtube.controller';

const generateRequestId = () => uuidv4();

const fetchCreator = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id } = req.body;

        try {
            const creator = await prisma.youTubeCreator.findFirst({
                where: { ownerId: id },
                select: {
                    id: true,
                    approvedVideos: true,
                    rejectedVideos: true,
                    pendingVideos: true,
                    editors: true,
                },
            });
            if (!creator) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Creator not found'));
            }

            let connectionStatus = false;

            const youtubeChannel = await prisma.youtubeChannel.findFirst({
                where: { ownerId: creator.id },
            });

            if (youtubeChannel) {
                connectionStatus = true;
            }

            const response = {
                approvedVideos: creator.approvedVideos,
                rejectedVideos: creator.rejectedVideos,
                pendingVideos: creator.pendingVideos,
                editors: creator.editors.length,
                connectionStatus,
            };

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        response,
                        'Creator fetched successfully'
                    )
                );
        } catch (error) {
            console.error('Error fetching user:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

const sendRequestToAddEditor = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id, email } = req.body;

        if (!id || !email) {
            return res
                .status(400)
                .json(new ApiError(400, 'User ID and email are required'));
        }

        try {
            const user = await prisma.user.findFirst({
                where: { id },
            });
            if (!user) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'User not found'));
            }
            const creator = await prisma.youTubeCreator.findFirst({
                where: { ownerId: id },
            });
            if (!creator) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Creator not found'));
            }

            const youtubeChannel = await prisma.youtubeChannel.findFirst({
                where: { ownerId: creator.id },
            });

            if (!youtubeChannel) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'YouTube channel not found'));
            }

            const request = await prisma.joinRequest.findFirst({
                where: { recieverEmail: email },
            });

            if (request) {
                return res
                    .status(200)
                    .json(new ApiResponse(200, {}, 'Request already sent'));
            }

            const requestId = generateRequestId();
            await prisma.joinRequest.create({
                data: {
                    senderName: user.name!,
                    senderEmail: user.email!,
                    senderImage: user.image!,
                    senderYouTubeChannelName: youtubeChannel.channelTitle!,
                    senderYouTubeChannelId: youtubeChannel.channelId!,
                    senderYouTubeChannelImage: youtubeChannel.thumbnailUrl!,
                    senderYouTubeSubscriberCount:
                        youtubeChannel.subscriberCount!,
                    recieverEmail: email,
                    senderId: creator.id,
                    requestId,
                    status: 'Pending',
                },
            });

            await sendJoinRequestEmail({
                email,
                requestId,
                creatorName: user.name!,
                creatorEmail: user.email!,
                youtubeChannelName: youtubeChannel.channelTitle!,
            });

            return res
                .status(200)
                .json(new ApiResponse(200, 'Request sent successfully'));
        } catch (error) {
            console.error('Error sending join request:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

const fetchEditorRequests = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id } = req.body;

        try {
            const creator = await prisma.youTubeCreator.findFirst({
                where: { ownerId: id },
            });
            if (!creator) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Creator not found'));
            }

            const editorRequests = await prisma.joinRequest.findMany({
                where: { senderId: creator.id },
                select: {
                    recieverEmail: true,
                    status: true,
                },
            });
            if (!editorRequests) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'Editor requests not found'));
            }

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        editorRequests,
                        'Editor requests fetched successfully'
                    )
                );
        } catch (error) {
            console.error('Error fetching editor requests:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

const handleVideoRequest = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const { id, requestId, status } = req.body;

        try {
            const youtubeCreator = await prisma.youTubeCreator.findFirst({
                where: { ownerId: id },
            });
            if (!youtubeCreator) {
                return res
                    .status(404)
                    .json(new ApiError(404, 'YouTube creator not found'));
            }

            const videoRequest = await prisma.videoRequest.findFirst({
                where: {
                    requestId,
                },
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

            const video = await prisma.youTubeVideo.findFirst({
                where: {
                    id: videoRequest.videoId,
                },
            });

            if (status === 'Approved') {
                // Call YouTube upload API
                const uploadResponse = await uploadVideoToYouTubeHelper(
                    youtubeCreator.id,
                    video?.id as string
                );

                // Update video request status in database
                await prisma.videoRequest.update({
                    where: { requestId },
                    data: { status: 'Approved' },
                });

                await prisma.youTubeVideo.update({
                    where: { id: video?.id },
                    data: { status: 'Approved' },
                });

                await deleteOnCloudinary(video?.videoString!);

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
                const deleteVideo = await deleteOnCloudinary(
                    video?.videoString!
                );
                await prisma.videoRequest.update({
                    where: { requestId },
                    data: { status: 'Rejected' },
                });
                await prisma.youTubeVideo.update({
                    where: { id: video?.id },
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
                            'Video request rejected successfully'
                        )
                    );
            }

            return res.status(400).json(new ApiError(400, 'Invalid status'));
        } catch (error) {
            console.error('Error accepting video request:', error);
            return res
                .status(500)
                .json(new ApiError(500, 'Internal server error'));
        }
    }
);

export {
    fetchCreator,
    sendRequestToAddEditor,
    fetchEditorRequests,
    handleVideoRequest,
};
function streamPipeline(data: any, tempFile: fs.WriteStream) {
    throw new Error('Function not implemented.');
}
