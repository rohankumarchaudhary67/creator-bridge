import DashboardComponent from '@/components/dashboard';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function CreatorDashboard() {
    const session = await getServerSession();
    if (!session) {
        redirect('/authentication');
    }
    return (
        <>
            <DashboardComponent />
        </>
    );
}
