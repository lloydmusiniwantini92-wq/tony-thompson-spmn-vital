import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import tonyCap from "../assets/images/tonyCap.jpg";

export default function Shop() {
    const navigate = useNavigate();
    const [isFading, setIsFading] = useState(false);

    // 1 cm ≈ 37.8 px → 1.5 cm ≈ 56.7 px
    const imgOffset = 37.8 * 1.5;

    const textVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: [0.25, 1, 0.3, 1], delay: 0.2 },
        },
    };

    const handleBack = () => {
        if (isFading) return;
        setIsFading(true);
        setTimeout(() => {
            navigate("/?target=#testimonials", { replace: true });
        }, 600);
        setTimeout(() => setIsFading(false), 1800);
    };

    return (
        <main className="relative w-full h-screen overflow-hidden bg-black text-white">
            {/* === BACKGROUND IMAGE === */}
            <motion.img
                src={tonyCap}
                alt="Tony Cap Background"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.6, ease: [0.25, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
                style={{
                    filter: "brightness(0.7) contrast(1.1)",
                    transform: `scale(1.1) translate(${-imgOffset}px, ${-imgOffset}px)`,
                }}
            />

            {/* === GRADIENT OVERLAY === */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />

            {/* === FADE-TO-BLACK TRANSITION === */}
            <AnimatePresence>
                {isFading && (
                    <motion.div
                        key="fade"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
                        className="fixed inset-0 bg-black z-[9999] pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* === CONTENT === */}
            <div className="relative z-10 flex flex-col justify-between h-full w-full px-6 py-12">

                {/* TOP — COMING SOON */}
                <div className="flex justify-center items-center w-full mt-4 md:mt-8 space-x-4 md:space-x-8">
                    <motion.h1
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-5xl md:text-[8rem] leading-none font-extrabold tracking-tighter uppercase text-white/90 drop-shadow-2xl"
                    >
                        COMING
                    </motion.h1>

                    <motion.h1
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.4 }}
                        className="text-5xl md:text-[8rem] leading-none font-extrabold tracking-tighter uppercase text-white/40 drop-shadow-2xl"
                    >
                        SOON
                    </motion.h1>
                </div>

                {/* MIDDLE SPACER */}
                <div className="flex-grow" />

                {/* BOTTOM — BRAND TEXT + CTA */}
                <div className="flex flex-col items-center w-full mb-12 md:mb-20">

                    {/* BRANDING TEXT */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-center max-w-2xl mb-8 px-4"
                    >
                        <p className="text-sm md:text-lg font-semibold tracking-[0.25em] text-[#9b26b6] uppercase mb-3 drop-shadow-[0_0_8px_rgba(155,38,182,0.5)]">
                            The Lab is Active
                        </p>

                        <p className="text-base md:text-xl font-medium text-white/85 leading-relaxed">
                            Tony is crafting a collection that reflects the precision of the mission.
                            Excellence isn’t rushed.
                            <br className="hidden md:block" />
                            Prepare for the drop.
                        </p>
                    </motion.div>

                    {/* CTA — PERFECT HERO MATCH (BACK only) */}
                    <motion.div
                        onClick={handleBack}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
                        whileHover={{
                            translateY: -4,
                            boxShadow: "0 10px 25px rgba(155,38,182,0.7)",
                        }}
                        whileTap={{ scale: 0.94 }}
                        className="
                            relative flex justify-center items-center 
                            w-[150px] h-[56px]
                            cursor-pointer select-none
                            uppercase tracking-wider
                            text-white text-[0.9rem] 
                            font-['Press_Start_2P']
                            rounded-[10px]
                            border border-white/20
                            bg-gradient-to-br
                            from-[#952ca8]/85 to-[#7d1f97]/70
                            shadow-[0_10px_25px_rgba(155,38,182,0.6)]
                            transition-all duration-[600ms]
                            ease-[cubic-bezier(0.25,1,0.3,1)]
                        "
                    >
                        {/* SHIMMER SWEEP */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulseGlow rounded-[10px]" />

                        {/* ULTRA MINIMAL — NO SWAP */}
                        <span className="relative z-10">
                            BACK
                        </span>
                    </motion.div>

                </div>
            </div>

            {/* CTA SHIMMER ANIMATION */}
            <style>{`
                @keyframes pulseGlow {
                    0%, 100% { opacity: 0.35; transform: translateX(-25%); }
                    50% { opacity: 0.9; transform: translateX(25%); }
                }
                .animate-pulseGlow { 
                    animation: pulseGlow 6s ease-in-out infinite; 
                }
            `}</style>
        </main>
    );
}
