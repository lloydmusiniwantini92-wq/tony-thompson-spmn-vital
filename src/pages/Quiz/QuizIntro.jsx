import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Quiz from "./Quiz";
import quizIntro from "../../assets/quiz/quizIntro.jpg";

export default function QuizIntro() {
    const [started, setStarted] = useState(false);

    const containerVars = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.3 }
        },
        exit: {
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
        }
    };

    const textReveal = {
        hidden: { y: "110%", skewY: 3, opacity: 0 },
        visible: {
            y: "0%",
            skewY: 0,
            opacity: 1,
            transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black text-white">

            {/* ==== BACKGROUND ==== */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2.2, ease: "easeOut" }}
                style={{
                    backgroundImage: `url(${quizIntro})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                    }}
                />
            </motion.div>

            {/* Purple overlay */}
            <div className="absolute inset-0 bg-[#7d1f97]/20 backdrop-blur-[4px] z-[1] mix-blend-overlay" />
            <div className="absolute inset-0 bg-black/40 z-[1]" />

            <AnimatePresence mode="wait">
                {!started ? (
                    <motion.div
                        key="intro"
                        variants={containerVars}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative z-[5] h-full flex flex-col items-center justify-center px-6 text-center"
                    >
                        <h1 className="font-extrabold mb-10 leading-[0.95] uppercase text-white drop-shadow-2xl">
                            <div className="flex flex-col items-center gap-2">
                                <div className="overflow-hidden">
                                    <motion.span
                                        className="block text-[clamp(3rem,7vw,6.5rem)]"
                                        variants={textReveal}
                                    >
                                        How Do You Want
                                    </motion.span>
                                </div>
                                <div className="overflow-hidden">
                                    <motion.span
                                        className="block text-[clamp(3rem,7vw,6.5rem)]"
                                        variants={textReveal}
                                    >
                                        Your Next Level
                                    </motion.span>
                                </div>
                                <div className="overflow-hidden">
                                    <motion.span
                                        className="block text-[clamp(3rem,7vw,6.5rem)] text-white/90"
                                        variants={textReveal}
                                    >
                                        to Play Out?
                                    </motion.span>
                                </div>
                            </div>
                        </h1>

                        <div className="overflow-hidden mb-14">
                            <motion.div
                                variants={textReveal}
                                className="text-lg md:text-2xl font-medium text-white/90 max-w-[800px] leading-relaxed"
                            >
                                <p>Discover where your biggest growth opportunity lies — and get a custom roadmap to unlock it.</p>
                                <p className="mt-4 font-bold tracking-wide text-white">
                                    Choose the outcomes that matter most to you.
                                </p>
                            </motion.div>
                        </div>

                        {/* BUTTON */}
                        <motion.div
                            variants={textReveal}
                            onClick={() => setStarted(true)}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="group cursor-pointer relative"
                        >
                            <div
                                className="
                                    relative flex justify-center items-center w-[280px] h-[68px] gap-4
                                    text-white font-['Press_Start_2P'] text-[0.8rem] uppercase tracking-widest
                                    bg-white/5 backdrop-blur-md border border-white/20
                                    rounded-[1rem] shadow-[0_10px_30px_rgba(155,38,182,0.3)]
                                    transition-all duration-[600ms]
                                    hover:translate-y-[-4px]
                                    overflow-hidden hover:bg-[#9b26b6] hover:border-[#9b26b6]
                                "
                            >
                                <span className="relative z-10">TAKE THE QUIZ</span>
                                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0)" }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                        className="w-full h-full relative z-[5]"
                    >
                        <Quiz />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
