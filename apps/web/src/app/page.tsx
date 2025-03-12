'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Youtube,
    Video,
    Zap,
    Check,
    Users,
    Star,
    Clock,
    Globe,
    ChevronRight,
    Mail,
    ArrowRight,
    Play,
    FileVideo,
    Settings,
    HeartHandshake,
    MessageSquare,
} from 'lucide-react';
import Footer from '@/components/landing-page/footer';
import Navbar from '@/components/landing-page/navbar';
import FAQSection from '@/components/landing-page/faq';
import { getServerSession } from 'next-auth';

export default function LandingPage() {
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
                        <img
                            src="/api/placeholder/120/40"
                            alt="Company 1"
                            className="h-8"
                        />
                        <img
                            src="/api/placeholder/120/40"
                            alt="Company 2"
                            className="h-8"
                        />
                        <img
                            src="/api/placeholder/120/40"
                            alt="Company 3"
                            className="h-8"
                        />
                        <img
                            src="/api/placeholder/120/40"
                            alt="Company 4"
                            className="h-8"
                        />
                        <img
                            src="/api/placeholder/120/40"
                            alt="Company 5"
                            className="h-8"
                        />
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 bg-slate-950/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-blue-900/60 text-blue-200 hover:bg-blue-800/60">
                            Feature-rich Platform
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Everything You Need For Your Content
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Our platform offers powerful tools to streamline
                            your workflow and enhance collaboration with your
                            editing team.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="bg-slate-900 text-white border-slate-800 shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10 transition-all hover:-translate-y-1">
                            <CardHeader>
                                <Youtube className="h-12 w-12 text-red-500 mb-4" />
                                <CardTitle>YouTube Integration</CardTitle>
                                <CardDescription className="text-white">
                                    Seamlessly connect your YouTube channel for
                                    effortless content management.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {[
                                        'Direct uploads',
                                        'Analytics access',
                                        'Comment management',
                                    ].map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2"
                                        >
                                            <Check className="h-5 w-5 text-green-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-900 text-white border-slate-800 shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10 transition-all hover:-translate-y-1">
                            <CardHeader>
                                <FileVideo className="h-12 w-12 text-blue-500 mb-4" />
                                <CardTitle>Advanced Workflow</CardTitle>
                                <CardDescription className="text-white">
                                    Streamline your editing process with
                                    powerful collaboration tools.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {[
                                        'Team permissions',
                                        'Review system',
                                        'Approval process',
                                    ].map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2"
                                        >
                                            <Check className="h-5 w-5 text-green-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-900 text-white border-slate-800 shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10 transition-all hover:-translate-y-1">
                            <CardHeader>
                                <Settings className="h-12 w-12 text-purple-500 mb-4" />
                                <CardTitle>Customizable Settings</CardTitle>
                                <CardDescription className="text-white">
                                    Tailor the platform to your specific content
                                    creation needs.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {[
                                        'Notification controls',
                                        'Custom templates',
                                        'Privacy options',
                                    ].map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2"
                                        >
                                            <Check className="h-5 w-5 text-green-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-purple-900/60 text-purple-200 hover:bg-purple-800/60">
                            Intuitive Process
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            How CreatorBridge Works
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Our streamlined platform makes content creation and
                            collaboration effortless
                        </p>
                    </div>

                    <Carousel className="w-full max-w-5xl mx-auto">
                        <CarouselContent>
                            {[
                                {
                                    title: 'Connect Your Channel',
                                    description:
                                        'Link your YouTube channel to our platform with a few simple clicks',
                                    icon: (
                                        <Globe className="h-12 w-12 text-blue-500" />
                                    ),
                                },
                                {
                                    title: 'Build Your Team',
                                    description:
                                        'Invite editors, reviewers, and collaborators to join your projects',
                                    icon: (
                                        <Users className="h-12 w-12 text-green-500" />
                                    ),
                                },
                                {
                                    title: 'Streamline Your Workflow',
                                    description:
                                        'Set up approval processes and notification preferences',
                                    icon: (
                                        <Settings className="h-12 w-12 text-purple-500" />
                                    ),
                                },
                                {
                                    title: 'Collaborate Efficiently',
                                    description:
                                        'Review changes, provide feedback, and approve with ease',
                                    icon: (
                                        <MessageSquare className="h-12 w-12 text-yellow-500" />
                                    ),
                                },
                                {
                                    title: 'Publish Seamlessly',
                                    description:
                                        'Push approved content directly to your YouTube channel',
                                    icon: (
                                        <Youtube className="h-12 w-12 text-red-500" />
                                    ),
                                },
                            ].map((step, index) => (
                                <CarouselItem
                                    key={index}
                                    className="md:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="p-1">
                                        <Card className="bg-slate-900 border-slate-800 h-full">
                                            <CardHeader className="text-center pb-2">
                                                <div className="mx-auto mb-4 rounded-full bg-slate-800 p-3 w-16 h-16 flex items-center justify-center">
                                                    {step.icon}
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className="mb-2 border-blue-500 text-blue-400"
                                                >
                                                    Step {index + 1}
                                                </Badge>
                                                <CardTitle className="mt-2">
                                                    {step.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="text-center text-slate-300">
                                                <p>{step.description}</p>
                                            </CardContent>
                                        </Card>
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
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-green-900/60 text-green-200 hover:bg-green-800/60">
                            Success Stories
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            What Creators Are Saying
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Join thousands of content creators who have
                            transformed their workflow with CreatorBridge
                        </p>
                    </div>

                    <Carousel className="w-full max-w-5xl mx-auto">
                        <CarouselContent>
                            {[
                                {
                                    name: 'Alex Johnson',
                                    role: 'Tech YouTuber',
                                    avatar: '/api/placeholder/100/100',
                                    quote: 'CreatorBridge has completely transformed my content creation process. My editing team and I now work seamlessly together, cutting our production time in half.',
                                    rating: 5,
                                },
                                {
                                    name: 'Maya Rodriguez',
                                    role: 'Travel Vlogger',
                                    avatar: '/api/placeholder/100/100',
                                    quote: "As someone who's constantly on the move, I needed a solution that would let me collaborate with my team remotely. CreatorBridge delivered exactly what I needed.",
                                    rating: 5,
                                },
                                {
                                    name: 'Sam Taylor',
                                    role: 'Gaming Content Creator',
                                    avatar: '/api/placeholder/100/100',
                                    quote: 'The YouTube integration is flawless. I can easily manage my uploads, analytics, and team collaboration all in one place. Absolute game-changer!',
                                    rating: 4,
                                },
                                {
                                    name: 'Jordan Chen',
                                    role: 'Educational Channel',
                                    avatar: '/api/placeholder/100/100',
                                    quote: "My educational content requires precise editing and fact-checking. CreatorBridge's review system ensures nothing gets published until it's perfect.",
                                    rating: 5,
                                },
                            ].map((testimonial, index) => (
                                <CarouselItem
                                    key={index}
                                    className="md:basis-1/1"
                                >
                                    <div className="p-1">
                                        <Card className="bg-slate-900 border-slate-800">
                                            <CardContent className="pt-6">
                                                <div className="flex gap-1 mb-4">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-slate-600'}`}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                                <p className="text-slate-300 italic mb-6">
                                                    "{testimonial.quote}"
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <Avatar>
                                                        <AvatarImage
                                                            src={
                                                                testimonial.avatar
                                                            }
                                                            alt={
                                                                testimonial.name
                                                            }
                                                        />
                                                        <AvatarFallback>
                                                            {testimonial.name.charAt(
                                                                0
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-semibold">
                                                            {testimonial.name}
                                                        </p>
                                                        <p className="text-white text-sm">
                                                            {testimonial.role}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
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

            <section
                id="pricing"
                className="py-20 bg-gradient-to-b from-slate-900 to-slate-950"
            >
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-blue-900/60 text-blue-200 hover:bg-blue-800/60">
                            Flexible Plans
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Choose Your Plan
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Simple, transparent pricing that scales with your
                            needs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Card className="bg-slate-900 border-slate-800 shadow-xl hover:shadow-blue-900/10 text-white transition-all">
                            <CardHeader>
                                <CardTitle>Starter</CardTitle>
                                <div className="mt-4 mb-2">
                                    <span className="text-4xl font-bold">
                                        $19
                                    </span>
                                    <span className="text-white">/month</span>
                                </div>
                                <CardDescription className="text-white">
                                    Perfect for new creators just getting
                                    started
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {[
                                        'Single YouTube channel',
                                        'Up to 3 team members',
                                        'Basic workflow templates',
                                        'Standard support',
                                        '10 uploads per month',
                                    ].map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2"
                                        >
                                            <Check className="h-5 w-5 text-green-500" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-slate-800 text-white hover:bg-slate-700">
                                    Get Started
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="bg-blue-900 text-white border-blue-700 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all relative">
                            <div className="absolute top-0 right-0 -translate-y-1/2 bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                                Most Popular
                            </div>
                            <CardHeader>
                                <CardTitle>Professional</CardTitle>
                                <div className="mt-4 mb-2">
                                    <span className="text-4xl font-bold">
                                        $49
                                    </span>
                                    <span className="text-blue-200">
                                        /month
                                    </span>
                                </div>
                                <CardDescription className="text-blue-200">
                                    Ideal for established creators with a
                                    dedicated team
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {[
                                        'Multiple YouTube channels',
                                        'Up to 10 team members',
                                        'Advanced workflow customization',
                                        'Priority support',
                                        'Unlimited uploads',
                                        'Analytics dashboard',
                                        'Custom branding',
                                    ].map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2"
                                        >
                                            <Check className="h-5 w-5 text-green-400" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-white text-blue-900 hover:bg-slate-100">
                                    Get Started
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="bg-slate-900 text-white border-slate-800 shadow-xl hover:shadow-blue-900/10 transition-all">
                            <CardHeader>
                                <CardTitle>Enterprise</CardTitle>
                                <div className="mt-4 mb-2">
                                    <span className="text-4xl font-bold">
                                        $149
                                    </span>
                                    <span className="text-white">/month</span>
                                </div>
                                <CardDescription className="text-white">
                                    For larger content networks with complex
                                    needs
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {[
                                        'Unlimited YouTube channels',
                                        'Unlimited team members',
                                        'Custom workflow development',
                                        '24/7 dedicated support',
                                        'Unlimited uploads',
                                        'Advanced analytics & reporting',
                                        'API access',
                                        'Custom integrations',
                                        'Onboarding assistance',
                                    ].map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2"
                                        >
                                            <Check className="h-5 w-5 text-green-500" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                                    Contact Sales
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>

            <FAQSection />
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
            <Footer />
        </div>
    );
}
