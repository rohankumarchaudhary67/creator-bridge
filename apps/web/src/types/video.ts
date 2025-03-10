interface VideoData {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    visibility: string;
    thumbnailString: string;
    status: string;
    createdAt: string;
}

interface ApprovalVideoData {
    requestId: string;
    videoId: string;
    status: string;
    video: {
        title: string;
        description: string;
        thumbnailString: string;
        category: string;
        tags: string[];
        visibility: string;
        videoString: string;
        createdAt: string;
    };
    sender: {
        owner: {
            name: string;
            email: string;
            image: string;
        };
    };
}

export type { VideoData, ApprovalVideoData };
