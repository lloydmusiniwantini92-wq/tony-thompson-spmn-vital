import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { createPortal } from "react-dom";
import { useVideoModal } from "../context/VideoModalContext";

const base = import.meta.env.BASE_URL || "/";
const bookTonyVideo = `${base}videos/programsVideo.mp4`;

export default function BookTonySection() {
    const { openVideo, closeVideo, videoSrc } = useVideoModal();

    const videoRef = useRef(null);
    const sectionRef = useRef(null);
    const [hasPlayed, setHasPlayed] = useState(false);
    const controls = useAnimation();

    /* Detect scroll for parallax */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const yText = useTransform(scrollYProgress, [0, 1], [80, -80]);

    /* Play looping background video when visible */
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

    /* WIN letter animations */
    const letterContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.1 },
        },
    };

    const letterAnim = {
        hidden: { y: "100%" },
        visible: {
            y: "0%",
            transition: { duration: 0.9, ease: [0.25, 1, 0.3, 1] },
        },
    };

    /* ⭐ SPECIAL CASE — OPEN WITH programsJump FLAG */
    const handleOpenVideo = () => {
        window.__tt_fromBookTony = true;
        openVideo(bookTonyVideo, { programsJump: true });
    };

    /* ⭐ FAST 0.3s SMOOTH SCROLL TO PROGRAMS */
    const handleWinNowJump = () => {
        window.__tt_fromBookTony = false;
        closeVideo();

        setTimeout(() => {
            const el = document.querySelector("#programs");
            if (!el) return;

            const targetY = el.offsetTop - 60;

            // 🚀 Custom fast smooth scroll (0.3s)
            const startY = window.scrollY;
            const diff = targetY - startY;
            const duration = 300; // ← 0.3 seconds
            const startTime = performance.now();

            const easeOut = (t) => 1 - Math.pow(1 - t, 3); // fast, smooth, crisp

            const animate = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeOut(progress);

                window.scrollTo(0, startY + diff * eased);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }, 200);
    };

    /* WIN NOW overlay injected only when needed */
    const renderWinNowOverlay =
        typeof document !== "undefined" &&
        videoSrc &&
        window.__tt_fromBookTony &&
        createPortal(
            <div className="fixed inset-0 z-[2147483650] flex items-center justify-center pointer-events-none">
                <button
                    onClick={handleWinNowJump}
                    className="
                        pointer-events-auto
                        flex justify-center items-center
                        w-[230px] h-[70px]
                        font-['Press_Start_2P']
                        text-white text-[1.1rem]
                        bg-gradient-to-br from-[#9b26b6]/90 to-[#7d1f97]/70
                        rounded-[1rem] border border-white/30
                        shadow-[0_0_30px_rgba(155,38,182,0.9)]
                        uppercase tracking-widest
                        transition-all duration-300
                        hover:scale-[1.08]
                        hover:shadow-[0_0_45px_rgba(255,255,255,0.65)]
                    "
                    style={{
                        position: "absolute",
                        bottom: "8vh",
                    }}
                >
                    WIN NOW →
                </button>
            </div>,
            document.body
        );

    return (
        <>
            {/* MAIN SECTION */}
            <section
                id="book-tony"
                ref={sectionRef}
                className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black"
            >
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src={bookTonyVideo}
                    muted
                    playsInline
                    preload="auto"
                    loop
                />

                <div className="absolute inset-0 bg-black/35 z-[1]" />

                <motion.div
                    className="relative z-[3] flex flex-col items-center text-center px-4"
                    style={{ y: yText }}
                >
                    <motion.div
                        className="flex gap-[0.3em] overflow-hidden justify-center"
                        variants={letterContainer}
                        initial="hidden"
                        animate={controls}
                    >
                        {["W", "I", "N", "!"].map((char, i) => (
                            <motion.span
                                key={i}
                                className="win-letter"
                                variants={letterAnim}
                                style={{
                                    fontSize: "clamp(6rem, 12vw, 11rem)",
                                    fontWeight: 900,
                                    color: "transparent",
                                    WebkitTextStroke: "3px #9b26b6",
                                    textShadow: "0 0 18px rgba(155,38,182,0.35)",
                                    WebkitBackgroundClip: "text",
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={controls}
                        variants={{
                            visible: {
                                opacity: 1,
                                transition: { duration: 1, delay: 0.35 },
                            },
                        }}
                        className="mt-4"
                    >
                        <div className="flex items-center justify-center gap-6">
                            <div className="w-[70px] h-[2px] bg-[#9b26b6] relative">
                                <div className="absolute left-0 top-[-4px] w-[7px] h-[7px] bg-white" />
                            </div>

                            <h3
                                style={{
                                    fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                                    fontWeight: 800,
                                    letterSpacing: "0.28em",
                                    color: "white",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                WHATEVER IS NECESSARY
                            </h3>

                            <div className="w-[70px] h-[2px] bg-[#9b26b6] relative">
                                <div className="absolute right-0 top-[-4px] w-[7px] h-[7px] bg-white" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.img
                        src="/tony-thompson-spmn-vital/assets/images/ts.png"
                        className="mt-10"
                        style={{
                            width: "240px",
                            filter: "brightness(0) invert(1)",
                            opacity: 0.9,
                        }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={controls}
                        variants={{
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 1, delay: 0.6 },
                            },
                        }}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={controls}
                        variants={{
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 1, delay: 0.8 },
                            },
                        }}
                        className="absolute bottom-[-12vh] left-1/2 -translate-x-1/2 z-[3]"
                    >
                        <div
                            onClick={handleOpenVideo}
                            className="
                                flex justify-center items-center 
                                w-[200px] h-[62px]
                                font-['Press_Start_2P']
                                text-white 
                                text-[1.7rem]
                                cursor-pointer 
                                bg-gradient-to-br from-[#7d1f97]/85 to-[#952ca8]/70
                                rounded-[12px] border border-white/20 
                                shadow-[0_10px_25px_rgba(155,38,182,0.7)]
                                uppercase tracking-widest
                                transition-all duration-[500ms]
                                hover:scale-[1.12]
                                hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]
                            "
                            style={{ animation: "nowPulse 2.4s ease-in-out infinite" }}
                        >
                            NOW
                        </div>
                    </motion.div>
                </motion.div>

                <style>{`
                    @keyframes nowPulse {
                        0% { transform: translateY(0) scale(1); }
                        50% { transform: translateY(-2px) scale(1.06); }
                        100% { transform: translateY(0) scale(1); }
                    }
                    .win-letter:hover {
                        background-image: linear-gradient(
                            90deg,
                            rgba(255,255,255,0) 0%,
                            rgba(255,255,255,0.25) 50%,
                            rgba(255,255,255,0) 100%
                        );
                        background-size: 200% 100%;
                        animation: winHoverShine 0.8s forwards;
                    }
                    @keyframes winHoverShine {
                        0% { background-position: -100% 0%; }
                        100% { background-position: 100% 0%; }
                    }
                `}</style>
            </section>

            {renderWinNowOverlay}
        </>
    );
}
