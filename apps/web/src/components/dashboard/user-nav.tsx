import { useSelector } from 'react-redux';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
import { signOut } from 'next-auth/react';

export function UserNav({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const data = useSelector((state: RootState) => state.user);

    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: '/',
        });
    };

    return (
        <AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
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
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <AlertDialogTrigger className="w-full">
                            <MdLogout />
                            Log out
                        </AlertDialogTrigger>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will logout your
                        account and you need to signin again to access.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-900 hover:bg-red-800 text-white font-sans font-semibold"
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
