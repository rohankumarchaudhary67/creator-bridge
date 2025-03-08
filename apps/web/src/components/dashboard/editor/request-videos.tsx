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
import { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { formatTimestamp } from '@/func/func';
import { categoryMap } from '@/func/video-category';
import { VideoData } from '@/types/video';

export default function EditorRequestVideosDashboardComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    const [videoData, setVideoData] = useState<VideoData[]>([]);

    const fetchEditorData = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/editor/fetchRequestedVideos`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response.data.data);
            if (Array.isArray(response.data.data)) {
                setVideoData(response.data.data);
            } else {
                setVideoData([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setVideoData([]);
        }
    };

    useEffect(() => {
        if (accessToken) {
            fetchEditorData();
        }
    }, [accessToken]);

    return (
        <>
            {videoData.length > 0 && (
                <div className="pt-4">
                    <h1 className="font-sans font-semibold md:text-xl p-2">
                        Request Status
                    </h1>
                    <div className="py-4">
                        <Accordion
                            type="single"
                            className="flex flex-col space-y-4"
                            collapsible
                        >
                            {videoData.map((video, index) => (
                                <AccordionItem
                                    value={video.id}
                                    key={index}
                                    className="border-b border-background bg-muted px-4 rounded-lg"
                                >
                                    <AccordionTrigger>
                                        <div className="flex items-center justify-between w-full pr-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="relative w-[120px] h-[68px]">
                                                    <Image
                                                        src={
                                                            video.thumbnailString ||
                                                            '/thumbnail.png'
                                                        }
                                                        alt="thumbnail"
                                                        fill
                                                        className="rounded-lg object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h1 className="text-wrap text-lg">
                                                        {video.title}
                                                    </h1>
                                                    <p className="text-sm font-mono">
                                                        Category:{' '}
                                                        {
                                                            categoryMap[
                                                                video.category
                                                            ]
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <p
                                                className={`${video.status === 'Pending' && 'dark:text-[#cccc00] text-[#ffcc00]'} ${video.status === 'Approved' && 'dark:text-[#33cc00] text-[#33cc00]'} ${video.status === 'Rejected' && 'dark:text-[#cc0000] text-[#cc0000]'} text-md font-mono`}
                                            >
                                                {video.status}
                                            </p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="px-4 py-2">
                                            <div className="flex items-center space-x-2 py-2">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead className="font-mono">
                                                                VISIBILITY
                                                            </TableHead>
                                                            <TableHead className="font-mono">
                                                                CATEGORY
                                                            </TableHead>
                                                            <TableHead className="text-end font-mono">
                                                                UPLOAD DATE
                                                            </TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className="font-bold">
                                                                {video.visibility.toUpperCase()}
                                                            </TableCell>
                                                            <TableCell className="font-bold">
                                                                {categoryMap[
                                                                    video
                                                                        .category
                                                                ].toUpperCase()}
                                                            </TableCell>
                                                            <TableCell className="text-end font-bold font-mono">
                                                                {formatTimestamp(
                                                                    video.createdAt
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>

                                            <div className="flex justify-start items-start space-x-2 pt-4">
                                                <p className="text-sm font-semibold">
                                                    Description:
                                                </p>
                                                <p className="text-wrap text-gray-400 text-sm font-extralight">
                                                    {video.description}
                                                </p>
                                            </div>
                                            <div className="flex justify-start items-start space-x-2 pt-2">
                                                <p className="text-sm font-mono font-semibold">
                                                    Tags:
                                                </p>
                                                {video.tags.map(
                                                    (tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="text-sm font-mono"
                                                        >
                                                            {tag},
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            )}
        </>
    );
}
