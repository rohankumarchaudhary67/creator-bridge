export default function PrivacyPolicyPage() {
    return (
        <>
            <div className="bg-gradient-to-b from-slate-950 to-slate-900 text-white min-h-screen pt-16">
                <div className="container mx-auto xl:px-96 py-16">
                    <h1 className="text-4xl font-bold">Privacy Policy</h1>
                    <p className="text-gray-500">Last updated: May 2023</p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        1. Introduction
                    </h2>

                    <p className="mb-4 text-slate-300 font-sans">
                        Creator Bridge is committed to protecting your privacy.
                        This Privacy Policy explains how we collect, use, store,
                        and protect your personal information when using our
                        platform in connection with the YouTube Data API v1.
                    </p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        2. Information We Collect
                    </h2>

                    <p className="mb-4 text-slate-300 font-sans">
                        The collected information is used to:When you
                        authenticate with Creator Bridge using your Google
                        account, we request access to the following YouTube Data
                        API v1 scopes:
                    </p>

                    <ul className="list-disc space-y-2 pl-6">
                        <li className="text-blue-300">
                            <span className="text-slate-300 font-sans">
                                <span className="font-semibold">
                                    View your YouTube channel details :
                                </span>{' '}
                                We retrieve your YouTube channel information,
                                including your channel ID, name, and basic
                                metadata.
                            </span>
                        </li>

                        <li className="text-blue-300">
                            <span className="text-slate-300 font-sans">
                                <span className="font-semibold">
                                    Upload videos to YouTube :
                                </span>{' '}
                                We allow users to upload videos directly to
                                their YouTube channels through our platform.
                            </span>
                        </li>
                    </ul>

                    <p className="mb-4 text-slate-300 font-sans mt-2">
                        We do not collect or store unnecessary personal
                        information beyond what is required to provide these
                        services.
                    </p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        3. How We Use Your Information
                    </h2>

                    <p className="mb-4 text-slate-300 font-sans">
                        We use the collected data solely for the purpose of
                        enabling features within Creator Bridge, such as:
                    </p>

                    <ul className="list-disc space-y-2 pl-6">
                        <li className="text-blue-300">
                            <span className="text-slate-300 font-sans">
                                Fetching and displaying your YouTube channel
                                details.
                            </span>
                        </li>

                        <li className="text-blue-300">
                            <span className="text-slate-300 font-sans">
                                Uploading videos to your YouTube channel on your
                                behalf.
                            </span>
                        </li>

                        <li className="text-blue-300">
                            <span className="text-slate-300 font-sans">
                                Ensuring authentication and security during
                                platform usage.
                            </span>
                        </li>
                    </ul>

                    <p className="mb-4 text-slate-300 font-sans mt-2">
                        We do not share, sell, or distribute your personal data
                        to third parties for marketing or advertising purposes.
                    </p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        4. Cookies and Tracking Technologies
                    </h2>

                    <p className="mb-4 text-slate-300 font-sans">
                        Our platform uses cookies and other tracking
                        technologies to enhance your user experience and analyze
                        platform usage. These technologies help us understand
                        how users interact with our platform, enabling us to
                        improve our services and provide more relevant content.
                    </p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        5. Data Retention and Security
                    </h2>

                    <p className="mb-2 text-slate-300 font-sans">
                        We take the security of your data very seriously. All
                        data is stored securely, and we employ industry-standard
                        security measures to protect your information from
                        unauthorized access, disclosure, alteration, or
                        destruction. We retain your data for as long as
                        necessary to provide you with our services.
                    </p>

                    <p className="mb-4 text-slate-300 font-sans">
                        To securely store and manage authentication tokens, we
                        use advanced encryption techniques. Specifically:
                    </p>

                    <ul className="list-disc space-y-2 pl-6">
                        <li className="text-blue-300">
                            <span className="text-slate-300 font-sans">
                                <span className="font-semibold">
                                    Encryption Algorithm :
                                </span>{' '}
                                AES-256-GCM
                            </span>
                        </li>
                        <li className="text-blue-300">
                            <span className="text-slate-300 font-sans">
                                <span className="font-semibold">Storage :</span>{' '}
                                Encrypted tokens are stored securely in our
                                database and are never exposed in plain text.
                            </span>
                        </li>
                        <li className="text-blue-300">
                            <span className="text-slate-300 font-sans">
                                <span className="font-semibold">Usage :</span>{' '}
                                Tokens are only accessed when making API
                                requests to YouTube on your behalf.
                            </span>
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        6. Third-Party Services
                    </h2>

                    <p className="mb-2 text-slate-300 font-sans">
                        We may use third-party services to enhance our platform
                        and provide additional functionalities. These
                        third-party providers may have access to your data but
                        are required to protect it and use it solely for the
                        purpose of providing their services to us.
                    </p>

                    <p className="mb-4 text-slate-300 font-sans">
                        Our platform integrates with the YouTube Data API v1,
                        which is governed by Google's privacy policies. Please
                        refer to Google's Privacy Policy{' '}
                        <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            className="text-blue-300"
                        >
                            (https://policies.google.com/privacy)
                        </a>{' '}
                        for more information.
                    </p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        7. User Rights
                    </h2>

                    <p className="mb-2 text-slate-300 font-sans">
                        You have the right to access, update, or delete your
                        personal information at any time. If you wish to
                        exercise any of these rights, please contact our support
                        team at{' '}
                        <a
                            href="mailto:rohankumarchaudhary67@gmail.com"
                            className="text-blue-300"
                        >
                            rohankumarchaudhary67@gmail.com
                        </a>
                        .
                    </p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        8. Children's Privacy
                    </h2>

                    <p className="mb-2 text-slate-300 font-sans">
                        Our platform is not intended for children under the age
                        of 16, and we do not knowingly collect information from
                        children under this age. If we become aware that we have
                        collected information from a child under 16, we will
                        take steps to delete such information immediately.
                    </p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        9. Changes to This Privacy Policy
                    </h2>

                    <p className="mb-2 text-slate-300 font-sans">
                        We may update this Privacy Policy periodically to
                        reflect changes in our services or comply with legal
                        requirements. Any changes will be reflected on this page
                        with an updated "Last Updated" date. We will notify you
                        of any significant changes by posting the updated policy
                        on our platform.
                    </p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        10. Contact Us
                    </h2>

                    <p className="mb-2 text-slate-300 font-sans">
                        If you have any questions regarding this Privacy Policy
                        or your data privacy, please contact us at:
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

                    <p className="mb-2 mt-6 text-slate-300 font-sans">
                        By using Creator Bridge, you consent to this Privacy
                        Policy and our data practices as described above.
                    </p>
                </div>
            </div>
        </>
    );
}
