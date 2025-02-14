'use client';
import Signup from '@/components/signup';
import { ModeToggle } from '@/components/toggle-mode';

export default function Home() {
    return (
        <>
            <div>
                <ModeToggle />
                <Signup />
            </div>
        </>
    );
}
