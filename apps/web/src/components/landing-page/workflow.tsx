import { SectionHeader } from './section-header';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel';
import { ProcessStepCard } from './process-step-card';
import { processSteps } from '@/data/landing-page';

export default function WorkflowComponent() {
    return (
        <>
            <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        badgeText="Intuitive Process"
                        title="How CreatorBridge Works"
                        description="Our streamlined platform makes content creation and collaboration effortless"
                    />
                    <Carousel className="w-full max-w-5xl mx-auto">
                        <CarouselContent>
                            {processSteps.map((step, index) => (
                                <CarouselItem
                                    key={index}
                                    className="md:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="p-1">
                                        <ProcessStepCard
                                            icon={step.icon}
                                            step={index + 1}
                                            title={step.title}
                                            description={step.description}
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
        </>
    );
}
