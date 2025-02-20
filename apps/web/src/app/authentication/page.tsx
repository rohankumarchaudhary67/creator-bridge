import AuthenticationComponent from '@/components/authentication/auth';
import RoleComponent from '@/components/authentication/role';
import { getServerSession } from 'next-auth';

export default async function Authentication() {
    const session = await getServerSession();
    if (!session) {
        return (
            <>
                <AuthenticationComponent />
            </>
        );
    } else {
        return (
            <>
                <RoleComponent />
            </>
        );
    }
}
