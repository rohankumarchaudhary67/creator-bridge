import RoleComponent from '@/components/authentication/role';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Role() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/authentication');
    }

    return (
        <>
            <RoleComponent accessToken={session?.accessToken as string} />
        </>
    );
}
