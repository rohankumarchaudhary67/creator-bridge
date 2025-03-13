'use client';

import { Badge } from '@/components/ui/badge';
import { ReactNode } from 'react';

export const SectionHeader = ({
    badgeText,
    title,
    description,
    className,
}: {
    badgeText: string;
    title: string;
    description: string;
    className?: string;
}) => (
    <div className={`text-center mb-16 ${className}`}>
        <Badge className="mb-4 bg-blue-900/60 text-blue-200 hover:bg-blue-800/60">
            {badgeText}
        </Badge>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {description}
        </p>
    </div>
);
