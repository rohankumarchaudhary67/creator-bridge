'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { MdPreview } from 'react-icons/md';
import { ApprovalVideoData } from '@/types/video';
import { categoryMap } from '@/func/video-category';
import { formatTimestamp } from '@/func/func';
import { GiCrossedBones } from 'react-icons/gi';
import { TiTick } from 'react-icons/ti';
import HandleVideoRequestComponent from './handle-video-request';

export default function PreviewVideoComponent({
    video,
    accessToken,
}: {
    video: ApprovalVideoData;
    accessToken: string;
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (!video.video.videoString) {
        return <p>No video available</p>;
    }

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant={'preview'}>
                        Preview <MdPreview />
                    </Button>
                </DialogTrigger>
                <DialogContent className="rounded-lg p-4">
                    <DialogHeader>
                        <DialogTitle className="font-sans text-lg pb-2">
                            {video.video.title}
                        </DialogTitle>
                        <DialogDescription>
                            {categoryMap[video.video.category].toUpperCase()} |{' '}
                            {video.video.visibility.toUpperCase()} |{' '}
                            {formatTimestamp(video.video.createdAt)}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center p-4">
                        <video
                            src={video.video.videoString}
                            controls
                            className="w-full max-w-2xl rounded-lg shadow-md"
                        >
                            Your browser does not support the video tag.
                        </video>

                        <div className="flex justify-end items-center space-x-4 pt-4 pr-2 w-full">
                            <HandleVideoRequestComponent
                                accessToken={accessToken}
                                video={video}
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
