// ✅ src/pages/AboutTony.jsx — Fixed (No Duplicate Hamburger Menu)
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// === Page Sections ===
import AboutTonyHero from "./sections/AboutTonyHero";
import TonyJourney from "./sections/TonyJourney";
import TonyMission from "./sections/TonyMission";
import TonyImpact from "./sections/TonyImpact";
import TonyVoices from "./sections/TonyVoices";
import TonyCTA from "./sections/TonyCTA"; // ✅ Final Call-to-Action

// === Global Components ===
import ScrollFog from "../components/ScrollFog";

// === Contexts ===
import { VideoModalProvider } from "../context/VideoModalContext";
import { QuizOverlayProvider } from "../context/QuizOverlayContext";

export default function AboutTony() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [heroVisible, setHeroVisible] = useState(true);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const containerRef = useRef(null);
    const inView = useInView(containerRef, { margin: "-30% 0px -30% 0px" });

    return (
        <VideoModalProvider>
            <QuizOverlayProvider>
                <main
                    ref={containerRef}
                    className="bg-black text-white overflow-x-hidden overflow-hidden relative min-h-screen flex flex-col"
                >
                    {/* === Removed FixedLayer + GlobalOverlayInline (to avoid duplicate hamburger) === */}
                    <ScrollFog />

                    {/* === MAIN SCROLL SEQUENCE === */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.4, ease: [0.25, 1, 0.3, 1] }}
                        className="w-full space-y-0"
                    >
                        {/* === HERO === */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            <AboutTonyHero />
                        </motion.div>

                        {/* === JOURNEY === */}
                        <motion.section
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="relative z-10"
                        >
                            <TonyJourney />
                        </motion.section>

                        {/* === MISSION === */}
                        <motion.section
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.3, ease: [0.25, 1, 0.3, 1] }}
                            viewport={{ once: true, amount: 0.35 }}
                            className="relative z-10"
                        >
                            <TonyMission />
                        </motion.section>

                        {/* === IMPACT === */}
                        <motion.section
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, ease: [0.25, 1, 0.3, 1] }}
                            viewport={{ once: true, amount: 0.4 }}
                            className="relative z-10 overflow-hidden"
                        >
                            <TonyImpact />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9b26b620] to-transparent pointer-events-none"
                                animate={{
                                    opacity: [0.2, 0.4, 0.2],
                                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                                }}
                                transition={{
                                    duration: 12,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.section>

                        {/* === VOICES === */}
                        <motion.section
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.4, ease: [0.25, 1, 0.3, 1] }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="relative z-10 bg-black/60 backdrop-blur-sm"
                        >
                            <TonyVoices />
                        </motion.section>

                        {/* ✅ Anchor above CTA */}
                        <section id="programs" className="h-[1px] w-full"></section>

                        {/* === FINAL CTA === */}
                        <motion.section
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.6, ease: [0.25, 1, 0.3, 1] }}
                            viewport={{ once: true, amount: 0.4 }}
                            className="relative z-10"
                        >
                            <TonyCTA />
                        </motion.section>
                    </motion.div>

                    {/* === Ambient Scroll Glow === */}
                    <motion.div
                        className="pointer-events-none fixed inset-0 bg-gradient-to-t from-[#9b26b6]/10 via-transparent to-[#9b26b6]/5 mix-blend-soft-light"
                        animate={{
                            opacity: inView ? [0.1, 0.25, 0.1] : 0.1,
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </main>
            </QuizOverlayProvider>
        </VideoModalProvider>
    );
}
