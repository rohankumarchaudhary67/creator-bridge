import { Footer, Navbar } from '@/components/landing-page';

export default function ExtraLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
