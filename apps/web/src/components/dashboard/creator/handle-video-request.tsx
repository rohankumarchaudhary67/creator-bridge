'use client';
import { Button } from '@/components/ui/button';
import { GiCrossedBones } from 'react-icons/gi';
import { TiTick } from 'react-icons/ti';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ApprovalVideoData } from '@/types/video';
import axios from 'axios';
import { categoryMap } from '@/func/video-category';
import { formatTimestamp } from '@/func/func';
import { toast } from 'sonner';

export default function HandleVideoRequestComponent({
    video,
    accessToken,
}: {
    video: ApprovalVideoData;
    accessToken: string;
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [actionType, setActionType] = useState<
        'Approved' | 'Rejected' | null
    >(null);

    const handleOpenDialog = (type: 'Approved' | 'Rejected') => {
        setActionType(type);
        setIsDialogOpen(true);
    };

    const handleVideoRequest = async (id: string, status: string) => {
        const toastId = toast.loading('Processing request...');
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/video/handleVideoRequest`,
                {
                    id,
                    status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response.data.status === 200) {
                toast.success('Request processed successfully!', {
                    id: toastId,
                });
                setIsDialogOpen(false);
            }
        } catch (error) {
            console.error('Error handling video request:', error);
            toast.error('Something went wrong!', { id: toastId });
            setIsDialogOpen(false);
        }
    };

    return (
        <>
            <Button
                variant={'reject'}
                onClick={() => handleOpenDialog('Rejected')}
            >
                Reject <GiCrossedBones />
            </Button>
            <Button
                variant={'approve'}
                onClick={() => handleOpenDialog('Approved')}
            >
                Approve <TiTick />
            </Button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="rounded-lg p-4 bg-muted">
                    <DialogHeader>
                        <DialogTitle>
                            {actionType === 'Approved' ? (
                                <span className="text-xl">
                                    Are you sure you want to{' '}
                                    <span className="font-mono font-bold text-[#33cc33] tracking-wide">
                                        UPLOAD
                                    </span>{' '}
                                    this video?
                                </span>
                            ) : (
                                <span className="text-xl">
                                    Are you sure you want to{' '}
                                    <span className="font-mono font-bold tracking-wide">
                                        REJECT
                                    </span>{' '}
                                    this video?
                                </span>
                            )}
                        </DialogTitle>
                        <DialogDescription>
                            {actionType === 'Approved' ? (
                                <span className="text-lg">
                                    <span className="font-bold font-mono">
                                        Caution:
                                    </span>{' '}
                                    After uploading the video on YouTube, you
                                    need to delete your video manually from your
                                    YouTube Studio.
                                </span>
                            ) : (
                                <span className="text-lg">
                                    <span className="font-bold font-mono">
                                        Caution:
                                    </span>{' '}
                                    After rejecting the video, it will be
                                    deleted from our server. If you want to
                                    upload it again, you need to request editor
                                    to upload again.
                                </span>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col justify-start items-start space-y-4 p-4">
                        <div className="flex justify-start items-start space-x-2">
                            <p className="font-mono font-semibold">Title:</p>
                            <p className="text-wrap text-gray-300 font-extralight tracking-wide">
                                {video.video.title}
                            </p>
                        </div>
                        <div className="flex justify-start items-start space-x-2">
                            <p className="font-mono font-semibold">
                                Visibility:
                            </p>
                            <p className="text-wrap text-gray-300 font-extralight tracking-wide">
                                {video.video.visibility.toUpperCase()}
                            </p>
                        </div>
                        <div className="flex justify-start items-start space-x-2">
                            <p className="font-mono font-semibold">Category:</p>
                            <p className="text-wrap text-gray-300 font-extralight tracking-wide">
                                {categoryMap[
                                    video.video.category
                                ].toUpperCase()}
                            </p>
                        </div>
                        <div className="flex justify-start items-start space-x-2">
                            <p className="font-mono font-semibold">
                                Upload By:
                            </p>
                            <p className="text-wrap text-gray-300 font-extralight tracking-wide">
                                {video.sender.owner.name}
                            </p>
                        </div>
                        <div className="flex justify-start items-start space-x-2">
                            <p className="font-mono font-semibold">
                                Upload On:
                            </p>
                            <p className="text-wrap text-gray-300 font-extralight tracking-wide">
                                {formatTimestamp(video.video.createdAt)}
                            </p>
                        </div>

                        <div className="w-full flex justify-end items-center space-x-4 pt-4">
                            {actionType === 'Approved' ? (
                                <Button
                                    variant={'approve'}
                                    onClick={() =>
                                        handleVideoRequest(video.id, 'Approved')
                                    }
                                >
                                    Approve <TiTick />
                                </Button>
                            ) : (
                                <Button
                                    variant={'reject'}
                                    onClick={() =>
                                        handleVideoRequest(video.id, 'Rejected')
                                    }
                                >
                                    Reject <GiCrossedBones />
                                </Button>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
