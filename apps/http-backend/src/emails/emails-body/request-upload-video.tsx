import {
    Html,
    Head,
    Font,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from '@react-email/components';
import React from 'react';

interface RequestEmailProps {
    editorName: string;
    editorEmail: string;
    requestId: string;
    videoTitle: string;
    videoDescription: string;
    videoString: string;
}

export default function RequestVideoUploadEmail({
    editorName,
    editorEmail,
    requestId,
    videoTitle,
    videoDescription,
    videoString,
}: RequestEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>New Video Upload Request</title>
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
            <Section>
                <Row>
                    <Text>Hi {editorName},</Text>
                    <Text>
                        {editorName} ({editorEmail}) has requested to upload a
                        video for your channel.
                    </Text>
                    <Text>
                        <b>Video Title:</b> {videoTitle}
                    </Text>
                    <Text>
                        <b>Description:</b> {videoDescription}
                    </Text>
                    <Text>
                        <b>Video Preview:</b> {videoString}
                    </Text>
                    <Text>Please review and approve the upload request.</Text>
                </Row>
                <Row>
                    <Heading as="h2">
                        <Button
                            href={`${process.env.FRONTEND_APP_DOMAIN_FOR_EMAIL}/dashboard`}
                            style={{
                                backgroundColor: '#805ad5',
                                color: '#fff',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                textDecoration: 'none',
                            }}
                        >
                            Review Request
                        </Button>
                    </Heading>
                </Row>
                <Row>
                    <Text>
                        If you have any questions, feel free to reach out to{' '}
                        {editorEmail}.
                    </Text>
                </Row>
                <Row>
                    <Text>
                        Best regards,
                        <br />
                        {editorName}
                        <br />
                        Creator-Bridge Team
                    </Text>
                </Row>
            </Section>
        </Html>
    );
}
