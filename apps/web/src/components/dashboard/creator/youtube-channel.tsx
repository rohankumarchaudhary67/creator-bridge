import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface YouTubeChannelData {
    channelId: string;
    channelTitle: string;
    channelDescription: string;
    subscriberCount: number;
    videoCount: number;
    thumbnailUrl: string;
}

export default function YouTubeChannelDetailsComponent({
    channelData,
}: {
    channelData: YouTubeChannelData;
}) {
    return (
        <>
            <div>
                <div className="bg-muted rounded-lg px-6 py-4 w-full">
                    <div className="flex justify-between items-center">
                        <h1 className="font-sans font-semibold">
                            Connection Status
                        </h1>
                        <Badge className="rounded-full px-2 text-green-600 bg-green-100">
                            Connected
                        </Badge>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-4 mt-6 py-12 border-2 border-gray-500 border-dashed rounded-lg">
                        <Image
                            src={channelData.thumbnailUrl}
                            alt="youtube"
                            className="rounded-full"
                            height={50}
                            width={50}
                        />
                        <div className="flex justify-center items-center flex-col space-y-1 pb-4">
                            <h1 className="text-xl font-sans font-bold">
                                {channelData.channelTitle}
                            </h1>
                            <p className="font-sans">
                                {channelData.subscriberCount} Subscribers
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
