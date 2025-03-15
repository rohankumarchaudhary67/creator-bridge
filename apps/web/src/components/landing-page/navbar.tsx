import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export default function Navbar() {
    const navigationLinks = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Docs', href: '/docs' },
    ];

    return (
        <nav className="fixed w-full top-0 z-50 backdrop-blur-2xl 2xl:px-40 md:px-36 px-6 py-1 border-b">
            <div className="flex justify-between items-center h-16">
                <Link href="/" className="flex items-center space-x-3">
                    <Image
                        src="/logo.png"
                        alt="Creator Bridge Logo"
                        width={35}
                        height={35}
                        className="rounded-lg"
                    />
                    <span className="text-3xl font-semibold font-sans text-transparent text-white">
                        Creator Bridge
                    </span>
                </Link>

                <div className="md:flex items-center space-x-10">
                    {navigationLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-lg font-sans hover:text-purple-300"
                        >
                            {' '}
                            {link.name}{' '}
                        </Link>
                    ))}
                </div>

                <Link href={'/authentication'}>
                    <Button className="font-sans text-md text-white bg-purple-600 hover:bg-purple-800">
                        Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </nav>
    );
}
