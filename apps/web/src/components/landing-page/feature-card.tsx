import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { Check } from 'lucide-react';

export const FeatureCard = ({
    icon: Icon,
    title,
    description,
    features,
}: {
    icon: LucideIcon;
    title: string;
    description: string;
    features: string[];
}) => (
    <Card className="bg-slate-900 text-white border-slate-800 shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10 transition-all hover:-translate-y-1">
        <CardHeader>
            <Icon className="h-12 w-12 mb-4" />
            <CardTitle>{title}</CardTitle>
            <CardDescription className="text-white">
                {description}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-2">
                {features.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
);
