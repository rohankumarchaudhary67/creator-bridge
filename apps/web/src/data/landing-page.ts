import {
    Globe,
    Users,
    Settings,
    MessageSquare,
    Youtube,
    FileVideo,
    Check,
    Video,
    Zap,
    Clock,
} from 'lucide-react';

export const featuresData = [
    {
        icon: Youtube,
        title: 'YouTube Integration',
        description:
            'Seamlessly connect your YouTube channel for effortless content management.',
        features: ['Direct uploads', 'Analytics access', 'Comment management'],
        color: 'text-red-500',
    },
    {
        icon: FileVideo,
        title: 'Advanced Workflow',
        description:
            'Streamline your editing process with powerful collaboration tools.',
        features: ['Team permissions', 'Review system', 'Approval process'],
        color: 'text-blue-500',
    },
    {
        icon: Settings,
        title: 'Customizable Settings',
        description:
            'Tailor the platform to your specific content creation needs.',
        features: [
            'Notification controls',
            'Custom templates',
            'Privacy options',
        ],
        color: 'text-purple-500',
    },
];

export const processSteps = [
    {
        title: 'Connect Your Channel',
        description:
            'Link your YouTube channel to our platform with a few simple clicks',
        icon: Globe,
    },
    {
        title: 'Build Your Team',
        description:
            'Invite editors, reviewers, and collaborators to join your projects',
        icon: Users,
    },
    {
        title: 'Streamline Your Workflow',
        description: 'Set up approval processes and notification preferences',
        icon: Settings,
    },
    {
        title: 'Collaborate Efficiently',
        description: 'Review changes, provide feedback, and approve with ease',
        icon: MessageSquare,
    },
    {
        title: 'Publish Seamlessly',
        description: 'Push approved content directly to your YouTube channel',
        icon: Youtube,
    },
];

export const testimonials = [
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
];

export const pricingPlans = [
    {
        title: 'Starter',
        price: '$0',
        description: 'Perfect for new creators just getting started',
        features: [
            'Single YouTube channel',
            'Up to 1 team members',
            'Basic workflow templates',
            'Standard support',
            '5 uploads per month',
        ],
        buttonText: 'Get Started',
        isPopular: false,
    },
    {
        title: 'Professional',
        price: '$24',
        description: 'Ideal for established creators with a dedicated team',
        features: [
            'Single YouTube channels',
            'Up to 4 team members',
            'Priority support',
            '50 uploads per month',
            'Analytics dashboard',
            'Custom branding',
        ],
        buttonText: 'Get Started',
        isPopular: true,
    },
    {
        title: 'Enterprise',
        price: '$89',
        description: 'For larger content networks with complex needs',
        features: [
            'Integrate 5 YouTube channels',
            '20 team members',
            'Custom workflow development',
            '24/7 dedicated support',
            '200 uploads per month',
            'Advanced analytics & reporting',
            'Custom integrations',
            'Onboarding assistance',
        ],
        buttonText: 'Contact Sales',
        isPopular: false,
    },
];
