'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import Image from 'next/image';

export default function AuthenticationComponent() {
    const handleGoogleAuth = async () => {
        await signIn('google', {
            redirect: true,
            callbackUrl: '/authentication/role',
        });
    };

    const featureColumns = [
        [
            'Save you Time & Bandwidth',
            'Seamless YouTube Integration',
            'Efficient Collaboration',
        ],
        [
            'Connect YouTube account easily',
            'Intuitive Interface',
            'Streamlined Workflow',
        ],
    ];

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-10 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <div className="text-center space-y-4">
                <h1 className="font-sans font-semibold text-3xl">
                    Get Started with Creator Bridge
                </h1>
                <p className="font-sans text-lg text-muted-foreground">
                    Create your account effortlessly with your Google account
                    <br /> and unlock the full potential of Creator Bridge!
                </p>
            </div>

            <div className="flex flex-wrap justify-center items-start space-x-4 md:pt-6 w-full">
                {featureColumns.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col space-y-4">
                        {column.map((feature, index) => (
                            <div
                                key={index}
                                className=" px-6 py-3 rounded-md flex items-center space-x-3"
                            >
                                <Image
                                    src="/icons/check.png"
                                    alt="Check Icon"
                                    width={20}
                                    height={20}
                                />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="pt-10">
                <Button
                    onClick={handleGoogleAuth}
                    className="font-sans font-semibold flex items-center space-x-2"
                >
                    <Image
                        src="/icons/google.png"
                        alt="Google Icon"
                        width={20}
                        height={20}
                    />
                    <span>Sign in with Google</span>
                </Button>
            </div>
        </div>
    );
}
