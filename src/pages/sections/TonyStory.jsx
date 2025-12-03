// ⭐ TonyStory.jsx — Cinematic Universe Entry Hero

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Hash, ScanLine, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import aboutHero from "../../assets/images/AboutHero.png";
import tonyWinMP4 from "../../assets/videos/tonywin_optimized.mp4";
import tonyWinWEBM from "../../assets/videos/tonywin_optimized.webm";

/* --- Sub-component: The Tetris Block Effect --- */
const TetrisField = () => {
    const blocks = Array.from({ length: 18 }).map((_, i) => {
        const baseSize = Math.random() * 1.5 + 1;
        const shapeType = Math.random();
        let width, height;

        if (shapeType < 0.4) {
            width = baseSize * 2;
            height = baseSize * 2;
        } else if (shapeType < 0.7) {
            width = baseSize * 3.5;
            height = baseSize;
        } else {
            width = baseSize;
            height = baseSize * 3.5;
        }

        return {
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: width,
            height: height,
            duration: Math.random() * 3 + 2,
        };
    });

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {blocks.map((block) => (
                <motion.div
                    key={block.id}
                    className="absolute bg-white/90 shadow-[0_0_3px_white] rounded-none"
                    style={{
                        top: block.top,
                        left: block.left,
                        width: block.width,
                        height: block.height,
                    }}
                    animate={{
                        opacity: [0.1, 0.8, 0.1],
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{
                        duration: block.duration,
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.25, 0.5, 0.75, 1]
                    }}
                />
            ))}
        </div>
    );
};

