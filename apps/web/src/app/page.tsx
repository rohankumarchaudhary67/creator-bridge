import Header from '@/components/landing-page/header';
import Navbar from '@/components/landing-page/navbar';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect('/dashboard');
    }

    return (
        <>
            <div className="md:px-32">
                <Navbar />
                <Header />
            </div>
        </>
    );
}
