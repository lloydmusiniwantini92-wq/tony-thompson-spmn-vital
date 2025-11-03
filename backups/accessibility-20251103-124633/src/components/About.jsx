import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import tonyVideo from "../assets/videos/tony_about.mp4";

export default function About() {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const inView = useInView(sectionRef, { threshold: 0.35, margin: "-15% 0px -15% 0px" });
    const navigate = useNavigate();

    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

    useEffect(() => {
        const vid = videoRef.current;
        if (!vid) return;
        if (inView) {
            vid.loop = true;
            vid.play().catch(() => { });
        } else {
            vid.pause();
        }
    }, [inView]);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
        >
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.9]"
                src={tonyVideo}
                muted
                playsInline
                preload="metadata"
                decoding="async"
                loop
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent z-[1]" />
            <div className="absolute inset-0 bg-[#9b26b6]/10 mix-blend-overlay z-[2]" />

            <motion.div
                className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#9b26b6]/50 to-transparent blur-[1px] z-[2]"
                animate={{ opacity: [0.1, 0.3, 0.1], x: ["-30%", "50%", "130%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                style={{ y }}
                className="relative z-[5] flex flex-col items-center justify-center text-center px-6"
            >
                <motion.h2
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
                    className="text-[clamp(3.5rem,7vw,6rem)] font-extrabold text-white leading-[0.95] tracking-tight mb-4"
                >
                    Empower
                </motion.h2>

                <motion.h3
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 1, 0.3, 1] }}
                    className="text-[clamp(2rem,5vw,3.5rem)] font-semibold text-white tracking-wide mb-8"
                >
                    Your Growth Journey
                </motion.h3>
            </motion.div>

            <motion.div
                className="absolute bottom-16 left-0 right-0 flex justify-center z-[5]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
            >
                <motion.div
                    onClick={() => navigate("/quiz-intro")}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                    className="relative w-[210px] h-[60px] select-none cursor-pointer group
                        flex items-center justify-center overflow-hidden
                        rounded-[1rem] border border-white/20
                        bg-gradient-to-br from-[#9b26b6]/85 to-[#b14fc0]/70
                        font-['Press_Start_2P'] text-[0.8rem] uppercase tracking-wider text-white
                        shadow-[0_10px_25px_rgba(155,38,182,0.7),inset_0_2px_6px_rgba(255,255,255,0.3)]
                        hover:shadow-[0_14px_35px_rgba(155,38,182,0.85),inset_0_2px_10px_rgba(255,255,255,0.4)]
                        transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.3,1)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-pulseGlow rounded-[1rem]" />
                    <div className="relative z-10 flex items-center gap-3">
                        <span>GET STARTED</span>
                        <motion.span
                            className="text-white text-[1.6rem] font-extrabold leading-none"
                            animate={{ x: [0, 3, 0], opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <motion.span
                                className="inline-block"
                                whileHover={{
                                    x: 8,
                                    scale: 1.15,
                                    color: "#d7a3f2",
                                }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                                ➜
                            </motion.span>
                        </motion.span>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[20vh] bg-gradient-to-t from-[#9b26b6]/25 via-transparent to-transparent blur-3xl z-[1]"
                animate={{ opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

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
