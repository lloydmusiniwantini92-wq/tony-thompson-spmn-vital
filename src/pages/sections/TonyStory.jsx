// ⭐ TonyStory.jsx — Cinematic Universe Entry Hero

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Hash, ScanLine, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import aboutHero from "../../assets/images/AboutHero.png";
import tonyWinMP4 from "../../assets/videos/tonywin_optimized.mp4";
import tonyWinWEBM from "../../assets/videos/tonywin_optimized.webm";

/* --- Sub-component: The Tetris Block Effect (Formerly Starfield) --- */
const TetrisField = () => {
    // Generate random blocks with varying aspect ratios to look like tiny Tetris pieces (squares and lines)
    const blocks = Array.from({ length: 18 }).map((_, i) => {
        const baseSize = Math.random() * 1.5 + 1; // Base unit size roughly 1px-2.5px
        const shapeType = Math.random();
        let width, height;

        if (shapeType < 0.4) {
            // Square block (like O-piece)
            width = baseSize * 2;
            height = baseSize * 2;
        } else if (shapeType < 0.7) {
            // Horizontal line block (like I-piece)
            width = baseSize * 3.5;
            height = baseSize;
        } else {
            // Vertical line block (like I-piece)
            width = baseSize;
            height = baseSize * 3.5;
        }

        return {
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: width,
            height: height,
            duration: Math.random() * 3 + 2, // Slightly slower duration for blocks
        };
    });

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {blocks.map((block) => (
                <motion.div
                    key={block.id}
                    // UPDATED: Removed rounded-full to make them sharp blocks
                    className="absolute bg-white/90 shadow-[0_0_3px_white] rounded-none"
                    style={{
                        top: block.top,
                        left: block.left,
                        width: block.width,
                        height: block.height,
                    }}
                    // UPDATED Animation: Added slight rotation for Tetris feel
                    animate={{
                        opacity: [0.1, 0.8, 0.1],
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 180, 270, 360] // Slow rotation
                    }}
                    transition={{
                        duration: block.duration,
                        repeat: Infinity,
                        ease: "linear", // Linear ease for rotation
                        times: [0, 0.25, 0.5, 0.75, 1]
                    }}
                />
            ))}
        </div>
    );
};

export default function TonyStory() {
    const navigate = useNavigate();

    /* ===== VIDEO PLAYBACK LOGIC ===== */
    const videoRef = useRef(null);
    const isVideoInView = useInView(videoRef, { amount: 0.2 });

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            if (isVideoInView) {
                video.play().catch((error) => console.log("Video play interrupted:", error));
            } else {
                video.pause();
            }
        }
    }, [isVideoInView]);

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
        rest: { gap: "0px" },
        hover: { gap: "6px", transition: { duration: 0.4, ease: "backOut" } }
    };

    const btnLeftVariants = {
        rest: {
            width: "100%",
            borderTopRightRadius: "0.75rem",
            borderBottomRightRadius: "0.75rem",
            backgroundColor: "rgba(74, 16, 90, 0.9)"
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
        rest: { width: "0%", opacity: 0, x: -10 },
        hover: {
            width: "45%",
            opacity: 1,
            x: 0,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const contentRevealVariants = {
        rest: { opacity: 0, y: 10, filter: "blur(5px)" },
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
                className="relative w-full min-h-[105vh] flex flex-col md:flex-row bg-[#0b080e] text-white overflow-hidden"
            >
                <style>
                    {`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`}
                </style>

                {/* --- SEAMLESS BLENDING MASKS (SUBTLE) --- */}
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#0b080e]/60 to-transparent z-40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0b080e]/60 to-transparent z-40 pointer-events-none" />

                {/* LEFT SIDE — THE MAN */}
                <div className="relative w-full md:w-[48%] flex flex-col justify-end md:justify-center px-8 md:px-12 lg:px-20 py-24 z-10 border-r border-white/5 overflow-hidden">
                    {/* BACKGROUND IMAGE */}
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
                                style={{ transform: "translateY(-0.5cm)", height: "calc(100% + 0.5cm)" }}
                                className="w-full object-cover opacity-[0.9] object-top"
                            />
                            <div className="absolute inset-0 bg-[#0b080e]/20 mix-blend-multiply" />
                            <div className="absolute inset-0 bg-[#4a105a]/20 mix-blend-soft-light" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b080e] via-[#0b080e]/40 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0b080e]/95 via-[#0b080e]/40 to-transparent" />
                        </motion.div>
                    </div>

                    {/* TEXT */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative z-20"
                    >
                        <MonoLabel icon={ScanLine}>The Origin Story</MonoLabel>

                        <motion.div variants={itemVariants}>
                            <h1 className="text-[clamp(3.5rem,6vw,5.6rem)] font-black leading-[0.9] drop-shadow-2xl">
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
                            className="text-[1.1rem] md:text-[1.25rem] leading-[1.7] font-light text-gray-100 mt-8 mb-8 max-w-lg drop-shadow-md"
                        >
                            Tony Thompson is a catalyst for transformation—merging
                            <span className="font-semibold text-white border-b border-[#9b26b6]"> purpose</span>,
                            <span className="font-semibold text-white border-b border-[#9b26b6]"> systems</span> and
                            <span className="font-semibold text-white border-b border-[#9b26b6]"> high-performance</span> into a blueprint built for momentum.
                        </motion.p>
                    </motion.div>
                </div>

                {/* RIGHT SIDE — THE UNIVERSE */}
                <div className="relative flex-1 overflow-hidden bg-[#0f0b13] flex items-end justify-center pb-10 md:pb-14">

                    {/* VIDEO BACKGROUND */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 z-0"
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
                        <div className="absolute inset-0 bg-gradient-to-l from-[#0b080e] to-transparent" />
                    </motion.div>

                    {/* ⭐ FUSED BUTTON ⭐ */}
                    <motion.button
                        onClick={handleExploreJourney}
                        initial="rest"
                        whileHover="hover"
                        whileTap={{ scale: 0.98 }}
                        variants={btnContainerVariants}
                        className="relative group w-[360px] h-[86px] flex items-stretch cursor-pointer z-30 perspective-1000"
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

                            <span className="relative z-10 text-white font-['Press_Start_2P'] text-[14px] tracking-[0.2em] flex items-center gap-4">
                                STEP
                                <ArrowRight className="h-5 w-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-out text-[#f0c9ff] drop-shadow-[0_0_8px_#f0c9ff]" />
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
                            {/* UPDATED: Uses TetrisField instead of Starfield */}
                            <TetrisField />

                            <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none min-w-[140px]">
                                <motion.div variants={contentRevealVariants} className="flex flex-col items-center">
                                    <span className="text-gray-400 text-[8px] font-mono uppercase tracking-[0.2em] leading-none mb-2 mt-1">
                                        Into His
                                    </span>
                                    <span className="text-[#e0aaff] text-[10px] font-['Press_Start_2P'] uppercase tracking-widest leading-none drop-shadow-[0_0_10px_rgba(224,170,255,0.8)]">
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