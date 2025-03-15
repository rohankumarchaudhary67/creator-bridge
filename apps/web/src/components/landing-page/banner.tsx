import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function BannerComponent() {
    return (
        <>
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
                            <Button className="bg-purple-600 hover:bg-purple-800 text-white text-lg font-sans">
                                Start Your Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button className="text-lg font-sans text-white bg-gray-600 hover:bg-gray-800">
                                Schedule a Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
