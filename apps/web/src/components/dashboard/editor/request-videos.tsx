'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '../../ui/badge';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface VideoData {
    title: string;
    description: string;
    category: string;
    tags: string[];
    visibility: string;
    status: string;
    createdAt: string;
}

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
        <div className="pt-4">
            <h1 className="font-sans font-semibold md:text-xl p-2">
                Request Status
            </h1>
            <div className="bg-muted rounded-lg px-6 py-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>VIDEO</TableHead>
                            <TableHead>CATEGORY</TableHead>
                            <TableHead>VISIBILITY</TableHead>
                            <TableHead>STATUS</TableHead>
                            <TableHead className="text-right">TAGS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {videoData.length > 0 ? (
                            videoData.map((video, index) => (
                                <TableRow
                                    key={index}
                                    className="border-b border-background"
                                >
                                    <TableCell className="font-medium">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex flex-col">
                                                <h1 className="text-wrap font-sans text-lg">
                                                    {video.title}
                                                </h1>
                                                <p className="text-gray-500 text-sm">
                                                    {video.description}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {categoryMap[video.category] ||
                                            'Unknown'}
                                    </TableCell>
                                    <TableCell className="font-sans font-semibold">
                                        {video.visibility.toUpperCase()}
                                    </TableCell>
                                    <TableCell>
                                        {video.status === 'Pending' && (
                                            <Badge className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                                Pending
                                            </Badge>
                                        )}
                                        {video.status === 'Approved' && (
                                            <Badge className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                                Approved
                                            </Badge>
                                        )}
                                        {video.status === 'Rejected' && (
                                            <Badge className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                                Rejected
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="grid grid-cols-3 gap-2 w-fit">
                                        {video.tags?.map((tag, index) => (
                                            <Badge
                                                key={index}
                                                className="text-blue-500 cursor-pointer"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="text-center py-4 text-gray-500"
                                >
                                    No videos found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
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
