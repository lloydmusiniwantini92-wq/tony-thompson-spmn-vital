// ✅ src/components/QuizIntro.jsx — Subtle Purple Blur Overlay, No Footer, Clean White Headline
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Quiz from "../pages/Quiz";
import quizIntro from "../assets/quiz/quizIntro.jpg";

export default function QuizIntro() {
    const [started, setStarted] = useState(false);

    return (
        <section
            className="relative w-full h-screen overflow-hidden flex items-center justify-center text-white"
            style={{
                backgroundImage: `url(${quizIntro})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* === SUBTLE PURPLE BLUR OVERLAY === */}
            <div className="absolute inset-0 bg-[#7d1f97]/10 backdrop-blur-[4px]" />

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
                        {/* === HEADLINE (Pure white, no glow) === */}
                        <motion.h1
                            className="text-[3.4rem] md:text-[6.5rem] font-extrabold mb-10 leading-[1.05] tracking-tight uppercase text-white"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.15 } },
                            }}
                        >
                            {[
                                "How Do You Want",
                                "Your",
                                "Next Level",
                                "to Play Out?",
                            ].map((word, i) => (
                                <motion.span
                                    key={i}
                                    className="block mx-1 text-white"
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
                            transition={{ delay: 1.2, duration: 1 }}
                            className="text-lg md:text-2xl font-semibold text-white mb-16 max-w-[780px] leading-relaxed"
                        >
                            Discover where your biggest growth opportunity lies — and get a
                            custom roadmap to unlock it.
                            <br />
                            <span className="block mt-4 font-extrabold text-white text-xl md:text-2xl tracking-wide">
                                Choose the outcomes that matter most to you 👇
                            </span>
                        </motion.p>

                        {/* === START BUTTON === */}
                        <motion.div
                            className="flex flex-col gap-6 justify-center items-center w-full"
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.2, duration: 1.2, ease: "easeOut" }}
                        >
                            <motion.div
                                onClick={() => setStarted(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.35 }}
                                className="relative w-[260px] h-[68px] select-none cursor-pointer group
                flex items-center justify-center overflow-hidden
                rounded-[1rem] border border-white/30
                bg-gradient-to-br from-[#7d1f97]/90 to-[#952ca8]/80
                font-['Press_Start_2P'] text-[0.8rem] uppercase tracking-widest text-white
                transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.3,1)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-pulseGlow rounded-[1rem]" />
                                <div className="relative z-10 flex items-center justify-center gap-4">
                                    <span>TAKE THE QUIZ</span>
                                    <motion.span
                                        className="text-white text-[1.6rem] font-extrabold leading-none"
                                        animate={{ x: [0, 3, 0], opacity: [0.8, 1, 0.8] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        ➜
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
