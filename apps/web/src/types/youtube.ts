interface YoutubeEnvironmentProps {
    youtubeChannel: {
        channelId: string;
        channelTitle: string;
        channelDescription: string;
        subscriberCount: number;
        videoCount: number;
        thumbnailUrl: string;
    }[];
    owner: {
        name: string;
        email: string;
        image: string;
    };
}

export type { YoutubeEnvironmentProps };
