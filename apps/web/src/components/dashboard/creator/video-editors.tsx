'use client';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TiUserAdd } from 'react-icons/ti';
import axios from 'axios';
import { toast } from 'sonner';

interface EditorProps {
    recieverEmail: string;
    status: string;
}

export default function VideoEditorsComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);

    const [pendingEditors, setPendingEditors] = useState<EditorProps[]>([]);
    const [approvedEditors, setApprovedEditors] = useState<EditorProps[]>([]);
    const [rejectedEditors, setRejectedEditors] = useState<EditorProps[]>([]);

    const handleSendRequest = async () => {
        const toastId = toast.loading('Sending request...');
        const email = emailRef.current?.value.trim();
        if (!email) return;

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/creator/addEditorRequest`,
                { email },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response.data);
            setIsDialogOpen(false); // Close the dialog
            setPendingEditors((prev) => [
                ...prev,
                { recieverEmail: email, status: 'Pending' },
            ]); // Add to requested list
            toast.success('Request sent successfully!', { id: toastId });
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    const fetchRequestedEditors = async () => {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/creator/fetchEditorRequests`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const { pendingStatus, approvedStatus, rejectedStatus } =
            response.data.data;
        setPendingEditors(pendingStatus);
        setApprovedEditors(approvedStatus);
        setRejectedEditors(rejectedStatus);
    };

    useEffect(() => {
        fetchRequestedEditors();
    }, [accessToken]);

    return (
        <div className="w-full h-full">
            <div className="flex justify-between items-center pb-4">
                <h1 className="font-sans font-semibold text-xl">
                    Your Video Editors
                </h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="font-sane font-semibold"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            Editor <TiUserAdd />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-muted">
                        <DialogHeader>
                            <DialogTitle>Add Your Video Editor</DialogTitle>
                            <DialogDescription>
                                Caution: Send the request to trusted video
                                editors only. Enter the correct email address
                                and double-check before sending.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col space-y-4 pt-4">
                            <div className="flex flex-col space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="font-sans font-semibold"
                                >
                                    Email
                                </Label>
                                <Input
                                    ref={emailRef}
                                    placeholder="video-editor@creator.xyz"
                                    type="email"
                                    id="email"
                                    className="w-full outline"
                                />
                            </div>
                            <div className="w-full flex justify-end items-center">
                                <Button
                                    className="font-sans font-semibold"
                                    onClick={handleSendRequest}
                                >
                                    Send Request <TiUserAdd />
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col space-y-6 pt-4">
                {approvedEditors.length > 0 && (
                    <div>
                        <h2 className="font-sans font-semibold text-lg pb-2">
                            Approved
                        </h2>
                        {approvedEditors.map((editor, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-muted rounded-lg px-4 py-2"
                            >
                                <p className="font-sans">
                                    {editor.recieverEmail}
                                </p>
                                <p className="text-green-600">
                                    {editor.status}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {pendingEditors.length > 0 && (
                    <div>
                        <h2 className="font-sans font-semibold text-lg pb-2">
                            Pending
                        </h2>
                        <div className="flex flex-col space-y-2">
                            {pendingEditors.map((editor, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center bg-muted rounded-lg px-4 py-2"
                                >
                                    <p className="font-sans">
                                        {editor.recieverEmail}
                                    </p>
                                    <p className="text-yellow-600">
                                        {editor.status}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {rejectedEditors.length > 0 && (
                    <div>
                        <h2 className="font-sans font-semibold text-lg pb-2">
                            Rejected
                        </h2>
                        {rejectedEditors.map((editor, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-muted rounded-lg px-4 py-2"
                            >
                                <p className="font-sans">
                                    {editor.recieverEmail}
                                </p>
                                <p className="text-red-600">{editor.status}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
