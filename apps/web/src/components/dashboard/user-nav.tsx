import { useSelector } from 'react-redux';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MdLogout } from 'react-icons/md';
import { RootState } from '@/redux/store';
import Image from 'next/image';

export function UserNav({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const data = useSelector((state: RootState) => state.user);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Image
                    src={data.data?.image!}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {data.data?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {data.data?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>{children}</DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <MdLogout />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
