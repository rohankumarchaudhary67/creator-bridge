import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = getServerSession();
    if (!session) {
    } else {
        console.log(session);
        redirect('/dashboard');
    }
    return <></>;
}
