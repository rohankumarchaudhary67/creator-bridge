'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { IoArrowForward } from 'react-icons/io5';
import { ChevronRight } from 'lucide-react';
import { redirect } from 'next/navigation';

export default function Navbar() {
    const redirectAuth = () => {
        redirect('/authentication');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 shadow-lg backdrop-blur-md py-3 transition-all duration-300">
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Logo" width={35} height={35} />
                    <h1 className="text-2xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                        CreatorBridge
                    </h1>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8">
                    <a
                        href="#features"
                        className="hover:text-blue-400 transition-colors"
                    >
                        Features
                    </a>
                    <a
                        href="#testimonials"
                        className="hover:text-blue-400 transition-colors"
                    >
                        Testimonials
                    </a>
                    <a
                        href="#pricing"
                        className="hover:text-blue-400 transition-colors"
                    >
                        Pricing
                    </a>
                    <a
                        href="#faq"
                        className="hover:text-blue-400 transition-colors"
                    >
                        FAQ
                    </a>
                </nav>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="hidden sm:flex border-blue-500 text-blue-400 hover:bg-blue-900/20"
                    >
                        Log In
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={redirectAuth}
                    >
                        Get Started <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
