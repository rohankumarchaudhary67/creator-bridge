import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Badge } from '../../ui/badge';

interface VideoData {
    title: string;
    duration: string;
    date: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    message: string;
    actions?: {
        edit?: boolean;
        cancel?: boolean;
        viewDetails?: boolean;
        resubmit?: boolean;
    };
}

interface DataProps {
    data: VideoData[];
}

export default function EditorRequestVideosDashboardComponent({
    data,
}: DataProps) {
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
                            <TableHead>SUBMITTED DATE</TableHead>
                            <TableHead>STATUS</TableHead>
                            <TableHead>CREATOR RESPONSE</TableHead>
                            <TableHead className="text-right">
                                ACTIONS
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((video, index) => (
                            <TableRow
                                key={index}
                                className="border-b border-background"
                            >
                                <TableCell className="font-medium">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative w-[100px] h-[60px]">
                                            <Image
                                                src="/test-thumbnail.jpeg"
                                                alt="thumbnail"
                                                fill
                                                className="rounded-lg object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className="text-wrap">
                                                {video.title}
                                            </h1>
                                            <p className="text-gray-500 text-sm">
                                                Duration: {video.duration}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{video.date}</TableCell>
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
                                <TableCell className="font-sans">
                                    {video.message}
                                </TableCell>
                                <TableCell className="text-right space-x-3">
                                    {video.actions?.edit && (
                                        <span className="text-blue-500 cursor-pointer">
                                            Edit
                                        </span>
                                    )}
                                    {video.actions?.cancel && (
                                        <span className="text-red-500 cursor-pointer">
                                            Cancel
                                        </span>
                                    )}
                                    {video.actions?.viewDetails && (
                                        <span className="text-blue-500 cursor-pointer">
                                            View Details
                                        </span>
                                    )}
                                    {video.actions?.resubmit && (
                                        <span className="text-blue-500 cursor-pointer">
                                            Resubmit
                                        </span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
