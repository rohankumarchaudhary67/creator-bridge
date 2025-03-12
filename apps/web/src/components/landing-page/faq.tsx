'use client';
import React from 'react';
import { Badge } from '../ui/badge';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '../ui/accordion';

const FAQSection = () => {
    return (
        <div>
            <section id="faq" className="py-20 bg-slate-950/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-purple-900/60 text-purple-200 hover:bg-purple-800/60">
                            Questions Answered
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            Everything you need to know about CreatorBridge
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <Accordion
                            type="single"
                            collapsible
                            className="space-y-4"
                        >
                            {[
                                {
                                    question:
                                        'How does the YouTube integration work?',
                                    answer: 'Our platform connects securely to your YouTube account through OAuth. This gives you the ability to upload videos, manage metadata, and access analytics directly through CreatorBridge. The connection is secure and can be revoked at any time.',
                                },
                                {
                                    question:
                                        'Can I manage multiple YouTube channels?',
                                    answer: 'Yes! Our Professional and Enterprise plans allow you to connect and manage multiple YouTube channels from a single CreatorBridge account. This makes it easy to maintain consistent workflows across different content types or brands.',
                                },
                                {
                                    question: 'How do I add team members?',
                                    answer: "Adding team members is simple. Navigate to the Team section in your settings, enter their email address, and set their permission level. They'll receive an invitation to join your CreatorBridge workspace with the specific access rights you've granted.",
                                },
                                {
                                    question:
                                        'Is my content secure on your platform?',
                                    answer: 'Absolutely. We implement industry-leading security measures to ensure your content remains private. All uploads are encrypted, and our role-based permission system ensures team members can only access what you explicitly allow them to see.',
                                },
                                {
                                    question:
                                        'Can I customize the workflow to match my process?',
                                    answer: 'Yes, our workflow system is highly customizable. You can create approval stages, set up required reviewers, automate notifications, and even create templates for different types of content to ensure consistency across your channel.',
                                },
                                {
                                    question:
                                        'Do you offer any discounts for annual billing?',
                                    answer: 'Yes, we offer a 20% discount when you choose annual billing for any of our plans. This option is available at checkout when you select your plan.',
                                },
                            ].map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="bg-slate-900 rounded-lg border border-slate-800"
                                >
                                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-800/50 rounded-t-lg">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 py-4 text-white">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQSection;
