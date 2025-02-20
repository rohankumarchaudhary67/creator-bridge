'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RoleComponent() {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        setRole('Creator');
    }, []);

    useEffect(() => {
        if (role === 'Creator') {
            redirect('/dashboard');
        }
    }, [role]);

    if (role === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="md:p-32 flex items-center justify-center h-screen dark:bg-gray-900">
                <div className="flex flex-col md:p-32 space-y-8 bg-black items-center justify-center md:min-h-96 rounded-2xl shadow-lg hover:shadow-gray-800">
                    <div className="flex flex-col justify-center items-center space-y-2">
                        <img src="/logo.png" className="h-10 w-10" alt="" />
                        <h1 className="text-2xl font-semibold font-sans">
                            Select your Role
                        </h1>
                        <span>
                            Authenticate yourself to continue with Creator
                            Bridge
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
