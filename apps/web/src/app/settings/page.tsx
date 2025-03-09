'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '@/redux/slices/user-slice';
import { AppDispatch, RootState } from '@/redux/store';
import SettingsPage from './settings';

export default function SettingsContainer({
    accessToken,
}: {
    accessToken: string;
}) {
    const dispatch = useDispatch<AppDispatch>();
    const userData = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(fetchUserData(accessToken));
    }, [dispatch, accessToken]);

    return (
        <>
            <div className="2xl:px-72 md:px-36 px-6 py-6">
                <SettingsPage accessToken={accessToken} />
            </div>
        </>
    );
}
