'use client';
import HeaderDashboardComponent from '../header';
import CountBoxDashboardComponent from '../count-box';
import { MdOutlineCheckCircleOutline } from 'react-icons/md';
import ApprovalVideoDataComponent from './approval-video-data';
import { UserNav } from '../user-nav';
import Link from 'next/link';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { FaDollarSign, FaHouseUser, FaUser, FaVideo } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import NotificationComponent from '../notification';
import { LuClock4 } from 'react-icons/lu';
import YoutubeIntegrationDashboardComponent from './youtube-integration';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import YouTubeChannelDetailsComponent from './youtube-channel';
import { IoArrowForward } from 'react-icons/io5';
import PreviewVideoComponent from './preview';

interface CreatorData {
    pendingVideos: number;
    approvedVideos: number;
    rejectedVideos: number;
    editors: number;
    connectionStatus: boolean;
}

export default function CreatorDashboardComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    const [creatorData, setCreatorData] = useState<CreatorData | null>(null);

    const fetchCreatorData = async () => {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/creator/fetch`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        setCreatorData(response.data.data);
    };

    useEffect(() => {
        fetchCreatorData();
    }, [accessToken]);

    return (
        <>
            <div className="flex flex-col space-y-2">
                <HeaderDashboardComponent heading="Creator Dashboard">
                    <div className="flex justify-center items-center space-x-6">
                        <NotificationComponent />
                        <UserNav>
                            <Link href="/creator-profile">
                                <DropdownMenuItem className="cursor-pointer">
                                    <FaUser />
                                    My Profile
                                </DropdownMenuItem>
                            </Link>

                            <DropdownMenuItem>
                                <FaVideo />
                                Request Videos
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FaDollarSign />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IoSettingsSharp />
                                Settings
                            </DropdownMenuItem>
                        </UserNav>
                    </div>
                </HeaderDashboardComponent>

                <div className="flex justify-between items-center space-x-4">
                    <CountBoxDashboardComponent
                        heading="Approved Videos"
                        count={creatorData?.approvedVideos ?? 0}
                    >
                        <div className="p-2 rounded-full bg-[#adebad]">
                            <MdOutlineCheckCircleOutline className="md:text-2xl text-[#29a329] font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                    <CountBoxDashboardComponent
                        heading="Pending Requests"
                        count={creatorData?.pendingVideos ?? 0}
                    >
                        <div className="p-2 rounded-full bg-[#ffff80]">
                            <LuClock4 className="md:text-2xl text-[#b3b300] font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                    <CountBoxDashboardComponent
                        heading="Rejected Videos"
                        count={creatorData?.rejectedVideos ?? 0}
                    >
                        <div className="p-2 rounded-full bg-[#ffad99]">
                            <MdOutlineCheckCircleOutline className="md:text-2xl text-[#e62e00] font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                    <CountBoxDashboardComponent
                        heading="Total Editors"
                        count={creatorData?.editors ?? 0}
                    >
                        <div className="p-2 rounded-full bg-[#99b3ff]">
                            <FaHouseUser className="md:text-2xl text-[#0039e6] font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                </div>

                {!creatorData?.connectionStatus && (
                    <YoutubeIntegrationDashboardComponent
                        accessToken={accessToken}
                    />
                )}

                {creatorData?.connectionStatus && (
                    <>
                        <ApprovalVideoDataComponent
                            accessToken={accessToken as string}
                        />
                        <div className="flex justify-end pb-6">
                            <Button
                                className="font-bold hover:underline font-sans tracking-wide hover:dark:bg-black"
                                variant={'ghost'}
                            >
                                View all <IoArrowForward />
                            </Button>
                        </div>
                        <YouTubeChannelDetailsComponent
                            accessToken={accessToken}
                        />
                    </>
                )}
            </div>
        </>
    );
}
