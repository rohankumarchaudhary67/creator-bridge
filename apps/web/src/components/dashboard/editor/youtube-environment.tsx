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
import { YoutubeEnvironmentProps } from '@/types/youtube';

export default function YoutubeEnvironmentComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    const [youTubeEnvironments, setYouTubeEnvironments] = useState<
        YoutubeEnvironmentProps[]
    >([]);

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
            {youTubeEnvironments.length > 0 ? (
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
                                                        <h1 className="font-mono font-semibold text-md">
                                                            {environment
                                                                .youtubeChannel
                                                                ?.length &&
                                                                environment
                                                                    .youtubeChannel[0]
                                                                    .channelTitle}
                                                        </h1>
                                                        <p className="font-mono text-sm">
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
            ) : (
                <div>
                    <h1 className="font-sans font-semibold md:text-xl p-2">
                        YouTube Environments
                    </h1>
                    <div className="bg-muted rounded-lg px-6 py-4">
                        <p className="text-center text-primary font-bold text-xl mt-2">
                            No YouTube Environments Found
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
