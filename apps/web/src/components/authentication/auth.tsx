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

    return (
        <>
            <div className="flex flex-col space-y-10 justify-center items-center h-screen bg-background">
                <div className="flex flex-col space-y-4 items-center">
                    <h1 className="font-sans font-semibold md:text-3xl">
                        Get Started with Creator Bridge
                    </h1>
                    <p className="text-center font-sans text-muted-foreground text-lg">
                        Create your account effortlessly with your Google
                        account <br /> and unlock the full potential of Creator
                        Bridge!
                    </p>
                </div>

                <div className="flex justify-center items-center space-x-4 md:pt-6 flex-wrap w-full">
                    <div className="flex flex-col space-y-4">
                        <div className="bg-muted md:px-6 md:py-3 rounded-md flex items-center justify-start space-x-3">
                            <Image
                                src="/icons/check.png"
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            <span>Save you Time & Bandwidth</span>
                        </div>
                        <div className="bg-muted md:px-6 md:py-3 rounded-md flex items-center justify-start space-x-3">
                            <Image
                                src="/icons/check.png"
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            <span>Seamless YouTube Integration</span>
                        </div>
                        <div className="bg-muted md:px-6 md:py-3 rounded-md flex items-center justify-start space-x-3">
                            <Image
                                src="/icons/check.png"
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            <span>Efficient Collaboration</span>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div className="bg-muted md:px-6 md:py-3 rounded-md flex items-center justify-start space-x-3">
                            <Image
                                src="/icons/check.png"
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            <span>Connect YouTube account easily</span>
                        </div>
                        <div className="bg-muted md:px-6 md:py-3 rounded-md flex items-center justify-start space-x-3">
                            <Image
                                src="/icons/check.png"
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            <span>Intuitive Interface</span>
                        </div>
                        <div className="bg-muted md:px-6 md:py-3 rounded-md flex items-center justify-start space-x-3">
                            <Image
                                src="/icons/check.png"
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            <span>Streamlined Workflow:</span>
                        </div>
                    </div>
                </div>

                <div className="md:pt-10">
                    <Button
                        onClick={handleGoogleAuth}
                        className="font-sans font-semibold"
                    >
                        <Image
                            src="/icons/google.png"
                            alt="Google"
                            width={20}
                            height={20}
                        />
                        <span>Sign in with Google</span>
                    </Button>
                </div>
            </div>
        </>
    );
}
