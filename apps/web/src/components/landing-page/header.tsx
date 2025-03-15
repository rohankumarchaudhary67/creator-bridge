import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export default function HeaderComponent() {
    return (
        <>
            <section className="pt-36 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <Badge className="mb-4 bg-blue-900/60 text-blue-200 hover:bg-blue-800/60">
                            Creators Platform
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            Save your Time <br /> & Bandwidth & <br /> Improve
                            Security
                        </h1>
                        <p className="text-xl text-slate-400 mb-8">
                            The all-in-one platform that streamlines
                            collaboration between content creators and their
                            teams. Edit, review, and publish - all in one place.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-purple-600 text-white hover:bg-purple-800 text-lg"
                            >
                                Start For Free{' '}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                size="lg"
                                className="text-lg bg-transparent text-white outline hover:bg-gray-500"
                            >
                                Watch Demo <Play className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <div className="relative max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl shadow-blue-500/10">
                        <img
                            src="/landing/video.png"
                            alt="CreatorBridge Platform"
                            className="w-full h-auto rounded-xl"
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
                        <div className="flex justify-center items-center space-x-2">
                            <img
                                src="/landing/eduno.png"
                                alt="Company 1"
                                className="h-10 w-10 rounded-full"
                            />
                            <span className="font-sans font-semibold text-2xl">
                                Eduno
                            </span>
                        </div>
                        <div className="flex justify-center items-center space-x-2">
                            <img
                                src="/landing/cr4.png"
                                alt="Company 1"
                                className="h-10 w-10 rounded-full"
                            />
                            <span className="font-sans font-semibold text-2xl">
                                Crew Roaster
                            </span>
                        </div>
                        <div className="flex justify-center items-center space-x-2">
                            <img
                                src="/landing/rohan.jpg"
                                alt="Company 1"
                                className="h-10 w-10 rounded-full"
                            />
                            <span className="font-sans font-semibold text-2xl">
                                RKC Digital
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
