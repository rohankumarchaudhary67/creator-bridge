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
        </>
    );
}
