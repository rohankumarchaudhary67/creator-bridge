import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

export const TestimonialCard = ({
    name,
    role,
    avatar,
    quote,
    rating,
}: {
    name: string;
    role: string;
    avatar: string;
    quote: string;
    rating: number;
}) => (
    <Card className="bg-slate-900 border-slate-800">
        <CardContent className="pt-6">
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-slate-600'}`}
                    />
                ))}
            </div>
            <p className="text-slate-300 italic mb-6">"{quote}"</p>
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-white text-sm">{role}</p>
                </div>
            </div>
        </CardContent>
    </Card>
);
