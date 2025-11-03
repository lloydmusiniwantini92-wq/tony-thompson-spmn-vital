import { motion } from "framer-motion";

export default function Terms() {
    return (
        <div className="min-h-screen bg-brandBlack text-white px-6 md:px-24 py-20 font-sans leading-relaxed">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-brandPurple mb-8">
                    Terms &amp; Conditions
                </h1>

                <p className="text-sm text-gray-400 mb-10">
                    Effective Date: [Insert Date]
                </p>

                <section className="space-y-8 text-base text-gray-200">
                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">1. Introduction</h2>
                        <p>
                            Welcome to the official website of <strong>Tony Thompson</strong> (“we,” “us,” or “our”).
                            These Terms &amp; Conditions (“Terms”) govern your access to and use of our website,
                            membership programs, and related services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">2. Acceptance of Terms</h2>
                        <p>
                            By accessing or using our website, you agree to comply with these Terms. If you do not
                            agree, please do not use our services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">3. Use of the Website</h2>
                        <ul className="list-disc ml-6 mt-2">
                            <li>You agree to use the site only for lawful purposes.</li>
                            <li>You must not upload or distribute harmful or misleading content.</li>
                            <li>We reserve the right to restrict or terminate access at our discretion.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">4. Intellectual Property</h2>
                        <p>
                            All content on this site, including text, graphics, logos, images, and software, is owned
                            or licensed by <strong>Tony Thompson</strong> and protected by copyright and trademark laws.
                            Unauthorized use is strictly prohibited.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">5. Membership and Payments</h2>
                        <p>
                            Membership plans and payments are handled securely through third-party processors such as
                            Stripe. By subscribing, you authorize us to charge your selected payment method according
                            to your chosen plan.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">6. Limitation of Liability</h2>
                        <p>
                            We are not liable for any indirect, incidental, or consequential damages arising from your
                            use of the site. All services are provided “as is” without warranty of any kind.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">7. External Links</h2>
                        <p>
                            Our website may contain links to third-party websites. We are not responsible for the
                            content or practices of those external sites.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">8. Termination</h2>
                        <p>
                            We may suspend or terminate your access if you violate these Terms or engage in conduct
                            deemed harmful to our community or brand.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">9. Governing Law</h2>
                        <p>
                            These Terms are governed by the laws of the United States and the State of Georgia, without
                            regard to conflict of law principles.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">10. Changes to These Terms</h2>
                        <p>
                            We may update these Terms from time to time. Changes will be posted on this page with an
                            updated “Effective Date.” Continued use of the website constitutes acceptance of those
                            changes.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl text-brandLight font-semibold mb-2">11. Contact</h2>
                        <p>
                            For any questions about these Terms, contact us at{" "}
                            <a
                                href="mailto:info@tonythompson.com"
                                className="text-brandPurple hover:underline"
                            >
                                info@tonythompson.com
                            </a>.
                        </p>
                    </div>
                </section>
            </motion.div>
        </div>
    );
}
