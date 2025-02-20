import HeaderDashboardComponent from '../header';
import CountBoxDashboardComponent from '../count-box';
import { MdOutlineCheckCircleOutline, MdSlowMotionVideo } from 'react-icons/md';
import ApprovalVideoDataComponent from './approval-video-data';
import { UserNav } from '../user-nav';
import Link from 'next/link';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { FaDollarSign, FaHouseUser, FaUser, FaVideo } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import NotificationComponent from '../notification';
import { LuClock4 } from 'react-icons/lu';
import YoutubeIntegrationDashboardComponent from './youtube-integration';

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
            },
            timeAgo: '2025-02-20',
        },
    ];
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

                <div className="flex justify-between items-center space-x-4 pt-2">
                    <CountBoxDashboardComponent
                        heading="Total Videos"
                        count={10}
                    >
                        <div className="p-2 rounded-full bg-blue-100">
                            <MdSlowMotionVideo className="text-primary md:text-2xl text-blue-800 font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                    <CountBoxDashboardComponent
                        heading="Pending Requests"
                        count={10}
                    >
                        <div className="p-2 rounded-full bg-yellow-100">
                            <LuClock4 className="text-primary md:text-2xl text-yellow-600 font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                    <CountBoxDashboardComponent
                        heading="Approved Videos"
                        count={10}
                    >
                        <div className="p-2 rounded-full bg-green-100">
                            <MdOutlineCheckCircleOutline className="text-primary md:text-2xl text-green-700 font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                    <CountBoxDashboardComponent
                        heading="Total Editors"
                        count={10}
                    >
                        <div className="p-2 rounded-full bg-blue-100">
                            <FaHouseUser className="text-primary md:text-2xl text-blue-800 font-bold" />
                        </div>
                    </CountBoxDashboardComponent>
                </div>

                <YoutubeIntegrationDashboardComponent />

                <ApprovalVideoDataComponent data={data} />
            </div>
        </>
    );
}
