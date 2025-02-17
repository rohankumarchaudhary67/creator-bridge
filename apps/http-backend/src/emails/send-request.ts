import { resend } from '../lib/resend';
import RequestEmail from './emails-body/request-email';
import { ApiResponse } from '../utils/api-response';

interface RequestEmailProps {
    email: string;
    creatorName: string;
    creatorEmail: string;
    youtubeChannelName: string;
    requestId: string;
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

export { sendJoinRequestEmail };
