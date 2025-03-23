export default function SecurityPage() {
    return (
        <>
            <div className="bg-gradient-to-b from-slate-950 to-slate-900 text-white min-h-screen pt-16">
                <div className="container mx-auto xl:px-96 py-16">
                    <h1 className="text-4xl font-bold">Security</h1>
                    <p className="text-gray-500">
                        Ensuring the protection of your data
                    </p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        1. Data Protection
                    </h2>
                    <p className="mb-4 text-slate-300 font-sans">
                        At Creator Bridge, we take security seriously. We
                        implement advanced security measures to protect your
                        personal data and authentication credentials.
                    </p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        2. Encryption Standards
                    </h2>
                    <p className="mb-4 text-slate-300 font-sans">
                        We use AES-256-GCM encryption to securely store
                        authentication tokens and sensitive user data.
                        AES-256-GCM is a highly secure encryption standard that
                        ensures confidentiality and integrity.
                    </p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        3. How AES-256-GCM Works
                    </h2>
                    <ul className="list-disc space-y-2 pl-6">
                        <li className="text-slate-300 font-sans">
                            <span className="font-semibold">Key Size :</span>{' '}
                            256-bit encryption key provides high security.
                        </li>
                        <li className="text-slate-300 font-sans">
                            <span className="font-semibold">GCM Mode :</span>{' '}
                            Ensures both encryption and authentication to
                            prevent tampering.
                        </li>
                        <li className="text-slate-300 font-sans">
                            <span className="font-semibold">
                                Initialization Vector (IV) :
                            </span>{' '}
                            Each encryption operation uses a unique IV to
                            enhance security.
                        </li>
                        <li className="text-slate-300 font-sans">
                            <span className="font-semibold">
                                Authentication Tag :
                            </span>{' '}
                            Validates encrypted data to detect any unauthorized
                            modifications.
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        4. Token Storage and Access
                    </h2>
                    <p className="mb-4 text-slate-300 font-sans">
                        All authentication tokens are encrypted before storage.
                        Tokens are decrypted only when necessary to make
                        authorized API requests. At no point are decrypted
                        tokens exposed or stored in plaintext.
                    </p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        5. Secure Communication
                    </h2>
                    <p className="mb-4 text-slate-300 font-sans">
                        Creator Bridge enforces HTTPS (SSL/TLS) for all data
                        transmission, ensuring end-to-end encryption between
                        users and our servers.
                    </p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        6. Continuous Monitoring
                    </h2>
                    <p className="mb-4 text-slate-300 font-sans">
                        Our security systems continuously monitor and detect
                        threats. We implement automated security audits to
                        identify and mitigate vulnerabilities proactively.
                    </p>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        7. User Best Practices
                    </h2>
                    <ul className="list-disc space-y-2 pl-6">
                        <li className=" text-slate-300 font-sans">
                            Use strong, unique passwords for your account.
                        </li>
                        <li className=" text-slate-300 font-sans">
                            Enable two-factor authentication (2FA) for
                            additional security.
                        </li>
                        <li className=" text-slate-300 font-sans">
                            Regularly update your credentials to minimize
                            security risks.
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold mb-4 mt-8">
                        8. Contact Security Team
                    </h2>
                    <p className="mb-4 text-slate-300 font-sans">
                        If you identify a security issue or vulnerability,
                        please contact us immediately at:
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
                </div>
            </div>
        </>
    );
}
