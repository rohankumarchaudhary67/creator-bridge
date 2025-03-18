import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import {
    Footer,
    HeaderComponent,
    FeaturesComponent,
    WorkflowComponent,
    PricingComponent,
    TestimonialComponent,
    BannerComponent,
    FaqComponent,
} from '@/components/landing-page';

export default async function LandingPage() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect('/dashboard');
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
            <HeaderComponent />
            <FeaturesComponent />
            <WorkflowComponent />
            <PricingComponent />
            <TestimonialComponent />
            <BannerComponent />
            <FaqComponent />
            <Footer />
        </div>
    );
}
