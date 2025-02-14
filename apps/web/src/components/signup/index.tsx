import { signIn, signOut } from 'next-auth/react';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';

export default function Signup() {
    const { data: session } = useSession();

    return (
        <div>
            {session ? (
                <Button
                    onClick={() => {
                        signOut();
                    }}
                >
                    SignOut
                </Button>
            ) : (
                <Button
                    onClick={() => {
                        signIn('google');
                    }}
                >
                    Signup
                </Button>
            )}
        </div>
    );
}
