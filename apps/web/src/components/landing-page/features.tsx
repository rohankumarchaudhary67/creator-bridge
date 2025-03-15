import { SectionHeader } from './section-header';
import { FeatureCard } from './feature-card';
import { featuresData } from '@/data/landing-page';

export default function FeaturesComponent() {
    return (
        <>
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
        </>
    );
}
