'use client';
import { useEffect } from 'react';
import CreatorDashboardComponent from './creator/creator';
import EditorDashboardComponent from './editor/editor';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/store/atoms/user';

export default function DashboardComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    const [user, setUser] = useRecoilState(userAtom);

    const fetchUserData = async () => {
        const user = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/fetch`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
    };

    useEffect(() => {
        fetchUserData();
    }, [accessToken]);

    return (
        <>
            <div className="2xl:px-72 md:px-36 px-6 py-6"></div>
        </>
    );
}
