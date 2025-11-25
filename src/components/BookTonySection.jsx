import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { createPortal } from "react-dom";
import { useVideoModal } from "../context/VideoModalContext";
import { ArrowRight } from "lucide-react";

const base = import.meta.env.BASE_URL || "/";
const bookTonyVideo = `${base}videos/programsVideo.mp4`;

export default function BookTonySection() {
    const { openVideo, closeVideo, videoSrc } = useVideoModal();

    const videoRef = useRef(null);
    const sectionRef = useRef(null);
    const [hasPlayed, setHasPlayed] = useState(false);
    const controls = useAnimation();

    const [showWinNow, setShowWinNow] = useState(false);
    useEffect(() => {
        if (videoSrc && window.__tt_fromBookTony) {
            setShowWinNow(false);
            const timer = setTimeout(() => setShowWinNow(true), 2000);
            return () => clearTimeout(timer);
        }
        setShowWinNow(false);
    }, [videoSrc]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const ySig = useTransform(scrollYProgress, [0, 1], [40, -40]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        controls.start("visible");
                        if (!hasPlayed && videoRef.current) {
                            videoRef.current.play().catch(() => { });
                            setHasPlayed(true);
                        }
                    }
                });
            },
            { threshold: 0.4 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [hasPlayed]);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) v.play().catch(() => { });
                else v.pause();
            },
            { threshold: 0.25 }
        );

        observer.observe(v);
        return () => observer.disconnect();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 60, opacity: 0, filter: "blur(12px)" },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 1.1, ease: [0.19, 1, 0.22, 1] },
        },
    };

    const handleOpenVideo = () => {
        window.__tt_fromBookTony = true;
        openVideo(bookTonyVideo, { programsJump: true });
    };

    const handleWinNowJump = () => {
        window.__tt_jumpOverride = true;

        window.__tt_fromBookTony = false;
        closeVideo();

        setTimeout(() => {
            const el = document.querySelector("#programs");
            if (!el) return;

            const lenis = window.lenis;

            if (lenis) {
                lenis.stop();
                window.scrollTo({
                    top: el.offsetTop,
                    behavior: "auto",
                });
                setTimeout(() => lenis.start(), 50);
            } else {
                window.scrollTo({
                    top: el.offsetTop,
                    behavior: "auto",
                });
            }

            setTimeout(() => {
                window.__tt_jumpOverride = false;
            }, 350);
        }, 150);
    };

    const renderWinNowOverlay =
        typeof document !== "undefined" &&
        videoSrc &&
        window.__tt_fromBookTony &&
        showWinNow &&
        createPortal(
            <div className="fixed inset-0 z-[2147483650] flex items-end justify-center pb-[8vh] pointer-events-none">
                <button
                    onClick={handleWinNowJump}
                    className="
                        pointer-events-auto
                        group relative overflow-hidden
                        flex justify-center items-center gap-3
                        px-12 py-5
                        bg-[#9b26b6] text-white
                        font-['Press_Start_2P']
                        text-[1.35rem] tracking-[0.18em]
                        rounded-full
                        shadow-[0_0_50px_rgba(155,38,182,0.6)]
                        border border-white/20

                        opacity-0
                        animate-[fadeIn_0.9s_ease-out_forwards]
                        hover:scale-105 hover:shadow-[0_0_80px_rgba(155,38,182,0.8)]
                        hover:bg-white hover:text-[#9b26b6]
                    "
                >
                    {/* BEFORE hover = WIN */}
                    <span
                        className="
                            relative z-10
                            group-hover:-translate-y-[150%]
                            group-hover:opacity-0
                            transition-all duration-500
                        "
                    >
                        WIN
                    </span>

                    {/* ON hover = NOW */}
                    <span
                        className="
                            absolute z-10
                            opacity-0 translate-y-[150%]
                            group-hover:opacity-100 group-hover:translate-y-0
                            transition-all duration-500
                        "
                    >
                        NOW
                    </span>

                    <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <style>{`
                    @keyframes fadeIn {
                        0% { opacity: 0; transform: translateY(20px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>,
            document.body
        );

    return (
        <>
            <section
                id="book-tony"
                ref={sectionRef}
                className="relative w-full h-[110vh] overflow-hidden flex items-center justify-center bg-[#050505]"
            >
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[40%] scale-[1.05]"
                    src={bookTonyVideo}
                    muted
                    playsInline
                    preload="auto"
                    loop
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#2a0530]/30 to-black/90 z-[1]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] z-[1]" />

                <motion.div
                    className="relative z-[10] flex flex-col items-center text-center px-6 w-full max-w-[1400px]"
                    style={{ y: yText }}
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <motion.div variants={itemVariants} className="mb-4">
                        <div className="flex items-center gap-6 opacity-90">
                            <div className="h-[1px] w-[40px] md:w-[80px] bg-[#9b26b6]" />
                            <h3 className="text-white text-[0.7rem] md:text-[0.9rem] tracking-[0.4em] font-bold uppercase font-sans drop-shadow-[0_0_10px_rgba(155,38,182,0.8)]">
                                Whatever Is Necessary
                            </h3>
                            <div className="h-[1px] w-[40px] md:w-[80px] bg-[#9b26b6]" />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="relative">
                        <h1
                            className="font-['Bebas_Neue'] text-[clamp(8rem,18vw,22rem)] leading-[0.85] text-white tracking-tighter"
                            style={{
                                textShadow: "0 0 60px rgba(155,38,182,0.4)",
                                WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                            }}
                        >
                            WIN!
                        </h1>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#9b26b6]/25 blur-[120px] -z-10 mix-blend-screen" />
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-10 md:mt-14">
                        <div
                            onClick={handleOpenVideo}
                            className="group relative flex items-center justify-center cursor-pointer"
                        >
                            <div className="absolute inset-0 rounded-full border border-[#9b26b6]/40 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                            <div className="absolute inset-[-12px] rounded-full border border-[#9b26b6]/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]" />

                            <div
                                className="
                                    relative flex items-center justify-center
                                    w-[280px] h-[80px]
                                    bg-black/40 backdrop-blur-md border border-[#9b26b6]/50
                                    rounded-full
                                    transition-all duration-500
                                    hover:bg-[#9b26b6] hover:border-white/50 hover:scale-105
                                    hover:shadow-[0_0_60px_rgba(155,38,182,0.6)]
                                    overflow-hidden
                                "
                            >
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <span
                                        className="
                                            absolute text-white font-['Press_Start_2P']
                                            text-[1.35rem] tracking-[0.18em] drop-shadow-md
                                            transition-all duration-500 ease-in-out
                                            group-hover:translate-y-[-150%] group-hover:opacity-0
                                        "
                                    >
                                        START
                                    </span>

                                    <span
                                        className="
                                            absolute text-white font-['Press_Start_2P']
                                            text-[1.35rem] tracking-[0.18em] drop-shadow-md
                                            translate-y-[150%] opacity-0
                                            transition-all duration-500 ease-in-out
                                            group-hover:translate-y-0 group-hover:opacity-100
                                        "
                                    >
                                        WINNING
                                    </span>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="mt-20 opacity-80 flex items-start justify-center relative"
                        style={{ y: ySig }}
                        variants={itemVariants}
                    >
                        <div className="relative">
                            <img
                                src="/tony-thompson-spmn-vital/assets/images/ts.png"
                                alt="Tony Thompson Signature"
                                className="w-[200px] md:w-[260px] opacity-90 invert brightness-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                            />
                            <span
                                className="absolute -right-4 top-2 text-white/60 text-[0.7rem] font-bold font-sans"
                                style={{ textShadow: "0 0 5px rgba(255,255,255,0.5)" }}
                            >
                                ®
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {renderWinNowOverlay}
        </>
    );
}
