'use client';
import HeaderDashboardComponent from '../header';
import { MdSlowMotionVideo, MdOutlineCheckCircleOutline } from 'react-icons/md';
import { LuClock4 } from 'react-icons/lu';
import CountBoxDashboardComponent from '../count-box';
import { UserNav } from '../user-nav';
import NotificationComponent from '../notification';
import Link from 'next/link';
import { DropdownMenuItem } from '../../ui/dropdown-menu';
import { FaVideo, FaDollarSign, FaUser } from 'react-icons/fa';
import { FaBuildingUser } from 'react-icons/fa6';
import { IoSettingsSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PendingRequestComponent from './pending-request';
import YoutubeEnvironmentComponent from './youtube-environment';
import EditorRequestVideosDashboardComponent from './request-videos';

interface EditorData {
    pendingVideos: number;
    approvedVideos: number;
    rejectedVideos: number;
    totalVideos: number;
}

export default function EditorDashboardComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    const [editorData, setEditorData] = useState<EditorData | null>(null);

    const fetchEditorData = async () => {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/editor/fetch`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        setEditorData(response.data.data);
    };

    useEffect(() => {
        fetchEditorData();
    }, [accessToken]);

    return (
        <>
            <div className="flex flex-col space-y-2">
                <HeaderDashboardComponent heading="Editor Dashboard">
                    <div className="flex justify-center items-center space-x-6 relative">
                        <NotificationComponent />
                        <UserNav>
                            <Link href="/creator-profile">
                                <DropdownMenuItem className="cursor-pointer">
                                    <FaUser />
                                    My Profile
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem>
                                <FaBuildingUser />
                                Creator Profile
                            </DropdownMenuItem>
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

                <div className="flex justify-between items-center space-x-4 pt-2">
                    <CountBoxDashboardComponent
                        heading="Total Videos"
                        count={editorData?.totalVideos ?? 0}
                    >
                        <div className="p-2 rounded-full bg-[#99b3ff]">
                            <MdSlowMotionVideo className="md:text-2xl text-[#0039e6] font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                    <CountBoxDashboardComponent
                        heading="Approved Videos"
                        count={editorData?.approvedVideos ?? 0}
                    >
                        <div className="p-2 rounded-full bg-[#adebad]">
                            <MdOutlineCheckCircleOutline className="md:text-2xl text-[#29a329] font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                    <CountBoxDashboardComponent
                        heading="Pending Approvals"
                        count={editorData?.pendingVideos ?? 0}
                    >
                        <div className="p-2 rounded-full bg-[#ffff80]">
                            <LuClock4 className="md:text-2xl text-[#b3b300] font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                </div>

                <PendingRequestComponent accessToken={accessToken as string} />

                <YoutubeEnvironmentComponent
                    accessToken={accessToken as string}
                />

                {/* <EditorRequestVideosDashboardComponent /> */}
            </div>
        </>
    );
}
