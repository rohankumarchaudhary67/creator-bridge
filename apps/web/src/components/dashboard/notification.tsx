import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MdOutlineNotificationsActive } from 'react-icons/md';

export default function NotificationComponent() {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="relative cursor-pointer">
                        <MdOutlineNotificationsActive className="text-primary md:text-xl" />
                        {/* Notification Badge */}
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            12
                        </span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal cursor-pointer">
                        The Great wall of china video is reviewed by Creator
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="font-normal cursor-pointer">
                        The Great wall of china video is reviewed by Creator
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="font-normal cursor-pointer">
                        Tasdfsd
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="font-normal cursor-pointer">
                        The Great wall of china video is reviewed by Creator
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
