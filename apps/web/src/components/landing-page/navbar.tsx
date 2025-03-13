'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { IoArrowForward, IoMenu, IoClose } from 'react-icons/io5';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigationLinks = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Documentation', href: '/docs' },
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAuthRedirect = () => {
        router.push('/authentication');
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <nav className="fixed w-full top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 border-b">
            <div className="container flex justify-between items-center h-16 px-4">
                {/* Logo Section */}
                <Link href="/" className="flex items-center space-x-3">
                    <Image
                        src="/logo.png"
                        alt="Creator Bridge Logo"
                        width={35}
                        height={35}
                        className="rounded-lg"
                    />
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        Creator Bridge
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navigationLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="hidden sm:inline-flex"
                    >
                        {mounted && (
                            <>
                                {theme === 'dark' ? (
                                    <span className="i-lucide-sun h-5 w-5" />
                                ) : (
                                    <span className="i-lucide-moon h-5 w-5" />
                                )}
                            </>
                        )}
                    </Button>

                    <Button
                        className="hidden sm:flex items-center gap-2"
                        onClick={handleAuthRedirect}
                    >
                        Get Started
                        <IoArrowForward className="h-4 w-4" />
                    </Button>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <IoClose className="h-6 w-6" />
                        ) : (
                            <IoMenu className="h-6 w-6" />
                        )}
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={cn(
                        'md:hidden absolute top-16 right-0 w-full h-[calc(100vh-4rem)] bg-background transition-transform duration-300',
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    )}
                >
                    <div className="flex flex-col items-center py-8 gap-6">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-foreground/80 hover:text-foreground"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Button
                            className="w-48 flex items-center gap-2 mt-4"
                            onClick={handleAuthRedirect}
                        >
                            Get Started
                            <IoArrowForward className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            className="w-48"
                            onClick={toggleTheme}
                        >
                            {mounted && (
                                <>
                                    {theme === 'dark'
                                        ? 'Light Theme'
                                        : 'Dark Theme'}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
