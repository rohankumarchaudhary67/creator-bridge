'use client';

import { useCallback, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import axios from 'axios';
import VideoEditorsComponent from './video-editors';

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

    const fetchChannelData = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/youtube/fetch-channel-details`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setChannelData((prevData) => ({
                ...prevData,
                channelId: response.data.data.channelId,
                channelTitle: response.data.data.channelTitle,
                channelDescription: response.data.data.channelDescription,
                subscriberCount: response.data.data.subscriberCount,
                videoCount: response.data.data.videoCount,
                thumbnailUrl: response.data.data.thumbnailUrl,
            }));

            setLoading(false);
        } catch (error) {
            console.error('Error fetching channel data:', error);
        }
    }, [accessToken]); // Ensure only necessary dependencies

    useEffect(() => {
        fetchChannelData();
    }, [fetchChannelData]); // Now `fetchChannelData` is stable

    return (
        <>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="flex justify-center items-start space-x-4">
                        <div className="bg-gradient-to-t from-blue-900/50 to-purple-900/40 shadow-md shadow-gray-400/70 rounded-lg px-6 py-4 w-full">
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
                        <VideoEditorsComponent accessToken={accessToken} />
                    </div>
                )}
            </div>
        </>
    );
}
