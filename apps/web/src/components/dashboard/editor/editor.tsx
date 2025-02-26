'use client';
import HeaderDashboardComponent from '../header';
import { MdSlowMotionVideo, MdOutlineCheckCircleOutline } from 'react-icons/md';
import { LuClock4 } from 'react-icons/lu';
import CountBoxDashboardComponent from '../count-box';
import EditorRecentVideosDashboardComponent from './recent-videos';
import VideoUploadFormDashboardComponent from './video-upload-form';
import { UserNav } from '../user-nav';
import NotificationComponent from '../notification';
import EditorRequestVideosDashboardComponent from './request-videos';
import Link from 'next/link';
import { DropdownMenuItem } from '../../ui/dropdown-menu';
import { FaVideo, FaDollarSign, FaUser } from 'react-icons/fa';
import { FaBuildingUser } from 'react-icons/fa6';
import { IoSettingsSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';

export default function EditorDashboardComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    const [editorData, setEditorData] = useState();

    const fetchEditorData = async () => {};

    useEffect(() => {
        fetchEditorData();
    }, []);

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
                        count={10}
                    >
                        <div className="p-2 rounded-full bg-blue-100">
                            <MdSlowMotionVideo className="text-primary md:text-2xl text-blue-700 font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                    <CountBoxDashboardComponent
                        heading="Approved Videos"
                        count={2}
                    >
                        <div className="p-2 rounded-full bg-green-100">
                            <MdOutlineCheckCircleOutline className="text-primary md:text-2xl text-green-600 font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                    <CountBoxDashboardComponent
                        heading="Pending Approvals"
                        count={8}
                    >
                        <div className="p-2 rounded-full bg-yellow-100">
                            <LuClock4 className="text-primary md:text-2xl text-yellow-600 font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                </div>

                {/* <EditorRecentVideosDashboardComponent data={data} /> */}
                <VideoUploadFormDashboardComponent />
                {/* <EditorRequestVideosDashboardComponent data={videoData} /> */}
            </div>
        </>
    );
}
