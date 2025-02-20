'use client';
import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';

export default function AuthenticationComponent() {
    const handleGoogleAuth = async () => {
        signIn('google');
    };

    return (
        <>
            <div className="md:p-32 flex items-center justify-center h-screen dark:bg-gray-900">
                <div className="flex flex-col md:p-32 space-y-8 bg-black items-center justify-center md:min-h-96 rounded-2xl shadow-lg hover:shadow-gray-800">
                    <div className="flex flex-col justify-center items-center space-y-2">
                        <img src="/logo.png" className="h-10 w-10" alt="" />
                        <h1 className="text-2xl font-semibold font-sans">
                            Authentication
                        </h1>
                        <span>
                            Authentication yourself to continue with Creator
                            Bridge
                        </span>
                    </div>
                    <Button
                        onClick={() => {
                            handleGoogleAuth();
                        }}
                        className="font-sans shadow-lg hover:shadow-gray-700"
                    >
                        <img src="/icons/google.png" className="w-5 h-5" />{' '}
                        Continue with Google
                    </Button>
                </div>
            </div>
        </>
    );
}
