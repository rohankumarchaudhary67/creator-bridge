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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface VideoData {
    id: string;
    thumbnail: string;
    title: string;
    category: string;
    duration: string;
    uploadedBy: {
        name: string;
        email: string;
        avatar: string;
    };
    timeAgo: string;
}

interface DataProps {
    data: VideoData[];
    heading: string;
}

export default function ApprovalVideoDataComponent({
    data,
    heading,
}: DataProps) {
    return (
        <div className="bg-muted rounded-lg px-6 py-4">
            <div className="pb-4">
                <h1 className="font-sans font-semibold md:text-xl">
                    {heading}
                </h1>
            </div>
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
                        <TableHead className="text-right">ACTIONS</TableHead>
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
                                    <Avatar>
                                        <Image
                                            src={video.uploadedBy.avatar}
                                            alt={video.uploadedBy.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                        <AvatarFallback>
                                            {video.uploadedBy.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
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
                            <TableCell className="text-right space-x-2">
                                <Button className="bg-green-500 hover:bg-green-600 text-white">
                                    Approve
                                </Button>
                                <Button className="bg-red-500 hover:bg-red-600 text-white">
                                    Reject
                                </Button>
                                <Button variant="outline">Preview</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
