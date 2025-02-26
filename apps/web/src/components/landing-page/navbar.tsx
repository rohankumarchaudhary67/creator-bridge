'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { IoArrowForward } from 'react-icons/io5';
import { redirect } from 'next/navigation';

export default function Navbar() {
    const redirectAuth = () => {
        redirect('/authentication');
    };

    return (
        <>
            <div className="flex justify-between items-center p-4">
                <Link href="/" className="flex items-center space-x-4">
                    <Image src="/logo.png" alt="Logo" width={35} height={35} />
                    <h1 className="text-2xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                        Creator Bridge
                    </h1>
                </Link>

                <div></div>

                <div>
                    <Button
                        className="cursor-pointer font-sans font-semibold"
                        onClick={() => {
                            redirectAuth();
                        }}
                    >
                        Get Started <IoArrowForward />
                    </Button>
                </div>
            </div>
        </>
    );
}
