interface EditorData {
    pendingVideos: number;
    approvedVideos: number;
    rejectedVideos: number;
    totalVideos: number;
}

interface EditorProps {
    requestId: string;
    senderName: string;
    senderEmail: string;
    senderImage: string;
    senderYouTubeChannelName: string;
    senderYouTubeChannelId: string;
    senderYouTubeChannelImage: string;
    senderYouTubeSubscriberCount: number;
}

export type { EditorData, EditorProps };
