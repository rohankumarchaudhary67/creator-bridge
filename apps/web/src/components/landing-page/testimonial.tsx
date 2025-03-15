import { testimonials } from '@/data/landing-page';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel';
import { SectionHeader } from './section-header';
import { TestimonialCard } from './testimonial-card';

export default function TestimonialComponent() {
    return (
        <>
            <section id="testimonials" className="py-20 bg-slate-950/50">
                <div className="container mx-auto px-4">
                    <section id="testimonials" className="py-20">
                        <div className="container mx-auto px-4">
                            <SectionHeader
                                badgeText="Success Stories"
                                title="What Creators Are Saying"
                                description="Join thousands of content creators who have transformed their workflow with CreatorBridge"
                            />
                            <Carousel className="w-full max-w-5xl mx-auto">
                                <CarouselContent>
                                    {testimonials.map((testimonial, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="md:basis-1/1"
                                        >
                                            <div className="p-1">
                                                <TestimonialCard
                                                    {...testimonial}
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <div className="flex justify-center mt-8 gap-2">
                                    <CarouselPrevious className="relative inset-0 translate-y-0 bg-blue-600 hover:bg-blue-700 text-white border-none" />
                                    <CarouselNext className="relative inset-0 translate-y-0 bg-blue-600 hover:bg-blue-700 text-white border-none" />
                                </div>
                            </Carousel>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
}