export default function TonyStory() {
    const navigate = useNavigate();

    // ⭐ MOBILE DETECTION STATE
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    /* ===== VIDEO PLAYBACK LOGIC (Desktop Only) ===== */
    const videoRef = useRef(null);
    const isVideoInView = useInView(videoRef, { amount: 0.2 });

    useEffect(() => {
        if (!isMobile) {
            const video = videoRef.current;
            if (video) {
                if (isVideoInView) {
                    video.play().catch((error) => console.log("Video play interrupted:", error));
                } else {
                    video.pause();
                }
            }
        }
    }, [isVideoInView, isMobile]);

    useEffect(() => {
        const img = new Image();
        img.src = aboutHero;
    }, []);

    const handleExploreJourney = () => {
        navigate("/meet-tony");
    };

    /* ===== Page Animations ===== */
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

    /* ===== FUSED BUTTON LOGIC ===== */
    const btnContainerVariants = {
        rest: { gap: isMobile ? "6px" : "0px" },
        hover: { gap: "6px", transition: { duration: 0.4, ease: "backOut" } }
    };

    const btnLeftVariants = {
        rest: {
            width: isMobile ? "55%" : "100%",
            borderTopRightRadius: isMobile ? "0.25rem" : "0.75rem",
            borderBottomRightRadius: isMobile ? "0.25rem" : "0.75rem",
            backgroundColor: isMobile ? "rgba(155, 38, 182, 1)" : "rgba(74, 16, 90, 0.9)"
        },
        hover: {
            width: "55%",
            borderTopRightRadius: "0.25rem",
            borderBottomRightRadius: "0.25rem",
            backgroundColor: "rgba(155, 38, 182, 1)",
            transition: { duration: 0.4, ease: "easeInOut" }
        }
    };

    const btnRightVariants = {
        rest: {
            width: isMobile ? "45%" : "0%",
            opacity: isMobile ? 1 : 0,
            x: isMobile ? 0 : -10
        },
        hover: {
            width: "45%",
            opacity: 1,
            x: 0,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const contentRevealVariants = {
        rest: {
            opacity: isMobile ? 1 : 0,
            y: isMobile ? 0 : 10,
            filter: isMobile ? "blur(0px)" : "blur(5px)"
        },
        hover: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.3, delay: 0.15 }
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
        <>
            <section
                id="meet-tony"
                className="relative w-full min-h-[100dvh] md:min-h-[105vh] flex flex-col md:flex-row bg-[#0b080e] text-white overflow-hidden"
            >
                <style>
                    {`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`}
                </style>

                {/* --- SEAMLESS BLENDING MASKS --- */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0b080e] to-transparent z-40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0b080e] to-transparent z-40 pointer-events-none" />

                {/* ================= LEFT SIDE — THE MAN ================= */}
                {/* ⭐ UPDATED: 
                    - 'justify-start' moves content to top.
                    - 'pt-44' (mobile) / 'pt-48' (desktop) adds the ~5cm margin top.
                    - 'flex-grow' ensures it fills space to push the button container down naturally on mobile.
                */}
                <div className="relative w-full flex-grow md:flex-grow-0 md:w-[48%] flex flex-col justify-start px-6 md:px-12 lg:px-20 pt-44 md:pt-48 pb-10 z-10 overflow-hidden">

                    {/* BACKGROUND IMAGE LAYER */}
                    <div
                        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
                        style={{
                            maskImage: isMobile
                                ? "linear-gradient(to bottom, black 60%, transparent 100%)"
                                : "linear-gradient(to right, black 40%, transparent 100%)",
                            WebkitMaskImage: isMobile
                                ? "linear-gradient(to bottom, black 60%, transparent 100%)"
                                : "linear-gradient(to right, black 40%, transparent 100%)"
                        }}
                    >
                        <motion.div
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 2.2, ease: "easeOut" }}
                            className="absolute inset-0"
                        >
                            <img
                                src={aboutHero}
                                alt="Tony Thompson"
                                style={{ transform: "translateY(-0.5cm)", height: "calc(100% + 0.5cm)" }}
                                className="w-full h-full object-cover opacity-[0.9] object-top"
                            />
                            {/* Texture Overlays */}
                            <div className="absolute inset-0 bg-[#0b080e]/20 mix-blend-multiply" />
                            <div className="absolute inset-0 bg-[#4a105a]/20 mix-blend-soft-light" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b080e] via-[#0b080e]/40 to-transparent" />
                        </motion.div>
                    </div>

                    {/* TEXT CONTENT */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative z-20"
                    >
                        <MonoLabel icon={ScanLine}>The Origin Story</MonoLabel>

                        <motion.div variants={itemVariants}>
                            <h1 className="text-[clamp(3rem,6vw,5.6rem)] font-black leading-[0.9] drop-shadow-2xl">
                                ABOUT
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3d4ff] via-white to-[#f3d4ff]">
                                    TONY
                                </span>
                            </h1>
                            <div className="w-24 h-1 mt-6 bg-gradient-to-r from-[#9b26b6] to-transparent shadow-[0_0_15px_#9b26b6]" />
                        </motion.div>

                        <motion.p
                            variants={itemVariants}
                            className="text-[1rem] md:text-[1.25rem] leading-[1.7] font-light text-gray-100 mt-8 mb-8 max-w-lg drop-shadow-md"
                        >
                            Tony Thompson is a catalyst for transformation—merging
                            <span className="font-semibold text-white border-b border-[#9b26b6]"> purpose</span>,
                            <span className="font-semibold text-white border-b border-[#9b26b6]"> systems</span> and
                            <span className="font-semibold text-white border-b border-[#9b26b6]"> high-performance</span> into a blueprint built for momentum.
                        </motion.p>
                    </motion.div>
                </div>

                {/* ================= RIGHT SIDE (Button Area) ================= */}
                {/* ⭐ RESTORED: 
                    - 'items-end' and 'pb-12 md:pb-14' restores the ORIGINAL button position (bottom).
                    - No translation logic applied.
                */}
                <div className="relative w-full flex-none h-auto md:h-auto md:flex-1 overflow-hidden bg-[#0b080e] flex items-end justify-center pb-12 md:pb-14 pt-0">

                    {/* VIDEO: DESKTOP ONLY */}
                    {!isMobile && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0 z-0"
                            style={{
                                maskImage: "linear-gradient(to right, transparent 0%, black 60%)",
                                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 60%)"
                            }}
                        >
                            <video
                                ref={videoRef}
                                className="absolute inset-0 w-full h-full object-cover opacity-90 contrast-[1.1] brightness-[1.1] saturate-[1.15]"
                                loop
                                muted
                                playsInline
                                preload="auto"
                            >
                                <source src={tonyWinWEBM} type="video/webm" />
                                <source src={tonyWinMP4} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b080e] via-transparent to-[#0b080e]/10" />
                        </motion.div>
                    )}

                    {/* ⭐ FUSED BUTTON ⭐ */}
                    <motion.button
                        onClick={handleExploreJourney}
                        initial="rest"
                        whileHover="hover"
                        animate={isMobile ? "hover" : "rest"}
                        whileTap={{ scale: 0.98 }}
                        variants={btnContainerVariants}
                        className="relative group w-[90%] max-w-[340px] md:max-w-none md:w-[360px] h-[64px] md:h-[86px] flex items-stretch cursor-pointer z-30 perspective-1000 mx-auto md:mx-0"
                    >
                        {/* GLOW UNDERLAY */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#9b26b6] to-[#4a105a] rounded-xl opacity-20 blur-xl group-hover:opacity-50 transition duration-500" />

                        {/* --- LEFT SIDE --- */}
                        <motion.div
                            variants={btnLeftVariants}
                            className="relative h-full flex items-center justify-center overflow-hidden
                            border border-[#f0c9ff]/20
                            bg-gradient-to-br from-[#4a105a] via-[#2c0536] to-[#0b080e]
                            shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-20"
                            style={{ borderTopLeftRadius: "0.75rem", borderBottomLeftRadius: "0.75rem" }}
                        >
                            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 animate-[pulse_2s_infinite]" />

                            <span className="relative z-10 text-white font-['Press_Start_2P'] text-[12px] md:text-[14px] tracking-[0.2em] flex items-center gap-3 md:gap-4">
                                STEP
                                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-out text-[#f0c9ff] drop-shadow-[0_0_8px_#f0c9ff]" />
                            </span>
                        </motion.div>

                        {/* --- RIGHT SIDE (Tetris Universe) --- */}
                        <motion.div
                            variants={btnRightVariants}
                            className="relative h-full bg-black/90 backdrop-blur-xl flex items-center justify-center overflow-hidden
                            border border-[#f0c9ff]/30 shadow-inner"
                            style={{
                                borderTopRightRadius: "0.75rem",
                                borderBottomRightRadius: "0.75rem"
                            }}
                        >
                            <TetrisField />

                            <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none min-w-[100px] md:min-w-[140px]">
                                <motion.div variants={contentRevealVariants} className="flex flex-col items-center">
                                    <span className="text-gray-400 text-[7px] md:text-[8px] font-mono uppercase tracking-[0.2em] leading-none mb-1 md:mb-2 mt-1">
                                        Into His
                                    </span>
                                    <span className="text-[#e0aaff] text-[9px] md:text-[10px] font-['Press_Start_2P'] uppercase tracking-widest leading-none drop-shadow-[0_0_10px_rgba(224,170,255,0.8)]">
                                        UNIVERSE
                                    </span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.button>
                </div>
            </section>
        </>
    );
}