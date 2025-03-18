import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SiTicktick } from 'react-icons/si';
import axios from 'axios';
import { redirect } from 'next/navigation';

export default function YoutubeIntegrationDashboardComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    const youtubeIntegrationHandler = async () => {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/youtube/auth`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log(response.data.data);
        redirect(response.data.data.authUrl!);
    };

    return (
        <>
            <div className="py-4">
                <h1 className="font-sans font-semibold md:text-xl p-2 ">
                    YouTube Integration
                </h1>
                <div className="flex justify-center items-start space-x-4 ">
                    <div className="bg-muted rounded-lg px-6 py-4 w-full bg-gradient-to-t from-blue-900/50 to-purple-900/40 shadow-md shadow-gray-400/70">
                        <div className="flex justify-between items-center">
                            <h1 className="font-sans font-semibold">
                                Connection Status
                            </h1>
                            <Badge className="rounded-full px-2 text-red-600 bg-red-200">
                                Not Connected
                            </Badge>
                        </div>
                        <div className="flex flex-col justify-center items-center space-y-4 mt-6 py-12 border-2 border-gray-500 border-dashed rounded-lg ">
                            <Image
                                src="/icons/youtube.png"
                                alt="youtube"
                                height={50}
                                width={50}
                            />
                            <div className="flex justify-center items-center flex-col space-y-1 pb-4">
                                <h1 className="text-xl font-sans font-bold">
                                    Connect your YouTube account
                                </h1>
                                <p className="font-sans">
                                    Link your YouTube channel to enable video
                                    management
                                </p>
                            </div>
                            <Button
                                className="bg-red-600 hover:bg-red-500 font-sans text-lg text-white"
                                onClick={() => {
                                    youtubeIntegrationHandler();
                                }}
                            >
                                Connect with YouTube
                            </Button>
                        </div>
                        <div className="flex flex-col justify-center items-start pt-6">
                            <h1 className="text-md font-sans font-semibold pb-1">
                                Benefits of connecting:
                            </h1>
                            <div className="flex justify-center items-center space-x-2">
                                <SiTicktick className="text-sm text-green-600" />
                                <p>Direct video upload to YouTube</p>
                            </div>
                            <div className="flex justify-center items-center space-x-2">
                                <SiTicktick className="text-sm text-green-600" />
                                <p>
                                    Manage your videos directly from Creator
                                    Bridge
                                </p>
                            </div>
                            <div className="flex justify-center items-center space-x-2">
                                <SiTicktick className="text-sm text-green-600" />
                                <p>
                                    Approved or Reject videos directly from
                                    Creator Bridge
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted rounded-lg px-6 py-4 w-full bg-gradient-to-t from-blue-900/50 to-purple-900/40 shadow-md shadow-gray-400/70">
                        <div className="flex justify-between items-center">
                            <h1 className="font-sans font-semibold">
                                Connection Requirements
                            </h1>
                        </div>

                        <div className="flex flex-col justify-center items-start pt-6">
                            <h1 className="text-md font-sans font-semibold pb-1">
                                YouTube Account Requirements:
                            </h1>
                            <div className="flex justify-center items-center space-x-2">
                                <SiTicktick className="text-sm text-blue-500" />
                                <p>Verified YouTube account</p>
                            </div>
                            <div className="flex justify-center items-center space-x-2">
                                <SiTicktick className="text-sm text-blue-500" />
                                <p>Channel with upload permissions</p>
                            </div>
                            <div className="flex justify-center items-center space-x-2">
                                <SiTicktick className="text-sm text-blue-500" />
                                <p>Google account access</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-start pt-6">
                            <h1 className="text-md font-sans font-semibold pb-1">
                                Required Permissions:
                            </h1>
                            <div className="flex justify-center items-center space-x-2">
                                <SiTicktick className="text-sm text-yellow-600" />
                                <p>Upload videos directly to YouTube</p>
                            </div>
                            <div className="flex justify-center items-center space-x-2">
                                <SiTicktick className="text-sm text-yellow-600" />
                                <p>Read channel information</p>
                            </div>
                        </div>

                        <p className="font-sans pt-6 font-thin">
                            Need help? Contact us at{' '}
                            <span className="text-white font-mono tracking-wide underline">
                                rohankumarchaudhary67@gmail.com
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
