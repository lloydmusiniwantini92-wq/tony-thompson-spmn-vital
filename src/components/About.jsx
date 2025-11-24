import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import tonyVideo from "../assets/videos/tony_about.mp4";

export default function About() {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const navigate = useNavigate();

    // Track last playback time (same logic as Testimonials)
    const lastTime = useRef(0);

    // === TYPE 7 PARALLAX PHYSICS ===
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const yVideo = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
    const bloomOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.8], [0, 0.6, 0]);

    // ============================================================================
    // === VIDEO AUTOPLAY CONTROL (full visibility only - identical behavior to Hero)
    // ============================================================================
    useEffect(() => {
        const section = sectionRef.current;
        const video = videoRef.current;
        if (!section || !video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const mostlyVisible = entry.intersectionRatio >= 0.6;

                if (mostlyVisible) {
                    video.currentTime = lastTime.current || 0;

                    setTimeout(() => {
                        video.play().catch(() => { });
                    }, 40);
                } else {
                    lastTime.current = video.currentTime;
                    video.pause();
                }
            },
            { threshold: [0, 0.3, 0.5, 0.6, 0.8, 1] }
        );


        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative w-full h-[110vh] flex items-center justify-center overflow-hidden bg-black perspective-[1000px]"
        >
            {/* === PARALLAX VIDEO LAYER === */}
            <motion.div
                className="absolute inset-0 w-full h-[120%] top-[-10%]"
                style={{ y: yVideo }}
            >
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover opacity-60 grayscale-[20%] scale-105"
                    src={tonyVideo}
                    muted
                    playsInline
                    preload="metadata"
                    decoding="async"
                    loop
                />

                {/* Cinematic Grain */}
                <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                    }}
                />
            </motion.div>

            {/* === ATMOSPHERE === */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-[1]" />
            <div className="absolute inset-0 bg-[#7d1f97]/10 mix-blend-overlay z-[2]" />

            {/* Searchlight */}
            <motion.div
                className="absolute top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#9b26b6] to-transparent z-[2] blur-[1px]"
                animate={{ x: ["-40vw", "40vw"], opacity: [0, 0.5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* === CONTENT === */}
            <motion.div
                className="relative z-[10] flex flex-col items-center justify-center text-center px-6 w-full"
                style={{ y: yText }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
                    },
                }}
            >
                {/* Purple Vertical Energy Line */}
                <motion.div
                    className="w-[2px] h-[100px] bg-gradient-to-b from-transparent via-[#9b26b6] to-transparent mb-8"
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: 120, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Backlight Bloom */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    w-[500px] h-[300px] bg-[#9b26b6] blur-[120px] -z-10 rounded-full mix-blend-screen"
                    style={{ opacity: bloomOpacity }}
                />

                {/* HEADLINE */}
                <div className="overflow-hidden">
                    <motion.h2
                        variants={{
                            hidden: { y: 100, opacity: 0, skewY: 4 },
                            visible: {
                                y: 0,
                                opacity: 1,
                                skewY: 0,
                                transition: { duration: 1.4, ease: [0.19, 1, 0.22, 1] },
                            },
                        }}
                        className="text-[clamp(5rem,15vw,11rem)] font-['Bebas_Neue'] font-black text-white leading-[0.85] tracking-tighter drop-shadow-2xl"
                        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
                    >
                        EMPOWER
                    </motion.h2>
                </div>

                {/* SUBHEAD */}
                <div className="overflow-hidden mt-6 mb-14">
                    <motion.h3
                        variants={{
                            hidden: { y: 100, opacity: 0, skewY: 4 },
                            visible: {
                                y: 0,
                                opacity: 1,
                                skewY: 0,
                                transition: { duration: 1.4, ease: [0.19, 1, 0.22, 1] },
                            },
                        }}
                        className="text-[clamp(1rem,3vw,1.8rem)] font-sans font-bold text-white/90 tracking-[0.4em] uppercase drop-shadow-lg"
                    >
                        Your Growth Journey
                    </motion.h3>
                </div>

                {/* BUTTON */}
                <motion.div
                    variants={{
                        hidden: { y: 100, opacity: 0, skewY: 4 },
                        visible: {
                            y: 0,
                            opacity: 1,
                            skewY: 0,
                            transition: { duration: 1.4, ease: [0.19, 1, 0.22, 1] },
                        },
                    }}
                    onClick={() => navigate("/quiz-intro")}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-16 group cursor-pointer relative"
                >
                    <div
                        className="relative flex justify-center items-center w-[260px] h-[56px] gap-3
                        text-white font-['Press_Start_2P'] text-[0.75rem] uppercase tracking-wider
                        bg-white/5 backdrop-blur-sm border border-white/20
                        rounded-[1rem] shadow-[0_10px_25px_rgba(155,38,182,0.3)]
                        transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.3,1)]
                        hover:translate-y-[-4px] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#952ca8]/90 to-[#7d1f97]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-pulseGlow rounded-[1rem]" />

                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] skew-x-[-15deg] group-hover:animate-sheen" />

                        <span className="relative z-10">GET STARTED</span>
                        <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </motion.div>
            </motion.div>

            <style>{`
                @keyframes pulseGlow {
                    0%,100% { opacity:0.4; transform:translateX(-25%); }
                    50% { opacity:0.9; transform:translateX(25%); }
                }
                .animate-pulseGlow { animation:pulseGlow 6s ease-in-out infinite; }

                @keyframes sheen {
                    0% { transform: translateX(-200%) skewX(-15deg); }
                    100% { transform: translateX(200%) skewX(-15deg); }
                }
                .group:hover .group-hover\\:animate-sheen {
                    animation: sheen 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                }
            `}</style>
        </section>
    );
}
