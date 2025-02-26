import AuthenticationComponent from '@/components/authentication/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Authentication() {
    const session = await getServerSession();
    if (session) {
        redirect('/dashboard');
    }
    return (
        <>
            <AuthenticationComponent />
        </>
    );
}
