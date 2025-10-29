// ✅ QuizIntro.jsx — “READY TO RISE?” (Client-Approved Copy Integration)
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Quiz from "../pages/Quiz";

export default function QuizIntro() {
    const [started, setStarted] = useState(false);

    return (
        <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#9b26b6] text-white">
            <AnimatePresence mode="wait">
                {!started ? (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
                    >
                        {/* === TITLE === */}
                        <motion.h1
                            className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight tracking-tight uppercase"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.15 } },
                            }}
                        >
                            {["Ready", "to", "Rise?"].map((word, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block mx-1"
                                    variants={{
                                        hidden: { opacity: 0, y: 40 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.6, ease: "easeOut" },
                                        },
                                    }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h1>

                        {/* === SUBTEXT === */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3, duration: 1 }}
                            className="text-base md:text-xl font-medium text-white/90 mb-16 max-w-[700px]"
                        >
                            Take control of your career, your business, and your life. Sign up today and get your{" "}
                            <span className="font-semibold">complimentary playbook</span> — place your first block and{" "}
                            <span className="font-semibold">start leveling up.</span>
                        </motion.p>

                        {/* === PURPLE BUTTON (UNIFORM SPACING, SMALLER FONT) === */}
                        <motion.div
                            className="flex flex-col gap-6 justify-center items-center w-full"
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.2, duration: 1.2, ease: "easeOut" }}
                        >
                            <motion.div
                                onClick={() => setStarted(true)}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.35 }}
                                className="relative w-[220px] h-[58px] select-none cursor-pointer group
                                    flex items-center justify-center overflow-hidden
                                    rounded-[1rem] border border-white/20
                                    bg-gradient-to-br from-[#9b26b6]/85 to-[#b14fc0]/70
                                    font-['Press_Start_2P'] text-[0.7rem] uppercase tracking-widest text-white
                                    shadow-[0_10px_25px_rgba(155,38,182,0.7),inset_0_2px_6px_rgba(255,255,255,0.3)]
                                    hover:shadow-[0_14px_35px_rgba(155,38,182,0.85),inset_0_2px_10px_rgba(255,255,255,0.4)]
                                    transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.3,1)]"
                            >
                                {/* Glow overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-pulseGlow rounded-[1rem]" />

                                <div className="relative z-10 flex items-center justify-center gap-4">
                                    <span>TAKE THE QUIZ</span>
                                    <motion.span
                                        className="text-white text-[1.4rem] font-extrabold leading-none"
                                        animate={{ x: [0, 3, 0], opacity: [0.8, 1, 0.8] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <motion.span
                                            className="inline-block"
                                            whileHover={{
                                                x: 6,
                                                scale: 1.1,
                                                color: "#d7a3f2",
                                            }}
                                            transition={{ type: "spring", stiffness: 220, damping: 15 }}
                                        >
                                            ➜
                                        </motion.span>
                                    </motion.span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="w-full h-full"
                    >
                        <Quiz />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* === Shared Glow Animation === */}
            <style>{`
                @keyframes pulseGlow {
                    0%,100% { opacity:0.4; transform:translateX(-25%); }
                    50% { opacity:0.9; transform:translateX(25%); }
                }
                .animate-pulseGlow { animation:pulseGlow 6s ease-in-out infinite; }
            `}</style>
        </section>
    );
}
