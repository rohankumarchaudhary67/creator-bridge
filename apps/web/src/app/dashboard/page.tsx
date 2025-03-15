import DashboardComponent from '@/components/dashboard';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/authentication');
    }

    return (
        <>
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 min-h-screen">
                <DashboardComponent
                    accessToken={session.accessToken as string}
                />
            </div>
        </>
    );
}
