import DashboardComponent from '@/components/dashboard';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';
import axios from 'axios';
import { authOptions } from '@/lib/auth';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/store/atoms/user';

const metadata: Metadata = {
    title: 'Dashboard | Creator Bridge',
};

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/authentication');
    }

    return (
        <>
            <DashboardComponent accessToken={session.accessToken!} />
        </>
    );
}
