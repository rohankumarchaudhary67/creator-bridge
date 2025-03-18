import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { Session_Provider } from '@/providers/session-provider';
import ReduxProvider from '@/providers/redux-provider';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/landing-page';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Creator Bridge | Save your time & Internet',
    description: 'Creator Bridge',
    icons: {
        icon: '/logo.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Session_Provider>
                        <ReduxProvider>
                            <Navbar />
                            {children}
                        </ReduxProvider>
                        <Toaster richColors />
                    </Session_Provider>
                </ThemeProvider>
            </body>
        </html>
    );
}
