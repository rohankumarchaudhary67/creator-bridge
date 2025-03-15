import Image from 'next/image';

export default function HeaderDashboardComponent({
    children,
    heading,
}: Readonly<{
    children: React.ReactNode;
    heading: string;
}>) {
    return (
        <>
            <div className="flex justify-between items-center bg-purple-900/30 py-4 px-6 rounded-lg shadow-sm shadow-gray-400/70">
                <div className="flex justify-center items-center space-x-4">
                    <Image src="/logo.png" alt="logo" width={40} height={40} />
                    <h1 className="font-sans font-bold md:text-2xl">
                        {heading}
                    </h1>
                </div>
                <div className="flex justify-center items-center space-x-4">
                    {children}
                </div>
            </div>
        </>
    );
}
