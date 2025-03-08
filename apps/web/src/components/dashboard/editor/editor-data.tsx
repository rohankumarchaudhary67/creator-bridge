'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CountBoxDashboardComponent from '../count-box';
import { MdSlowMotionVideo, MdOutlineCheckCircleOutline } from 'react-icons/md';
import { LuClock4 } from 'react-icons/lu';
import { EditorData } from '@/types/editor';

export default function EditorDataComponent({
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
        </>
    );
}
