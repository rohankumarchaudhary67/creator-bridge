import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';

interface VideoData {
    id: string;
    thumbnail: string;
    title: string;
    category: string;
    duration: string;
    uploadedBy: {
        name: string;
        email: string;
    };
    timeAgo: string;
}

interface DataProps {
    data: VideoData[];
}

export default function ApprovalVideoDataComponent({ data }: DataProps) {
    return (
        <div className="py-4">
            <h1 className="font-sans font-semibold md:text-xl p-2">
                Video Approval Request
            </h1>
            <div className="bg-muted rounded-lg px-6 py-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Checkbox />
                            </TableHead>
                            <TableHead>VIDEO</TableHead>
                            <TableHead>UPLOADED BY</TableHead>
                            <TableHead>CATEGORY</TableHead>
                            <TableHead>DURATION</TableHead>
                            <TableHead>UPLOADED</TableHead>
                            <TableHead className="text-right">
                                ACTIONS
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((video) => (
                            <TableRow
                                key={video.id}
                                className="border-b border-background"
                            >
                                {/* Checkbox */}
                                <TableCell>
                                    <Checkbox />
                                </TableCell>

                                {/* Video Thumbnail & Title */}
                                <TableCell className="font-medium">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative w-[120px] h-[68px]">
                                            <Image
                                                src={video.thumbnail}
                                                alt="thumbnail"
                                                fill
                                                className="rounded-lg object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className="text-sm font-medium">
                                                {video.title}
                                            </h1>
                                            <p className="text-xs text-gray-500">
                                                ID: {video.id}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Uploaded By */}
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <div>
                                            <h2 className="text-sm">
                                                {video.uploadedBy.name}
                                            </h2>
                                            <p className="text-xs text-gray-500">
                                                {video.uploadedBy.email}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Category */}
                                <TableCell>
                                    <Badge variant="outline">
                                        {video.category}
                                    </Badge>
                                </TableCell>

                                {/* Duration */}
                                <TableCell>{video.duration}</TableCell>

                                {/* Time Ago */}
                                <TableCell className="text-gray-500 text-sm">
                                    {video.timeAgo}
                                </TableCell>

                                {/* Actions */}
                                <TableCell className="flex justify-around items-center pt-8 space-x-2">
                                    <h1 className="cursor-pointer text-yellow-600">
                                        Preview
                                    </h1>
                                    <h1 className="text-red-500 cursor-pointer">
                                        Reject
                                    </h1>
                                    <h1 className="text-[#29a329] cursor-pointer">
                                        Approve
                                    </h1>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
