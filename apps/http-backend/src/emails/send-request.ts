import { resend } from '../lib/resend';
import RequestEmail from './emails-body/request-email';
import { ApiResponse } from '../utils/api-response';
import RequestVideoUploadEmail from './emails-body/request-upload-video';

interface RequestEmailProps {
    email: string;
    creatorName: string;
    creatorEmail: string;
    youtubeChannelName: string;
    requestId: string;
}

interface VideoUploadRequestProps {
    email: string;
    edtorName: string;
    editorEmail: string;
    requestId: string;
    videoTitle: string;
    videoDescription: string;
    videoString: string;
}

const sendJoinRequestEmail = async ({
    email,
    creatorName,
    creatorEmail,
    youtubeChannelName,
    requestId,
}: RequestEmailProps): Promise<any> => {
    try {
        const emailResponse = await resend.emails.send({
            from: 'join-request@creator-bridge.rkc.digital',
            to: email,
            subject: `Invitation to upload videos for ${youtubeChannelName} on Creator-Bridge`,
            react: RequestEmail({
                creatorName,
                creatorEmail,
                youtubeChannelName,
                requestId,
            }),
        });
        return new ApiResponse(
            200,
            { emailResponse },
            'Email sent successfully'
        );
    } catch (emailError) {
        return new ApiResponse(
            400,
            { emailError },
            'Something went wrong during sending emails'
        );
    }
};

const sendVideoUploadRequestEmail = async ({
    email,
    edtorName,
    editorEmail,
    requestId,
    videoTitle,
    videoDescription,
    videoString,
}: VideoUploadRequestProps): Promise<any> => {
    try {
        const emailResponse = await resend.emails.send({
            from: 'video-upload-request@creator-bridge.rkc.digital',
            to: email,
            subject: `Request to upload video a ${videoTitle} on your YouTube Channel`,
            react: RequestVideoUploadEmail({
                editorName: edtorName,
                editorEmail,
                requestId,
                videoTitle,
                videoDescription,
                videoString,
            }),
        });
        return new ApiResponse(
            200,
            { emailResponse },
            'Email sent successfully'
        );
    } catch (error) {
        return new ApiResponse(
            400,
            { error },
            'Something went wrong during sending emails'
        );
    }
};

export { sendJoinRequestEmail, sendVideoUploadRequestEmail };
