'use client';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { toast } from 'sonner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EditorProps } from '@/types/editor';

export default function PendingRequestComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    const [editorRequests, setEditorRequests] = useState<EditorProps[]>([]);

    const fetchEditorRequests = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/editor/fetchEditorRequests`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setEditorRequests(response.data.data.pendingRequests);
        } catch (error) {
            console.error('Error fetching editor requests:', error);
        }
    }, [accessToken]); // Add dependencies

    useEffect(() => {
        fetchEditorRequests();
    }, [fetchEditorRequests]);

    const handleRequest = async (requestId: string, action: string) => {
        const toastId = toast.loading(
            `${action === 'Approved' ? 'Accepting request' : 'Rejecting request'} request...`
        );
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/editor/handleCreatorRequest`,
                {
                    requestId,
                    action,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response.data.success) {
                toast.success(
                    `${action === 'Approved' ? 'Accepted' : 'Rejected'} request successfully!`,
                    { id: toastId }
                );
                setEditorRequests((prevRequests) =>
                    prevRequests.filter(
                        (request) => request.requestId !== requestId
                    )
                );
            }
        } catch (error) {
            console.error('Error accepting join request:', error);
        }
    };

    return (
        <>
            {editorRequests.length > 0 && (
                <div className="w-full h-full">
                    <h2 className="font-sans font-semibold text-lg pb-2 pt-4">
                        Pending Requests
                    </h2>
                    <div className="bg-muted rounded-lg px-4 py-2 flex justify-center items-center">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>YouTube Creator</TableHead>
                                    <TableHead>YouTube Channel</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {editorRequests.map((editor, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <div className="flex justify-start items-center space-x-4">
                                                <Image
                                                    src={editor.senderImage}
                                                    alt="sender-image"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                />
                                                <div>
                                                    <p>{editor.senderName}</p>
                                                    <p className="text-muted-foreground">
                                                        {editor.senderEmail}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="flex items-center space-x-2">
                                            <div className="flex items-center space-x-4">
                                                <Image
                                                    src={
                                                        editor.senderYouTubeChannelImage
                                                    }
                                                    alt="channel-image"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                />
                                                <div className="flex flex-col">
                                                    <span>
                                                        {
                                                            editor.senderYouTubeChannelName
                                                        }
                                                    </span>
                                                    <span className="text-muted-foreground">
                                                        {
                                                            editor.senderYouTubeSubscriberCount
                                                        }{' '}
                                                        Subscribers
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end items-center space-x-4">
                                                <Button
                                                    className="font-sans font-semibold bg-green-400"
                                                    onClick={() => {
                                                        handleRequest(
                                                            editor.requestId,
                                                            'Approved'
                                                        );
                                                    }}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    className="font-sans font-semibold bg-red-400"
                                                    onClick={() => {
                                                        handleRequest(
                                                            editor.requestId,
                                                            'Rejected'
                                                        );
                                                    }}
                                                >
                                                    Reject
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </>
    );
}
