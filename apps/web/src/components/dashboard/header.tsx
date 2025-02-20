import Image from 'next/image';
import { ModeToggle } from '../toggle-mode';

export default function HeaderDashboardComponent({
    children,
    heading,
}: Readonly<{
    children: React.ReactNode;
    heading: string;
}>) {
    return (
        <>
            <div className="flex justify-between items-center bg-muted py-4 px-6 rounded-lg">
                <div className="flex justify-center items-center space-x-4">
                    <Image src="/logo.png" alt="logo" width={40} height={40} />
                    <h1 className="font-sans font-bold md:text-2xl">
                        {heading}
                    </h1>
                </div>
                <div className="flex justify-center items-center space-x-4">
                    <ModeToggle />
                    {children}
                </div>
            </div>
        </>
    );
}
