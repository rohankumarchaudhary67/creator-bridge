'use client';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import Footer from '@/components/landing-page/footer';
import Navbar from '@/components/landing-page/navbar';
import FAQSection from '@/components/landing-page/faq';
import { SectionHeader } from '@/components/landing-page/section-header';
import { FeatureCard } from '@/components/landing-page/feature-card';
import { ProcessStepCard } from '@/components/landing-page/process-step-card';
import { TestimonialCard } from '@/components/landing-page/testimonial-card';
import { PricingCard } from '@/components/landing-page/pricing-card';
import {
    featuresData,
    processSteps,
    testimonials,
    pricingPlans,
} from '../data/landing-page';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default function LandingPage() {
    const session = getServerSession(authOptions);
    if (session) {
        console.log(session);
        redirect('/dashboard');
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
            <Navbar />
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <Badge className="mb-4 bg-blue-900/60 text-blue-200 hover:bg-blue-800/60">
                            Creators Platform
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            Connect With Your Audience Like Never Before
                        </h1>
                        <p className="text-xl text-slate-300 mb-8">
                            The all-in-one platform that streamlines
                            collaboration between content creators and their
                            teams. Edit, review, and publish - all in one place.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-blue-600 text-white hover:bg-blue-700 text-lg"
                            >
                                Start For Free{' '}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-slate-500 bg-blue-600 text-white hover:bg-slate-300 text-lg"
                            >
                                Watch Demo <Play className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <div className="relative max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl shadow-blue-500/10">
                        <img
                            src="/api/placeholder/1200/600"
                            alt="CreatorBridge Platform"
                            className="w-full h-auto rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Button
                                size="lg"
                                className="rounded-full w-16 h-16 bg-blue-600/90 hover:bg-blue-700/90 flex items-center justify-center p-0"
                            >
                                <Play className="h-8 w-8" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 mt-20">
                    <p className="text-center text-white mb-6">
                        Trusted by content creators worldwide
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
                        {[...Array(5)].map((_, i) => (
                            <img
                                key={i}
                                src={`/api/placeholder/120/40?${i}`}
                                alt={`Company ${i + 1}`}
                                className="h-8"
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 bg-slate-950/50">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        badgeText="Feature-rich Platform"
                        title="Everything You Need For Your Content"
                        description="Our platform offers powerful tools to streamline your workflow and enhance collaboration with your editing team."
                    />
                    <div className="grid md:grid-cols-3 gap-8">
                        {featuresData.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                features={feature.features}
                            />
                        ))}
                    </div>
                </div>
            </section>

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

            <section id="testimonials" className="py-20 bg-slate-950/50">
                <div className="container mx-auto px-4">
                    <SectionHeader
                        badgeText="Success Stories"
                        title="What Creators Are Saying"
                        description="Join thousands of content creators who have transformed their workflow with CreatorBridge"
                    />
                    <section
                        id="testimonials"
                        className="py-20 bg-slate-950/50"
                    >
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

            <section
                id="pricing"
                className="py-20 bg-gradient-to-b from-slate-900 to-slate-950"
            >
                <div className="container mx-auto px-4">
                    <SectionHeader
                        badgeText="Flexible Plans"
                        title="Choose Your Plan"
                        description="Simple, transparent pricing that scales with your needs"
                    />
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {pricingPlans.map((plan, index) => (
                            <PricingCard
                                key={index}
                                title={plan.title}
                                price={plan.price}
                                description={plan.description}
                                features={plan.features}
                                isPopular={plan.isPopular}
                                buttonText={plan.buttonText}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-4 bg-blue-900/60 text-blue-200 hover:bg-blue-800/60">
                            Get Started Today
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Ready to Transform Your Content Creation?
                        </h2>
                        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of content creators who have
                            streamlined their workflow and boosted their
                            productivity with CreatorBridge.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700 text-lg"
                            >
                                Start Your Free Trial{' '}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-slate-500 bg-black text-white hover:bg-slate-800 text-lg"
                            >
                                Schedule a Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection />
            <Footer />
        </div>
    );
}
