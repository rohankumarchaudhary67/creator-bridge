import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export const PricingCard = ({
    title,
    price,
    description,
    features,
    isPopular = false,
    buttonText,
}: {
    title: string;
    price: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    buttonText: string;
}) => (
    <Card className="bg-slate-900 text-white border-slate-800 shadow-xl hover:shadow-blue-900/10 transition-all relative flex flex-col justify-between">
        {isPopular && (
            <div className="absolute top-0 right-0 -translate-y-1/2 bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                Most Popular
            </div>
        )}
        <div>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <div className="mt-4 mb-2">
                    <span className="text-4xl font-bold">{price}</span>
                    <span className="text-white">/month</span>
                </div>
                <CardDescription className="text-white">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-500" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </div>
        <CardFooter>
            <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                {buttonText}
            </Button>
        </CardFooter>
    </Card>
);
