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
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { TiTick } from 'react-icons/ti';
import { GiCrossedBones } from 'react-icons/gi';
import { MdPreview } from 'react-icons/md';

interface VideoData {
    videoId: string;
    status: string;
    video: {
        title: string;
        description: string;
        category: string;
        tags: string[];
        visibility: string;
        videoString: string;
        createdAt: string;
    };
    sender: {
        owner: {
            name: string;
            email: string;
            image: string;
        };
    };
}

export default function ApprovalVideoDataComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    const [data, setData] = useState<VideoData[]>([]);

    useEffect(() => {
        fetchData();
    }, [accessToken]);

    const fetchData = async () => {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/creator/fetchRequestVideos`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        setData(response.data.data);
    };

    const handleVideoRequest = async (videoId: string, status: string) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/creator/handleVideoRequest`,
                {
                    id: videoId,
                    status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error('Error handling video request:', error);
        }
    };

    return (
        <div className="pt-4">
            <h1 className="font-sans font-semibold md:text-xl pt-2">
                Recent Approval Request
            </h1>
            <div className="rounded-lg py-4">
                <Accordion
                    type="single"
                    className="flex flex-col space-y-4"
                    collapsible
                >
                    {data.map((video, index) => (
                        <AccordionItem
                            key={index}
                            value={video.videoId}
                            className="border-b border-background bg-muted px-4 rounded-lg"
                        >
                            <AccordionTrigger>
                                <div className="flex items-center justify-between w-full pr-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative w-[120px] h-[68px]">
                                            <Image
                                                src="/thumbnail.png"
                                                alt="thumbnail"
                                                fill
                                                className="rounded-lg object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className="text-wrap font-sans text-lg">
                                                {video.video.title}
                                            </h1>
                                            <p className="text-gray-500 text-sm">
                                                {video.video.visibility}
                                            </p>
                                        </div>
                                    </div>
                                    <p
                                        className={`${video.status === 'Pending' && 'dark:text-[#cccc00]'} ${video.status === 'Approved' && 'dark:text-[#33cc00]'} ${video.status === 'Rejected' && 'dark:text-[#cc0000]'} text-lg`}
                                    >
                                        {video.status}
                                    </p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="px-4 py-2">
                                    <div className="flex justify-start items-center space-x-2">
                                        <p className="text-lg font-sans font-semibold">
                                            Description:
                                        </p>
                                        <p className="text-wrap text-lg text-gray-400">
                                            {video.video.description}
                                        </p>
                                    </div>
                                    <div className="flex justify-start items-center space-x-2">
                                        <p className="text-lg font-sans font-semibold">
                                            Tags:
                                        </p>
                                        {video.video.tags.map((tag, index) => (
                                            <p
                                                key={index}
                                                className="text-lg text-gray-400"
                                            >
                                                {tag}
                                            </p>
                                        ))}
                                    </div>

                                    <div className="flex items-center space-x-2 py-2">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>
                                                        UPLOAD BY
                                                    </TableHead>
                                                    <TableHead>
                                                        CATEGORY
                                                    </TableHead>
                                                    <TableHead>
                                                        VISIBILTY
                                                    </TableHead>
                                                    <TableHead className="text-end">
                                                        UPLOAD DATE
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="font-medium">
                                                        <div className="flex items-center space-x-2">
                                                            <Image
                                                                src={
                                                                    video.sender
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
                                                                <p className="text-xs text-gray-500">
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
                                                    <TableCell>
                                                        {video.video.category}
                                                    </TableCell>
                                                    <TableCell>
                                                        {video.video.visibility}
                                                    </TableCell>
                                                    <TableCell className="text-end">
                                                        {video.video.createdAt}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>

                                    <div className="flex justify-end items-center space-x-4 pt-2 pr-2">
                                        <Button variant={'preview'}>
                                            Preview <MdPreview />
                                        </Button>
                                        <Button variant={'reject'}>
                                            Reject <GiCrossedBones />
                                        </Button>
                                        <Button variant={'approve'}>
                                            Approve <TiTick />
                                        </Button>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

const categoryMap: Record<string, string> = {
    '22': 'People & Blogs',
    '23': 'Comedy',
    '10': 'Music',
    '1': 'Film & Animation',
    '2': 'Autos & Vehicle',
    '15': 'Pets & Animals',
    '17': 'Sports',
    '18': 'Short Movies',
    '19': 'Travel & Events',
    '20': 'Gaming',
    '21': 'Videoblogging',
    '24': 'Entertainment',
    '25': 'News & Politics',
    '26': 'Howto & Style',
    '27': 'Education',
    '28': 'Science & Technology',
    '29': 'Nonprofits & Activism',
    '30': 'Movies',
};
