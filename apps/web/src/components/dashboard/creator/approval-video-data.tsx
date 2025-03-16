'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { ApprovalVideoData } from '@/types/video';
import { formatTimestamp } from '@/func/func';
import { categoryMap } from '@/func/video-category';
import PreviewVideoComponent from './preview';
import HandleVideoRequestComponent from './handle-video-request';

export default function ApprovalVideoDataComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    const [data, setData] = useState<ApprovalVideoData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/creator/fetchRequestVideos`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setData(response.data.data);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                if (err.response && err.response.status === 400) {
                    setError('No video requests available.');
                } else {
                    setError(
                        'Failed to fetch video requests. Please try again later.'
                    );
                }
            } else {
                setError('An unexpected error occurred.');
            }
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [accessToken]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="pt-4">
            <h1 className="font-sans font-semibold md:text-xl pt-2">
                Recent Approval Request
            </h1>
            <div className="rounded-lg py-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                        <p className="text-lg font-mono">
                            Loading video requests...
                        </p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                        <p className="text-lg font-mono">{error}</p>
                    </div>
                ) : (
                    <Accordion
                        type="single"
                        className="flex flex-col space-y-4"
                        collapsible
                    >
                        {data.map((video, index) => (
                            <AccordionItem
                                key={index}
                                value={video.videoId}
                                className="border-b border-background bg-purple-900/30 px-4 rounded-lg shadow-sm shadow-gray-400/70"
                            >
                                <AccordionTrigger>
                                    <div className="flex items-center justify-between w-full pr-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="relative w-[120px] h-[68px]">
                                                <Image
                                                    src={
                                                        video.video
                                                            .thumbnailString ||
                                                        '/thumbnail.png'
                                                    }
                                                    alt="thumbnail"
                                                    fill
                                                    className="rounded-lg object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <h1 className="text-wrap font-sans text-lg font-semibold">
                                                    {video.video.title}
                                                </h1>
                                                <p className="text-gray-400 text-sm font-mono">
                                                    {video.video.visibility.toUpperCase()}
                                                </p>
                                            </div>
                                        </div>
                                        <p
                                            className={`${video.status === 'Pending' && 'dark:text-[#cccc00] text-[#ffcc00]'} ${video.status === 'Approved' && 'dark:text-[#33cc00] text-[#33cc00]'} ${video.status === 'Rejected' && 'dark:text-[#cc0000] text-[#cc0000]'} text-lg font-mono`}
                                        >
                                            {video.status}
                                        </p>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="px-4 py-2">
                                        <div className="flex justify-start items-start space-x-2">
                                            <p className="font-mono font-semibold">
                                                Description:
                                            </p>
                                            <p className="text-wrap text-gray-300 font-extralight text-sm">
                                                {video.video.description}
                                            </p>
                                        </div>
                                        <div className="flex justify-start items-center space-x-2 pt-2">
                                            <p className="font-mono font-semibold">
                                                Tags:
                                            </p>
                                            {video.video.tags.map(
                                                (tag, index) => (
                                                    <p
                                                        key={index}
                                                        className="font-mono text-gray-400"
                                                    >
                                                        {tag} |
                                                    </p>
                                                )
                                            )}
                                        </div>

                                        <div className="flex items-center space-x-2 py-2">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="hover:bg-transparent">
                                                        <TableHead className="font-mono">
                                                            UPLOAD BY
                                                        </TableHead>
                                                        <TableHead className="font-mono">
                                                            CATEGORY
                                                        </TableHead>
                                                        <TableHead className="font-mono">
                                                            VISIBILITY
                                                        </TableHead>
                                                        <TableHead className="text-end font-mono">
                                                            UPLOAD DATE
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow className="hover:bg-transparent">
                                                        <TableCell className="font-medium">
                                                            <div className="flex items-center space-x-2">
                                                                <Image
                                                                    src={
                                                                        video
                                                                            .sender
                                                                            .owner
                                                                            .image
                                                                    }
                                                                    alt="thumbnail"
                                                                    width={35}
                                                                    height={35}
                                                                    className="rounded-full"
                                                                />
                                                                <div>
                                                                    <h2 className="text-sm">
                                                                        {
                                                                            video
                                                                                .sender
                                                                                .owner
                                                                                .name
                                                                        }
                                                                    </h2>
                                                                    <p className="text-xs text-gray-500 tracking-wide">
                                                                        {
                                                                            video
                                                                                .sender
                                                                                .owner
                                                                                .email
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="tracking-wide">
                                                            {categoryMap[
                                                                video.video
                                                                    .category
                                                            ].toUpperCase()}
                                                        </TableCell>
                                                        <TableCell className="tracking-wide">
                                                            {video.video.visibility.toUpperCase()}
                                                        </TableCell>
                                                        <TableCell className="text-end font-mono font-semibold">
                                                            {formatTimestamp(
                                                                video.video
                                                                    .createdAt
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>

                                        {video.status === 'Pending' && (
                                            <div className="flex justify-end items-center space-x-4 pt-2 pr-2">
                                                <PreviewVideoComponent
                                                    video={video}
                                                    accessToken={accessToken}
                                                />
                                                <HandleVideoRequestComponent
                                                    video={video}
                                                    accessToken={accessToken}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>
        </div>
    );
}
