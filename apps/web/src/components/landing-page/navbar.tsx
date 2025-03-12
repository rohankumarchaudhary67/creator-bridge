'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { IoArrowForward } from 'react-icons/io5';
import { ChevronRight, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function Navbar() {
    const [darkMode, setDarkMode] = useState(false);

    // Check localStorage for dark mode preference on initial load
    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDark);
    }, []);

    // Update dark mode class and localStorage when state changes
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode]);

    const redirectAuth = () => {
        redirect('/authentication');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 shadow-lg backdrop-blur-md py-3 transition-all duration-300">
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={35}
                        height={35}
                        className="dark:invert"
                    />
                    <h1 className="text-2xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:to-gray-500">
                        CreatorBridge
                    </h1>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8">
                    <a
                        href="#features"
                        className="text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        Features
                    </a>
                    <a
                        href="#testimonials"
                        className="text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        Testimonials
                    </a>
                    <a
                        href="#pricing"
                        className="text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        Pricing
                    </a>
                    <a
                        href="#faq"
                        className="text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        FAQ
                    </a>
                </nav>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDarkMode(!darkMode)}
                        className="text-slate-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                        {darkMode ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        className="hidden sm:flex border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                        Log In
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                        onClick={redirectAuth}
                    >
                        Get Started <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
