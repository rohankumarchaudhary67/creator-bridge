'use client';
import { RecoilRoot } from 'recoil';

export const RecoilProviders = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <RecoilRoot>{children}</RecoilRoot>;
};
