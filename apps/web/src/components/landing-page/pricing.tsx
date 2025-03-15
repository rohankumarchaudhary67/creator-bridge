import { pricingPlans } from '@/data/landing-page';
import { SectionHeader } from './section-header';
import { PricingCard } from './pricing-card';

export default function PricingComponent() {
    return (
        <>
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
        </>
    );
}
