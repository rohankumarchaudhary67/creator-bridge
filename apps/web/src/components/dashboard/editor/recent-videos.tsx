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

interface DataProps {
    data: {
        video: string;
        status: string;
        date: string;
        actions: string;
    }[];
}

export default function EditorRecentVideosDashboardComponent({
    data,
}: DataProps) {
    return (
        <>
            <div className="pt-4">
                <h1 className="font-sans font-semibold md:text-xl p-2">
                    Recent Videos
                </h1>
                <div className="bg-muted rounded-lg px-6 py-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>VIDEO</TableHead>
                                <TableHead>STATUS</TableHead>
                                <TableHead>DATE</TableHead>
                                <TableHead className="text-right">
                                    ACTIONS
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((video) => (
                                <TableRow
                                    key={video.video}
                                    className="border-b border-background cursor-pointer"
                                >
                                    <TableCell className="font-medium">
                                        <div className="flex justify-start space-x-4">
                                            <div className="relative w-[100px] h-[60px]">
                                                <Image
                                                    src="/test-thumbnail.jpeg"
                                                    alt="thumbnail"
                                                    fill
                                                    className="rounded-lg object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center items-start">
                                                <h1 className="text-wrap">
                                                    The Great wall of china
                                                </h1>
                                                <p>2:30 mins</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-100 hover:bg-green-300 cursor-pointer text-green-800 font-sans rounded-full px-2 py-1">
                                            Published
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-sans">
                                        2025-02-20
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <p className="text-blue-500 underline font-sans">
                                            View
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
