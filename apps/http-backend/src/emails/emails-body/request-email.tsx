import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from '@react-email/components';
import React from 'react';

interface RequestEmailProps {
    creatorEmail: string;
    creatorName: string;
    youtubeChannelName: string;
    requestId: string;
}

export default function RequestEmail({
    creatorEmail,
    creatorName,
    youtubeChannelName,
    requestId,
}: RequestEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title></title>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Preview>
                Invitation to upload videos for {youtubeChannelName} on
                Creator-Bridge
            </Preview>
            <Section>
                <Row>
                    <Text>Hi</Text>
                    <Text>
                        {creatorName} has invited you to join Creator-Bridge, a
                        platform designed to help creators collaborate on video
                        uploads and edits for their YouTube channel,{' '}
                        {youtubeChannelName}
                    </Text>
                    <Text>
                        As an editor, you will be able to Upload videos for
                        review and approval and Collaborate seamlessly with{' '}
                        {creatorName}.
                    </Text>
                    <Text>
                        Every upload will require {creatorName} approval before
                        going live on YouTube.
                    </Text>
                </Row>
                <Row>
                    <Heading as="h2">
                        <Button
                            href={`${process.env.FRONTEND_APP_DOMAIN_FOR_EMAIL}/request?id=${requestId}`}
                            style={{ color: '#fbb87e' }}
                        >
                            Accept Invitation
                        </Button>
                    </Heading>
                </Row>
                <Row>
                    <Text>
                        If you have any questions or concerns, please reach out
                        to {creatorEmail}
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Best,
                        {creatorName}
                        <br />
                        Creator-Bridge Team
                    </Text>
                </Row>
            </Section>
        </Html>
    );
}
