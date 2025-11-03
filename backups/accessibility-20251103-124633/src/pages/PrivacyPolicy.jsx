// src/pages/PrivacyPolicy.jsx
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-brandBlack text-white px-6 md:px-24 py-20 font-sans leading-relaxed">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-brandPurple mb-8">
                    Privacy Policy
                </h1>

                <p className="text-sm text-gray-400 mb-10">
                    Effective Date: [Insert Date]
                </p>

                <section className="space-y-8 text-base text-gray-200">
                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">1. Introduction</h2>
                        <p>
                            Welcome to the official website of <strong>Tony Thompson</strong> (“we,” “us,” or “our”).
                            Your privacy is important to us. This Privacy Policy explains how we collect, use, and
                            protect your personal information when you visit our website, interact with our content,
                            or use our membership services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">2. Information We Collect</h2>
                        <p>
                            We collect information to provide a personalized, secure, and efficient experience for all
                            visitors and members.
                        </p>
                        <ul className="list-disc ml-6 mt-2">
                            <li>Personal information: name, email, payment details (via Stripe).</li>
                            <li>Device and usage data, including IP address and browser type.</li>
                            <li>Analytics and cookies for site performance improvement.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">3. How We Use Your Information</h2>
                        <ul className="list-disc ml-6">
                            <li>Provide and improve our website and services.</li>
                            <li>Process secure payments via Stripe.</li>
                            <li>Send updates or newsletters (only if you opt in).</li>
                            <li>Enhance user experience and analyze site engagement.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">4. Information Sharing</h2>
                        <p>
                            We may share limited data with trusted partners such as Stripe (for payments) and analytics
                            providers, solely to deliver services or comply with the law. We do <strong>not</strong> sell your data.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">5. Cookies and Tracking</h2>
                        <p>
                            We use cookies to remember your preferences and understand how visitors interact with the site.
                            You can disable cookies in your browser, but this may limit some functionality.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">6. Data Retention</h2>
                        <p>
                            We keep personal information only as long as necessary for providing services, legal obligations,
                            and account management. Data no longer needed is securely deleted or anonymized.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">7. Security</h2>
                        <p>
                            We use encryption, secure servers, and other safeguards to protect your data. However, no online
                            system is 100% secure, and we cannot guarantee absolute protection.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">8. Your Rights</h2>
                        <p>
                            Depending on your location, you may have rights to access, correct, or delete your personal
                            information, withdraw consent for communications, or request data portability.
                            Contact us to exercise these rights.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">9. Children’s Privacy</h2>
                        <p>
                            Our website and services are intended for adults aged 18 and older. We do not knowingly collect
                            data from minors.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">10. International Data Transfers</h2>
                        <p>
                            If you access our site from outside the U.S., your information may be processed in the U.S. or
                            other countries. We ensure such transfers comply with applicable laws.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">11. Policy Updates</h2>
                        <p>
                            We may update this policy periodically. Any updates will appear on this page with a new “Effective Date.”
                            Continued use of our site means you accept those changes.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">12. Contact Us</h2>
                        <p>
                            For any privacy concerns, contact us at{" "}
                            <a
                                href="mailto:privacy@tonythompson.com"
                                className="text-brandPurple hover:underline"
                            >
                                privacy@tonythompson.com
                            </a>
                        </p>
                    </div>
                </section>
            </motion.div>
        </div>
    );
}
