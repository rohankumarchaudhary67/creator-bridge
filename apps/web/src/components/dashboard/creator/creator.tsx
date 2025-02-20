import HeaderDashboardComponent from './header';
import { Button } from '../ui/button';
import { IoLogoYoutube } from 'react-icons/io';
import CountBoxDashboardComponent from './count-box';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import Image from 'next/image';
import DataTableDashboardComponent from './data-table';
import ApprovalVideoDataComponent from './approval-video-data';

export default function CreatorDashboardComponent() {
    const data = [
        {
            id: '123456789',
            thumbnail: '/test-thumbnail.jpeg',
            title: 'The Great wall of china',
            category: 'Technology',
            duration: '2:30 mins',
            uploadedBy: {
                name: 'Rohan Chaudhary',
                email: 'rohan@creator.xyz',
                avatar: '/test.jpg',
            },
            timeAgo: '2025-02-20',
        },
        {
            id: '12345789',
            thumbnail: '/test-thumbnail.jpeg',
            title: 'The Great wall of china',
            category: 'Technology',
            duration: '2:30 mins',
            uploadedBy: {
                name: 'Rohan Chaudhary',
                email: 'rohan@creator.xyz',
                avatar: '/test.jpg',
            },
            timeAgo: '2025-02-20',
        },
        {
            id: '12345679',
            thumbnail: '/test-thumbnail.jpeg',
            title: 'The Great wall of china',
            category: 'Technology',
            duration: '2:30 mins',
            uploadedBy: {
                name: 'Rohan Chaudhary',
                email: 'rohan@creator.xyz',
                avatar: '/test.jpg',
            },
            timeAgo: '2025-02-20',
        },
    ];
    return (
        <>
            <div className="flex flex-col space-y-6">
                <HeaderDashboardComponent heading="Creator Dashboard">
                    <div className="flex justify-center items-center space-x-6">
                        <Button className="bg-red-600 text-white font-semibold font-sans flex justify-center items-center text-md">
                            <IoLogoYoutube />
                            <span className="text-md">Connect YouTube</span>
                        </Button>
                        <MdOutlineNotificationsActive className="text-primary md:text-2xl" />
                        <Image
                            src="/test.jpg"
                            alt="logo"
                            className="rounded-full"
                            width={40}
                            height={40}
                        />
                    </div>
                </HeaderDashboardComponent>

                <div className="flex justify-between items-center space-x-6">
                    <CountBoxDashboardComponent
                        heading="Total Videos"
                        count={10}
                        secondaryColor="#8aa8de"
                    >
                        <div className="p-2 rounded-full bg-blue-100">
                            <MdOutlineNotificationsActive className="text-primary md:text-2xl text-blue-900 font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                    <CountBoxDashboardComponent
                        heading="Total Videos"
                        count={10}
                        secondaryColor="#8aa8de"
                    >
                        <div className="p-2 rounded-full bg-blue-100">
                            <MdOutlineNotificationsActive className="text-primary md:text-2xl text-blue-900 font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                    <CountBoxDashboardComponent
                        heading="Total Videos"
                        count={10}
                        secondaryColor="#8aa8de"
                    >
                        <div className="p-2 rounded-full bg-blue-100">
                            <MdOutlineNotificationsActive className="text-primary md:text-2xl text-blue-900 font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                    <CountBoxDashboardComponent
                        heading="Total Videos"
                        count={10}
                        secondaryColor="#8aa8de"
                    >
                        <div className="p-2 rounded-full bg-blue-100">
                            <MdOutlineNotificationsActive className="text-primary md:text-2xl text-blue-900 font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                </div>

                <ApprovalVideoDataComponent
                    data={data}
                    heading="Recent Videos"
                />
            </div>
        </>
    );
}
