'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { TiUserAdd } from 'react-icons/ti';
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
import { HiUserAdd } from 'react-icons/hi';

interface YouTubeChannelData {
    channelId: string;
    channelTitle: string;
    channelDescription: string;
    subscriberCount: number;
    videoCount: number;
    thumbnailUrl: string;
}

export default function YouTubeChannelDetailsComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    const [channelData, setChannelData] = useState<YouTubeChannelData>({
        channelId: '',
        channelTitle: '',
        channelDescription: '',
        subscriberCount: 0,
        videoCount: 0,
        thumbnailUrl: '',
    });

    const [loading, setLoading] = useState(true);
    const [editors, setEditors] = useState<any[]>(['all']);

    const fetchChannelData = async () => {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/youtube/fetch-channel-details`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        setChannelData({
            ...channelData,
            channelId: response.data.data.channelId,
            channelTitle: response.data.data.channelTitle,
            channelDescription: response.data.data.channelDescription,
            subscriberCount: response.data.data.subscriberCount,
            videoCount: response.data.data.videoCount,
            thumbnailUrl: response.data.data.thumbnailUrl,
        });
        setLoading(false);
    };

    useEffect(() => {
        fetchChannelData();
    }, [accessToken]);

    return (
        <>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="flex justify-center items-start space-x-4">
                        <div className="bg-muted rounded-lg px-6 py-4 w-full">
                            <div className="flex justify-between items-center">
                                <h1 className="font-sans font-semibold">
                                    Connection Status
                                </h1>
                                <Badge className="rounded-full px-2 text-[#29a329] bg-[#adebad]">
                                    Connected
                                </Badge>
                            </div>
                            <div className="flex flex-col justify-center items-center space-y-4 mt-6 py-12 border-2 border-gray-500 border-dashed rounded-lg">
                                <Image
                                    src={
                                        channelData.thumbnailUrl ||
                                        '/icons/alt-thumbnail.png'
                                    }
                                    alt="youtube"
                                    className="rounded-full"
                                    height={50}
                                    width={50}
                                />
                                <div className="flex justify-center items-center flex-col space-y-1 pb-4">
                                    <h1 className="text-xl font-sans font-bold">
                                        {channelData.channelTitle}
                                    </h1>
                                    <p className="font-sans text-muted-foreground text-sm px-4 text-center">
                                        {channelData.channelDescription}
                                    </p>
                                    <p className="font-sans font-semibold text-lg pt-2">
                                        {channelData.subscriberCount}{' '}
                                        Subscribers
                                    </p>
                                    <p className="font-sans text-sm text-muted-foreground">
                                        {channelData.videoCount} Videos
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-full">
                            <div className="flex justify-between items-center pb-4">
                                <h1 className="font-sans font-semibold text-xl">
                                    Your Video Editors
                                </h1>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="font-sane font-semibold">
                                            Editor
                                            <TiUserAdd />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-muted">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Add Your Video Editor
                                            </DialogTitle>
                                            <DialogDescription>
                                                Caution: Send the request to
                                                trusted video editor only. Enter
                                                the correct email address and
                                                check two time to send request.
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
                                                    placeholder="video-editor@creator.xyz"
                                                    type="email"
                                                    id="email"
                                                    className="w-full outline"
                                                />
                                            </div>
                                            <div className="w-full flex justify-end items-center">
                                                <Button className="font-sans font-semibold">
                                                    Send Request <HiUserAdd />
                                                </Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            {editors.length > 0 && (
                                <div>
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex flex-col px-6 py-4 bg-muted rounded-lg">
                                            <div className="flex justify-between items-center space-x-4">
                                                <div className="flex space-x-4">
                                                    <Image
                                                        src="/test.jpg"
                                                        alt="thumbnail"
                                                        className="rounded-full"
                                                        height={50}
                                                        width={50}
                                                    />
                                                    <div>
                                                        <h1 className="font-sans font-semibold">
                                                            Rohan Chaudhary
                                                        </h1>
                                                        <p className="font-sans text-muted-foreground text-sm">
                                                            rohan@creator.xyz
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant={'ghost'}
                                                    className="text-red-600"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col px-6 py-4 bg-muted rounded-lg">
                                            <div className="flex justify-between items-center space-x-4">
                                                <div className="flex space-x-4">
                                                    <Image
                                                        src="/test.jpg"
                                                        alt="thumbnail"
                                                        className="rounded-full"
                                                        height={50}
                                                        width={50}
                                                    />
                                                    <div>
                                                        <h1 className="font-sans font-semibold">
                                                            Rohan Chaudhary
                                                        </h1>
                                                        <p className="font-sans text-muted-foreground text-sm">
                                                            rohan@creator.xyz
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant={'ghost'}
                                                    className="text-red-600"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="py-4 font-sans font-semibold">
                                            Requested Editors
                                        </h1>
                                        <div className="flex flex-col space-y-4">
                                            <div className="flex flex-col px-6 py-4 bg-muted rounded-lg">
                                                <div className="flex justify-between items-center space-x-4">
                                                    <p className="font-sans">
                                                        rohan@creator.xyz
                                                    </p>
                                                    <Button
                                                        variant={'ghost'}
                                                        className="text-yellow-600"
                                                    >
                                                        Requested
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col px-6 py-4 bg-muted rounded-lg">
                                                <div className="flex justify-between items-center space-x-4">
                                                    <p className="font-sans">
                                                        rohan@creator.xyz
                                                    </p>
                                                    <Button
                                                        variant={'ghost'}
                                                        className="text-yellow-600"
                                                    >
                                                        Requested
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col px-6 py-4 bg-muted rounded-lg">
                                                <div className="flex justify-between items-center space-x-4">
                                                    <p className="font-sans">
                                                        rohan@creator.xyz
                                                    </p>
                                                    <Button
                                                        variant={'ghost'}
                                                        className="text-yellow-600"
                                                    >
                                                        Requested
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
