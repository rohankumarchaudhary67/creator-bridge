'use client';
import axios from 'axios';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '../ui/button';
import { IoArrowForward } from 'react-icons/io5';
import { useCallback, useEffect, useState } from 'react';

export default function RoleComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('Editor');

    const fetchUserData = async () => {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/fetch`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (
            response.data.data.role === 'Creator' ||
            response.data.data.role === 'Editor'
        ) {
            redirect('/dashboard');
        }

        setLoading(false);
    };

    const handleRoleChange = async () => {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/role`,
            {
                role: role,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (response.data.success) {
            redirect('/dashboard');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [accessToken]);

    return (
        <>
            {loading && <>Loading...</>}
            {!loading && (
                <div className="flex flex-col justify-center items-center h-screen space-y-10">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex space-x-4 items-center">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                width={35}
                                height={35}
                            />
                            <h1 className="text-4xl font-bold font-sans">
                                Creator Bridge
                            </h1>
                        </div>
                        <p className="font-sans text-2xl pt-4 text-muted-foreground">
                            Select your role to continue
                        </p>
                    </div>
                    <div className="flex flex-col space-y-4 items-center">
                        <RadioGroup
                            defaultValue="Editor"
                            className="flex justify-center items-center space-x-6"
                        >
                            <div className="flex flex-col space-y-10 border-2 p-8 items-center justify-center rounded-xl">
                                <div className="flex flex-col space-y-4">
                                    <div className="bg-muted md:px-6 md:py-3 rounded-md flex items-center justify-start space-x-3">
                                        <Image
                                            src="/icons/editor.png"
                                            alt="Google"
                                            width={20}
                                            height={20}
                                        />
                                        <span>Seamless Upload Process</span>
                                    </div>
                                    <div className="bg-muted md:px-6 md:py-3 rounded-md flex items-center justify-start space-x-3">
                                        <Image
                                            src="/icons/editor.png"
                                            alt="Google"
                                            width={20}
                                            height={20}
                                        />
                                        <span>Faster Approvals</span>
                                    </div>
                                    <div className="bg-muted md:px-6 md:py-3 rounded-md flex items-center justify-start space-x-3">
                                        <Image
                                            src="/icons/editor.png"
                                            alt="Google"
                                            width={20}
                                            height={20}
                                        />
                                        <span>Efficient Collaboration</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="Editor"
                                        id="editor"
                                        onClick={() => {
                                            setRole('Editor');
                                        }}
                                    />
                                    <Label
                                        htmlFor="editor"
                                        className="font-sans font-bold text-xl"
                                    >
                                        Video Editor
                                    </Label>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-10 border-2 p-8 items-center justify-center rounded-xl">
                                <div className="flex flex-col space-y-4">
                                    <div className="bg-muted md:px-6 md:py-3 rounded-md flex items-center justify-start space-x-3">
                                        <Image
                                            src="/icons/creator.png"
                                            alt="Google"
                                            width={20}
                                            height={20}
                                        />
                                        <span>One-Click Approvals</span>
                                    </div>
                                    <div className="bg-muted md:px-6 md:py-3 rounded-md flex items-center justify-start space-x-3">
                                        <Image
                                            src="/icons/creator.png"
                                            alt="Google"
                                            width={20}
                                            height={20}
                                        />
                                        <span>Save Time & Bandwidth</span>
                                    </div>
                                    <div className="bg-muted md:px-6 md:py-3 rounded-md flex items-center justify-start space-x-3">
                                        <Image
                                            src="/icons/creator.png"
                                            alt="Google"
                                            width={20}
                                            height={20}
                                        />
                                        <span>Seamless Video Preview</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="Creator"
                                        id="creator"
                                        onClick={() => {
                                            setRole('Creator');
                                        }}
                                    />
                                    <Label
                                        htmlFor="Creator"
                                        className="font-sans font-bold text-xl"
                                    >
                                        YouTube Creator
                                    </Label>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button
                        className="font-sans font-semibold"
                        onClick={() => handleRoleChange()}
                    >
                        Continue as {role} <IoArrowForward />
                    </Button>
                </div>
            )}
        </>
    );
}
