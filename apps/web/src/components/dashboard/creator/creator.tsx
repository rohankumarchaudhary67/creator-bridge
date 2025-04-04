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
import { useCallback } from 'react';

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

    const fetchCreatorData = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/creator/fetch`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setCreatorData(response.data.data);
        } catch (error) {
            console.error('Error fetching creator data:', error);
        }
    }, [accessToken]); // Add dependencies

    useEffect(() => {
        fetchCreatorData();
    }, [fetchCreatorData]); // Now fetchCreatorData is a stable dependency

    return (
        <>
            <div className="flex flex-col space-y-2">
                <HeaderDashboardComponent heading="Creator Dashboard">
                    <div className="flex justify-center items-center space-x-6">
                        <UserNav>
                            <div className="flex flex-col justify-start items-start space-y-2">
                                <Link href="/creator-profile">
                                    <DropdownMenuItem className="cursor-pointer text-md font-sans font-semibold hover:text-purple-500">
                                        <FaUser />
                                        My Profile
                                    </DropdownMenuItem>
                                </Link>

                                <DropdownMenuItem className="cursor-pointer text-md font-sans font-semibold hover:text-purple-500">
                                    <FaVideo />
                                    Request Videos
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer text-md font-sans font-semibold hover:text-purple-500">
                                    <FaDollarSign />
                                    Billing
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer text-md font-sans font-semibold hover:text-purple-500">
                                    <IoSettingsSharp />
                                    Settings
                                </DropdownMenuItem>
                            </div>
                        </UserNav>
                    </div>
                </HeaderDashboardComponent>

                <div className="flex justify-between items-center space-x-4 pt-4">
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
                                className="font-bold hover:underline font-sans tracking-wide hover:text-purple-500 hover:bg-transparent"
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
