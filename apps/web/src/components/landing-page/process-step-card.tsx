'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

export const ProcessStepCard = ({
    icon: Icon,
    step,
    title,
    description,
}: {
    icon: LucideIcon;
    step: number;
    title: string;
    description: string;
}) => (
    <Card className="bg-slate-900 border-slate-800 h-full">
        <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 rounded-full bg-slate-800 p-3 w-16 h-16 flex items-center justify-center">
                <Icon className="h-12 w-12" />
            </div>
            <Badge
                variant="outline"
                className="mb-2 border-blue-500 text-blue-400"
            >
                Step {step}
            </Badge>
            <CardTitle className="mt-2">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-slate-300">
            <p>{description}</p>
        </CardContent>
    </Card>
);
