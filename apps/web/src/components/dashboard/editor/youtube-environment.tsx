'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TableHeader,
} from '@/components/ui/table';
import Image from 'next/image';
import Link from 'next/link';
import UploadVideoDialog from './upload-video-dialog';

interface YoutubeEnvironmentProps {
    youtubeChannel: {
        channelId: string;
        channelTitle: string;
        channelDescription: string;
        subscriberCount: number;
        videoCount: number;
        thumbnailUrl: string;
    }[];
    owner: {
        name: string;
        email: string;
        image: string;
    };
}

export default function YoutubeEnvironmentComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    const [youTubeEnvironments, setYouTubeEnvironments] = useState<
        YoutubeEnvironmentProps[]
    >([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const fetchYoutubeEnvironment = async () => {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/editor/fetchYouTubeEnvironment`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        setYouTubeEnvironments(response.data.data);
    };

    useEffect(() => {
        fetchYoutubeEnvironment();
    }, [accessToken]);

    return (
        <>
            {youTubeEnvironments.length > 0 && (
                <div className="pt-4">
                    <h1 className="font-sans font-semibold md:text-xl p-2">
                        YouTube Environments
                    </h1>
                    <div className="bg-muted rounded-lg px-6 py-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>YouTube Channel</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {youTubeEnvironments.map(
                                    (environment, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Link
                                                    className="flex justify-start items-center space-x-3 cursor-pointer"
                                                    href={`https://www.youtube.com/channel/${environment.youtubeChannel?.length && environment.youtubeChannel[0].channelId}`}
                                                    target="_blank"
                                                >
                                                    <Image
                                                        src={
                                                            environment.owner
                                                                .image
                                                        }
                                                        alt="YouTube Channel"
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full"
                                                    />
                                                    <div>
                                                        <h1 className="font-sans font-semibold text-md">
                                                            {environment
                                                                .youtubeChannel
                                                                ?.length &&
                                                                environment
                                                                    .youtubeChannel[0]
                                                                    .channelTitle}
                                                        </h1>
                                                        <p>
                                                            {environment
                                                                .youtubeChannel
                                                                ?.length &&
                                                                environment
                                                                    .youtubeChannel[0]
                                                                    .subscriberCount}{' '}
                                                            Subscriber
                                                        </p>
                                                    </div>
                                                </Link>
                                            </TableCell>
                                            <TableCell className="flex justify-end items-center">
                                                <UploadVideoDialog
                                                    environment={environment}
                                                    accessToken={accessToken}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </>
    );
}
