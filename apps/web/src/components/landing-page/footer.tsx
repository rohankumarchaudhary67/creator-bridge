import React from 'react';
import { Badge } from '../ui/badge';
import { Mail, HeartHandshake } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const Footer = () => {
    return (
        <div>
            <section className="py-20 bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
                        <div>
                            <Badge className="mb-4 bg-blue-900/60 text-blue-200 hover:bg-blue-800/60">
                                Get In Touch
                            </Badge>
                            <h2 className="text-3xl font-bold mb-6">
                                We'd Love to Hear From You
                            </h2>
                            <p className="text-slate-300 mb-8">
                                Have questions about CreatorBridge? Our team is
                                here to help you optimize your content creation
                                workflow.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <Mail className="h-6 w-6 text-blue-500 mt-1" />
                                    <div>
                                        <h3 className="font-medium mb-1">
                                            Email Us
                                        </h3>
                                        <p className="text-slate-400">
                                            support@creatorbridge.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <HeartHandshake className="h-6 w-6 text-blue-500 mt-1" />
                                    <div>
                                        <h3 className="font-medium mb-1">
                                            Support Hours
                                        </h3>
                                        <p className="text-slate-400">
                                            Monday - Friday: 9AM - 6PM EST
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Card className="bg-slate-900 border-slate-800">
                                <CardHeader>
                                    <CardTitle>Send us a message</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-4">
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Input
                                                    placeholder="Name"
                                                    className="bg-slate-800 border-slate-700 focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Input
                                                    type="email"
                                                    placeholder="Email"
                                                    className="bg-slate-800 border-slate-700 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Input
                                                placeholder="Subject"
                                                className="bg-slate-800 border-slate-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Textarea
                                                placeholder="Message"
                                                className="bg-slate-800 border-slate-700"
                                            />
                                        </div>
                                        <div>
                                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                                Send Message
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Footer;
