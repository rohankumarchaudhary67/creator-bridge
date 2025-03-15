import HeaderDashboardComponent from '../header';
import NotificationComponent from '../notification';
import Link from 'next/link';
import { DropdownMenuItem } from '../../ui/dropdown-menu';
import { FaVideo, FaDollarSign, FaUser } from 'react-icons/fa';
import { FaBuildingUser } from 'react-icons/fa6';
import { IoSettingsSharp } from 'react-icons/io5';
import { UserNav } from '../user-nav';

export default function EditorHeaderComponent() {
    return (
        <>
            <HeaderDashboardComponent heading="Editor Dashboard">
                <div className="flex justify-center items-center space-x-6 relative">
                    <UserNav>
                        <div className="flex flex-col justify-start items-start space-y-2">
                            <Link href="/creator-profile">
                                <DropdownMenuItem className="cursor-pointer text-md font-sans font-semibold hover:text-purple-500">
                                    <FaUser />
                                    My Profile
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="cursor-pointer text-md font-sans font-semibold hover:text-purple-500">
                                <FaBuildingUser />
                                Creator Profile
                            </DropdownMenuItem>
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
        </>
    );
}
