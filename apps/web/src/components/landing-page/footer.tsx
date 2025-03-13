'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Youtube,
    Twitter,
    Instagram,
    Linkedin,
    Github,
    Mail,
    HeartHandshake,
} from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <HeartHandshake className="h-8 w-8 text-blue-500" />
                            <span className="text-xl font-bold">
                                CreatorBridge
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Empowering creators to collaborate and grow their
                            audience through innovative tools and seamless
                            workflows.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold mb-2">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { href: '#features', text: 'Features' },
                                { href: '#testimonials', text: 'Testimonials' },
                                { href: '#pricing', text: 'Pricing' },
                                { href: '/blog', text: 'Blog' },
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold mb-2">Legal</h3>
                        <ul className="space-y-2">
                            {[
                                { href: '/privacy', text: 'Privacy Policy' },
                                { href: '/terms', text: 'Terms of Service' },
                                { href: '/security', text: 'Security' },
                                { href: '/contact', text: 'Contact' },
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-blue-400 transition-colors text-sm"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold mb-2">
                            Connect With Us
                        </h3>
                        <div className="flex gap-4">
                            {[
                                { icon: Youtube, href: 'https://youtube.com' },
                                { icon: Twitter, href: 'https://twitter.com' },
                                {
                                    icon: Instagram,
                                    href: 'https://instagram.com',
                                },
                                {
                                    icon: Linkedin,
                                    href: 'https://linkedin.com',
                                },
                                { icon: Github, href: 'https://github.com' },
                            ].map((social, index) => (
                                <Button
                                    key={index}
                                    variant="ghost"
                                    size="icon"
                                    className="text-slate-400 hover:bg-slate-800 hover:text-blue-400"
                                    asChild
                                >
                                    <Link
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <social.icon className="h-5 w-5" />
                                    </Link>
                                </Button>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Button
                                variant="outline"
                                className="border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-400"
                                asChild
                            >
                                <Link href="mailto:support@creatorbridge.com">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Contact Support
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-800 pt-8 text-center">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} CreatorBridge. All rights
                        reserved.
                    </p>
                    <p className="text-slate-600 text-xs mt-2">
                        Built with ❤️ for content creators worldwide
                    </p>
                </div>
            </div>
        </footer>
    );
}
