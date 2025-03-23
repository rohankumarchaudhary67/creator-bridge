export default function ContactPage() {
    return (
        <>
            <div className="bg-gradient-to-b from-slate-950 to-slate-900 text-white min-h-screen pt-16">
                <div className="container mx-auto xl:px-96 py-16">
                    <h1 className="text-4xl font-bold">Contact Us</h1>
                    <p className="text-gray-500">We'd love to hear from you!</p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        Get in Touch
                    </h2>
                    <p className="mb-4 text-slate-300 font-sans">
                        If you have any questions, feedback, or inquiries about
                        Creator Bridge, feel free to reach out to us.
                    </p>

                    <ul className="list-disc space-y-2 pl-6">
                        <li className="text-blue-300">
                            <span className="text-slate-300 font-sans">
                                <span className="font-semibold">Email :</span>{' '}
                                <a
                                    href="mailto:rohankumarchaudhary67@gmail.com"
                                    className="text-blue-300"
                                >
                                    rohankumarchaudhary67@gmail.com
                                </a>
                            </span>
                        </li>
                        <li className="text-blue-300">
                            <span className="text-slate-300 font-sans">
                                <span className="font-semibold">Website :</span>{' '}
                                <a
                                    href="https://creator-bridge.rkc.digital"
                                    className="text-blue-300"
                                >
                                    https://creator-bridge.rkc.digital
                                </a>
                            </span>
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mb-4 mt-8">Support</h2>
                    <p className="mb-4 text-slate-300 font-sans">
                        If you need help with our platform, please email us or
                        visit our website for more information.
                    </p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        Follow Us
                    </h2>
                    <p className="mb-4 text-slate-300 font-sans">
                        Stay connected with us for updates and announcements.
                    </p>
                    <ul className="list-disc space-y-2 pl-6">
                        <li className="text-blue-300">
                            <span className="text-slate-300 font-sans">
                                <span className="font-semibold">Twitter :</span>{' '}
                                <a
                                    href="https://x.com/rohan_kumar67"
                                    className="text-blue-300"
                                >
                                    @rohan_kumar67
                                </a>
                            </span>
                        </li>
                        <li className="text-blue-300">
                            <span className="text-slate-300 font-sans">
                                <span className="font-semibold">
                                    LinkedIn :
                                </span>{' '}
                                <a
                                    href="https://www.linkedin.com/in/rohankumarchaudhary67/"
                                    className="text-blue-300"
                                >
                                    @rohankumarchaudhary67
                                </a>
                            </span>
                        </li>

                        <li className="text-blue-300">
                            <span className="text-slate-300 font-sans">
                                <span className="font-semibold">GitHub :</span>{' '}
                                <a
                                    href="https://github.com/rohankumarchaudhary67"
                                    className="text-blue-300"
                                >
                                    @rohankumarchaudhary67
                                </a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
