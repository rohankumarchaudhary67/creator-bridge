'use client';
import { useEffect } from 'react';
import CreatorDashboardComponent from './creator/creator';
import EditorDashboardComponent from './editor/editor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '@/redux/slices/user-slice';
import { AppDispatch, RootState } from '@/redux/store';

export default function DashboardComponent({
    accessToken,
}: {
    accessToken: string;
}) {
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchUserData(accessToken));
        }
    }, [dispatch, accessToken]);

    return (
        <>
            <div className="2xl:px-72 md:px-36 px-6 py-6">
                {data.data?.role === 'NoRole' && <div>Loading....</div>}
                {data.data?.role === 'Creator' && (
                    <CreatorDashboardComponent accessToken={accessToken} />
                )}
                {data.data?.role === 'Editor' && (
                    <EditorDashboardComponent accessToken={accessToken} />
                )}
            </div>
        </>
    );
}
