import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Hash, ScanLine, ArrowRight } from "lucide-react";

import aboutHero from "../../assets/images/AboutHero.png";
import tonyWinMP4 from "../../assets/videos/tonywin_optimized.mp4";
import tonyWinWEBM from "../../assets/videos/tonywin_optimized.webm";

export default function AboutTonyHero() {
    // --- Setup ---
    useEffect(() => {
        const img = new Image();
        img.src = aboutHero;
    }, []);

    const handleExploreJourney = () => {
        const fog = typeof window !== "undefined" ? window.triggerGlobalFog : null;
        const lenis = typeof window !== "undefined" ? window.lenis : null;
        const target = typeof document !== "undefined" ? document.querySelector("#tony-journey") : null;

        if (typeof fog === "function") {
            fog(() => {
                if (target) {
                    if (lenis) lenis.scrollTo(target, { duration: 1.4, offset: -40 });
                    else target.scrollIntoView({ behavior: "smooth" });
                }
            });
        } else if (target) {
            if (lenis) lenis.scrollTo(target, { duration: 1.4, offset: -40 });
            else target.scrollIntoView({ behavior: "smooth" });
        }
    };

    // --- Animations ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.35 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 26, filter: "blur(4px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.85, ease: [0.23, 1, 0.32, 1] }
        }
    };

    // --- 3D BUTTON VARIANTS ---
    const btnContainerVariants = {
        rest: { gap: "0px" },
        hover: {
            gap: "8px",
            transition: { duration: 0.3, ease: "backOut" }
        }
    };

    const btnLeftVariants = {
        rest: {
            width: "100%",
            borderTopRightRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem"
        },
        hover: {
            width: "52%",
            borderTopRightRadius: "0.25rem",
            borderBottomRightRadius: "0.25rem",
            transition: { duration: 0.3, ease: "easeInOut" }
        }
    };

    const btnRightVariants = {
        rest: { width: "0%", opacity: 0, x: -10 },
        hover: {
            width: "48%",
            opacity: 1,
            x: 0,
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const intoVariants = {
        rest: { opacity: 0, y: 5 },
        hover: {
            opacity: 0.8,
            y: 0,
            transition: { duration: 0.3, delay: 0.1 }
        }
    };

    const universeVariants = {
        rest: { opacity: 0, y: 10 },
        hover: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, delay: 0.15 }
        }
    };

    const MonoLabel = ({ children, icon = Hash }) => {
        const Icon = icon;
        return (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#9b26b6]/10 border border-[#9b26b6]/30 text-[#f3d4ff] font-mono text-[10px] tracking-[0.22em] uppercase mb-6 backdrop-blur-sm">
                <Icon size={10} className="text-[#ecaefc]" />
                <span className="drop-shadow-sm">{children}</span>
            </div>
        );
    };

    return (
        <section
            id="about-tony-hero"
            className="relative w-full min-h-screen flex flex-col md:flex-row bg-[#0b080e] text-white overflow-hidden"
        >
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`}
            </style>

            {/* --- GLOBAL LIGHTING & ATMOSPHERE --- */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top Cinematic Flare */}
                <div className="absolute top-[-10%] left-[20%] w-[60%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm" />
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>

            {/* --- LEFT SIDE: THE MAN --- */}
            <div className="relative w-full md:w-[48%] flex flex-col justify-end md:justify-center px-8 md:px-12 lg:px-20 py-24 z-10 border-r border-white/5 overflow-hidden">

                {/* BACKGROUND IMAGE - FULLY VISIBLE & PROFESSIONAL */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 2.2, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={aboutHero}
                            alt="Tony Thompson"
                            className="w-full h-full object-cover opacity-[0.9] object-top"
                        />
                        {/* Professional Grading Overlays */}
                        {/* 1. Contrast Boost */}
                        <div className="absolute inset-0 bg-[#0b080e]/20 mix-blend-multiply" />
                        {/* 2. Brand Tint */}
                        <div className="absolute inset-0 bg-[#4a105a]/20 mix-blend-soft-light" />
                        {/* 3. Text Readability Gradient (Left & Bottom) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b080e] via-[#0b080e]/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0b080e]/95 via-[#0b080e]/40 to-transparent" />
                    </motion.div>
                </div>

                {/* CONTENT */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-20"
                >
                    <MonoLabel icon={ScanLine}>The Origin Story</MonoLabel>

                    <motion.div variants={itemVariants} className="relative">
                        <h1 className="text-[clamp(3.5rem,6vw,5.6rem)] font-black leading-[0.9] drop-shadow-2xl">
                            ABOUT
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3d4ff] via-white to-[#f3d4ff]">
                                TONY
                            </span>
                        </h1>
                        {/* Decorative energy line */}
                        <div className="w-24 h-1 mt-6 bg-gradient-to-r from-[#9b26b6] to-transparent shadow-[0_0_15px_#9b26b6]" />
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-[1.1rem] md:text-[1.25rem] leading-[1.7] font-light text-gray-100 mt-8 mb-8 max-w-lg drop-shadow-md"
                    >
                        Tony Thompson is a catalyst for transformation—merging{" "}
                        <span className="font-semibold text-white border-b border-[#9b26b6]">
                            purpose
                        </span>
                        ,{" "}
                        <span className="font-semibold text-white border-b border-[#9b26b6]">
                            systems
                        </span>{" "}
                        and{" "}
                        <span className="font-semibold text-white border-b border-[#9b26b6]">
                            high-performance
                        </span>{" "}
                        into a blueprint built for momentum.
                    </motion.p>
                </motion.div>
            </div>

            {/* --- RIGHT SIDE: THE UNIVERSE --- */}
            <div className="relative flex-1 overflow-hidden bg-[#0f0b13] flex items-end justify-center pb-24 md:pb-28">

                {/* VIDEO BACKGROUND */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    <video
                        className="absolute inset-0 w-full h-full object-cover opacity-90 contrast-[1.1] brightness-[1.1] saturate-[1.15]"
                        autoPlay loop muted playsInline preload="auto"
                    >
                        <source src={tonyWinWEBM} type="video/webm" />
                        <source src={tonyWinMP4} type="video/mp4" />
                    </video>
                    {/* Clean Gradient blend */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b080e] via-transparent to-[#0b080e]/10" />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#0b080e] to-transparent" />
                </motion.div>

                {/* --- 3D CTA BUTTON --- */}
                <motion.button
                    onClick={handleExploreJourney}
                    initial="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                    animate="rest"
                    variants={btnContainerVariants}
                    className="relative group w-[340px] h-[86px] flex items-stretch cursor-pointer z-30 perspective-1000"
                >
                    {/* Hover Glow Behind */}
                    <div className="absolute -inset-4 bg-[#9b26b6]/40 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* LEFT SIDE (The Switch) */}
                    <motion.div
                        variants={btnLeftVariants}
                        className="relative h-full flex items-center justify-center overflow-hidden
                        bg-gradient-to-br from-[#c46ce5] via-[#9b26b6] to-[#6c1e7c]
                        border-t border-l border-[#f0c9ff]/50 
                        border-b-[4px] border-b-[#4a105a] group-active:border-b-0 group-active:translate-y-[4px]
                        shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all duration-100"
                    >
                        {/* Shine */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity" />

                        <span className="relative z-10 text-white font-['Press_Start_2P'] text-[14px] tracking-[0.2em] flex items-center gap-4 drop-shadow-md">
                            STEP
                            <ArrowRight className="h-5 w-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-out text-[#f0c9ff]" />
                        </span>
                    </motion.div>

                    {/* RIGHT SIDE (The Screen) */}
                    <motion.div
                        variants={btnRightVariants}
                        className="relative h-full bg-[#15101a]/95 backdrop-blur-xl flex items-center justify-center overflow-hidden rounded-r-lg 
                        border-t border-r border-[#f0c9ff]/30 
                        border-b-[4px] border-b-black group-active:border-b-0 group-active:translate-y-[4px]
                        shadow-inner transition-all duration-100"
                    >
                        <div className="flex flex-col items-center justify-center pt-1">
                            <motion.span
                                variants={intoVariants}
                                className="text-gray-400 text-[9px] font-['Press_Start_2P'] uppercase tracking-widest leading-none mb-2"
                            >
                                into
                            </motion.span>

                            <motion.span
                                variants={universeVariants}
                                className="text-[#e0aaff] text-[11px] font-['Press_Start_2P'] uppercase tracking-widest leading-none drop-shadow-[0_0_8px_rgba(224,170,255,0.5)]"
                            >
                                his universe
                            </motion.span>
                        </div>

                        {/* Tech Corner Accents */}
                        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#9b26b6] rounded-full opacity-60" />
                        <div className="absolute bottom-2 right-1.5 w-1.5 h-1.5 bg-[#9b26b6] rounded-full opacity-60" />
                    </motion.div>
                </motion.button>

            </div>
        </section>
    );
}