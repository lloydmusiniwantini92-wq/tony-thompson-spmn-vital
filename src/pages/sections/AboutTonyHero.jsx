// FULL FILE — WITH INSANE SHATTER BUTTON INSERTED

import React, { useEffect } from "react";
import { motion } from "framer-motion";

import aboutHero from "../../assets/images/AboutHero.png";
import tonyWinMP4 from "../../assets/videos/tonywin_optimized.mp4";
import tonyWinWEBM from "../../assets/videos/tonywin_optimized.webm";

export default function AboutTonyHero() {
    useEffect(() => {
        const img = new Image();
        img.src = aboutHero;
    }, []);

    const handleExploreJourney = () => {
        const fog = typeof window !== 'undefined' ? window.triggerGlobalFog : null;
        const lenis = typeof window !== 'undefined' ? window.lenis : null;
        const target = typeof document !== 'undefined' ? document.querySelector("#tony-journey") : null;

        if (typeof fog === "function") {
            fog(() => {
                if (target) {
                    if (lenis) lenis.scrollTo(target, { duration: 1.4, offset: -40 });
                    else target.scrollIntoView({ behavior: "smooth" });
                }
            });
        } else if (target) {
            if (lenis) lenis.scrollTo(target, { duration: 1.4, offset: -40 });
            else target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="about-tony-hero"
            className="relative w-full min-h-screen flex flex-col md:flex-row bg-[#050008] text-white overflow-hidden"
            style={{
                contain: "layout paint",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
            }}
        >
            {/* Import Font */}
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`}
            </style>

            {/* LEFT SIDE */}
            <div className="relative w-full md:w-1/3 flex flex-col justify-center items-center px-10 md:px-14 py-20 text-center z-10 overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-br from-[#2a0530] via-[#4a105e] to-[#000] animate-pulse-slow z-0" />

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className="space-y-8 max-w-[460px] relative z-10"
                >
                    <h1 className="relative text-[clamp(2.4rem,5.5vw,5rem)] font-extrabold tracking-tight leading-[1.05] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-[#e0aaff] drop-shadow-[0_0_15px_rgba(155,38,182,0.6)]">
                        ABOUT <span className="text-white font-black relative inline-block hover:animate-glitch-text cursor-default">TONY</span>
                    </h1>

                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff00ff] to-transparent opacity-50" />

                    <p className="text-[1.15rem] md:text-[1.25rem] leading-[1.8] font-medium text-white/90 italic drop-shadow-md">
                        A visionary leader helping organizations and professionals unlock
                        growth through{" "}
                        <span className="text-[#ff00ea] font-bold not-italic drop-shadow-[0_0_8px_rgba(255,0,234,0.6)]">purpose</span>,{" "}
                        <span className="text-[#00eaff] font-bold not-italic drop-shadow-[0_0_8px_rgba(0,234,255,0.6)]">systems</span>, and{" "}
                        <span className="text-[#e0aaff] font-bold not-italic drop-shadow-[0_0_8px_rgba(224,170,255,0.6)]">performance</span>.
                    </p>

                    <p className="text-[1rem] leading-[1.7] text-white/70 font-light mix-blend-screen">
                        Tony’s work inspires transformation — blending clarity of vision
                        with disciplined execution. He challenges leaders to not just
                        succeed, but to redefine what success means.
                    </p>
                </motion.div>

                <motion.img
                    src={aboutHero}
                    alt="Tony Thompson Abstract"
                    className="absolute inset-0 object-cover w-full h-full pointer-events-none mix-blend-overlay opacity-20"
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.2, rotate: [0, 5, -5, 0] }}
                    transition={{
                        scale: { duration: 2.2, ease: "easeOut" },
                        rotate: { duration: 20, repeat: Infinity, ease: "easeInOut" }
                    }}
                />
            </div>

            {/* RIGHT SIDE */}
            <div className="relative w-full md:w-2/3 h-[60vh] md:h-auto overflow-hidden flex items-end justify-center bg-black perspective-[2000px]">

                {/* Real video restored */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    initial={{ filter: "blur(10px) brightness(0)" }}
                    animate={{ filter: "blur(0px) brightness(1)" }}
                    transition={{ duration: 1.5 }}
                >
                    <video
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                        autoPlay loop muted playsInline preload="auto"
                        poster={aboutHero}
                    >
                        <source src={tonyWinWEBM} type="video/webm" />
                        <source src={tonyWinMP4} type="video/mp4" />
                    </video>

                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[size:100%_2px,3px_100%] pointer-events-none" />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

                {/* =========================== */}
                {/* ⭐⭐⭐ FULL INSANE BUTTON ⭐⭐⭐ */}
                {/* =========================== */}

                <motion.div
                    initial={{ opacity: 0, y: 50, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1.3, type: "spring", bounce: 0.4, delay: 0.4 }}
                    className="relative z-30 mb-20 transform-style-3d"
                >

                    {/* ---- START OF FULL BUTTON A ---- */}

                    <button
                        onClick={handleExploreJourney}
                        className="
                            relative group
                            w-[260px] h-[68px] 
                            flex 
                            bg-transparent
                            cursor-pointer
                            isolate
                            transform-style-3d
                        "
                        aria-label="Step into his universe"
                    >
                        {/* IMPACT SHOCKWAVE */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] pointer-events-none z-50">
                            <div className="w-full h-full rounded-full border-[4px] border-white/80 opacity-0 group-hover:animate-shockwave-ring" />
                        </div>

                        {/* FLASH */}
                        <div className="absolute inset-0 z-50 pointer-events-none mix-blend-overlay">
                            <div className="w-full h-full bg-white/50 opacity-0 group-hover:animate-impact-flash" />
                        </div>

                        {/* LEFT HALF */}
                        <div className="
                            relative z-20
                            w-[50%] h-full 
                            rounded-l-2xl
                            bg-gradient-to-br from-[#952ca8] via-[#601573] to-[#3a0a45]
                            flex items-center justify-center
                            origin-right
                            transition-all duration-100
                            group-hover:animate-shatter-left-extreme
                            shadow-[inset_0_2px_15px_rgba(255,255,255,0.2),0_0_20px_rgba(155,38,182,0.4)]
                            border-l border-t border-b border-[#e6afff]/40
                        ">
                            <span className="
                                relative
                                text-white font-['Press_Start_2P'] text-[14px] tracking-widest drop-shadow-md
                                group-hover:animate-glitch-text-shatter
                                z-20
                            ">
                                STEP
                                <span className="absolute inset-0 text-[#ff00ea] opacity-0 group-hover:animate-rgb-shift-red-extreme mix-blend-screen">STEP</span>
                                <span className="absolute inset-0 text-[#00eaff] opacity-0 group-hover:animate-rgb-shift-blue-extreme mix-blend-screen">STEP</span>
                            </span>

                            <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-[#2a0530] border-l border-[#ff00ea]/30 group-hover:animate-latch-unlock" />
                        </div>

                        {/* DEBRIS / ARCS */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-0 flex justify-center items-center z-0 pointer-events-none overflow-visible">
                            <div className="absolute w-[100px] h-[2px] bg-[#ff00ff] blur-[4px] opacity-0 group-hover:animate-arc-explode" />
                            <div className="absolute w-[80px] h-[1px] bg-white blur-[1px] opacity-0 group-hover:animate-arc-explode delay-75" />

                            <div className="absolute w-2 h-2 bg-white/80 rounded-full top-[-10px] opacity-0 group-hover:animate-shard-fly-1" />
                            <div className="absolute w-1 h-3 bg-[#00ffff]/80 bottom-[-15px] opacity-0 group-hover:animate-shard-fly-2" />
                            <div className="absolute w-2 h-1 bg-[#ff00ea]/80 top-[50%] opacity-0 group-hover:animate-shard-fly-3" />
                        </div>

                        {/* RIGHT HALF */}
                        <div className="
                            relative z-10
                            w-[50%] h-full 
                            rounded-r-2xl
                            bg-[#050008]
                            overflow-hidden
                            origin-left
                            border-r border-t border-b border-[#a838c2]/50
                            group-hover:animate-shatter-right-extreme
                            shadow-[0_0_0_1px_rgba(0,0,0,1)]
                        ">
                            <div className="absolute inset-0 bg-black/50" />

                            <div className="
                                absolute inset-0 
                                opacity-0 group-hover:opacity-100
                                transition-none
                                group-hover:animate-system-boot
                            ">
                                <div className="absolute inset-0 tetris-grid opacity-80" />
                                <div className="absolute inset-0 tetris-blocks mix-blend-screen opacity-100" />
                                <div className="absolute inset-0 tetris-scanline pointer-events-none" />

                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="
                                        relative
                                        text-white font-['Press_Start_2P'] text-[9px] leading-[1.4] text-center
                                        opacity-0 
                                        group-hover:opacity-100
                                        group-hover:animate-text-assembly
                                        drop-shadow-[0_2px_0_rgba(0,0,0,1)]
                                        px-1
                                        w-full
                                    ">
                                        <span className="text-[#e0aaff] tracking-wide">INTO HIS</span><br />
                                        <span className="text-[#ffffff] drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] tracking-widest">UNIVERSE</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </button>

                    {/* ---- END OF BUTTON A ---- */}
                </motion.div>
            </div>

            {/* =================== */}
            {/* FULL CSS ANIMATIONS */}
            {/* =================== */}
            <style>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.8; background-size: 100% 100%; }
                    50% { opacity: 1; background-size: 120% 120%; }
                }
                .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }

                @keyframes glitch-text {
                    0% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); color: #ff00ff; }
                    40% { transform: translate(-2px, -2px); color: #00ffff; }
                    60% { transform: translate(2px, 2px); color: #ff00ff; }
                    80% { transform: translate(2px, -2px); color: #00ffff; }
                    100% { transform: translate(0); }
                }

                /* BUTTON ANIMATIONS */
                @keyframes shatter-left-extreme {
                    0% { transform: translateX(0); }
                    10% { transform: translateX(5px); }
                    35% { transform: translateX(-45px) rotateY(-15deg); }
                    45% { transform: translateX(-45px) rotateY(-15deg); }
                    55% { transform: translateX(12px) skewX(10deg); }
                    65% { transform: translateX(-4px) skewX(-5deg); }
                    75% { transform: translateX(2px); }
                    100% { transform: translateX(0); }
                }

                @keyframes shatter-right-extreme {
                    0% { transform: translateX(0); filter: brightness(0.5); border-color: #555; }
                    10% { transform: translateX(-5px); }
                    35% { transform: translateX(45px) rotateY(15deg); filter: brightness(1.5); border-color: #fff; box-shadow: 0 0 30px #a838c2; }
                    45% { transform: translateX(45px) rotateY(15deg); }
                    55% { transform: translateX(-12px) skewX(-10deg); filter: brightness(1); }
                    65% { transform: translateX(4px) skewX(5deg); }
                    75% { transform: translateX(-2px); }
                    100% { transform: translateX(0); border-color: #a838c2; box-shadow: 0 0 15px #a838c2; }
                }

                /* SHOCKWAVE */
                @keyframes shockwave-ring {
                    0%, 50% { transform: scale(0.5); opacity: 0; border-width: 10px; }
                    55% { opacity: 1; border-width: 4px; }
                    70% { transform: scale(2.5); opacity: 0; border-width: 0px; }
                }

                @keyframes impact-flash {
                    0%, 52% { opacity: 0; }
                    55% { opacity: 0.9; }
                    70% { opacity: 0; }
                }

                @keyframes arc-explode {
                    0%, 30% { opacity: 0; width: 10px; }
                    35% { opacity: 1; width: 120px; }
                    50% { opacity: 0; width: 10px; }
                }

                @keyframes shard-fly-1 {
                    0%, 30% { opacity: 0; transform: translate(0,0) rotate(0deg); }
                    35% { opacity: 1; transform: translate(-20px, -30px) rotate(90deg); }
                    60% { opacity: 0; transform: translate(-30px, -50px) rotate(180deg); }
                }

                @keyframes shard-fly-2 {
                    0%, 30% { opacity: 0; transform: translate(0,0); }
                    35% { opacity: 1; transform: translate(15px, 35px) rotate(-45deg); }
                    60% { opacity: 0; transform: translate(25px, 55px) rotate(-90deg); }
                }

                @keyframes shard-fly-3 {
                    0%, 30% { opacity: 0; transform: translate(0,0); }
                    35% { opacity: 1; transform: translate(0px, -10px) scale(1.5); }
                    60% { opacity: 0; transform: translate(0px, 0px) scale(0); }
                }

                @keyframes text-assembly {
                    0%, 50% { opacity: 0; letter-spacing: 10px; filter: blur(5px); }
                    55% { opacity: 1; letter-spacing: 0px; filter: blur(0px); transform: scale(1.1); }
                    60% { transform: scale(1); }
                }

                @keyframes system-boot {
                    0%, 35% { opacity: 0; background-color: #000; }
                    40% { opacity: 1; background-color: #1a0520; }
                    55% { background-color: #000; }
                    100% { opacity: 1; }
                }

                .tetris-grid {
                    background-size: 24px 24px;
                    background-image:
                        linear-gradient(to right, rgba(180, 50, 255, 0.2) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(180, 50, 255, 0.2) 1px, transparent 1px);
                    transform: perspective(120px) rotateX(30deg) translateY(-10px);
                    animation: gridScroll 2s linear infinite;
                }
                @keyframes gridScroll {
                    0% { background-position: 0 0; }
                    100% { background-position: 0 24px; }
                }

                .tetris-blocks {
                    background-image: 
                        linear-gradient(transparent 92%, rgba(200,80,255,0.8) 100%),
                        radial-gradient(square, rgba(255,255,255,0.9) 2px, transparent 0);
                    background-size: 30px 60px, 40px 40px;
                    animation: blockFall 1.5s linear infinite;
                }
                @keyframes blockFall {
                    0% { background-position: 0 -100%; }
                    100% { background-position: 0 100%; }
                }

                .tetris-scanline {
                    background: linear-gradient(
                        to bottom,
                        transparent,
                        rgba(255, 255, 255, 0.8) 5%,
                        rgba(155, 38, 182, 0.5) 10%,
                        transparent 15%
                    );
                    height: 250%;
                    width: 100%;
                    animation: scanlineSweep 2s ease-in-out infinite;
                }
                @keyframes scanlineSweep {
                    0% { transform: translateY(-80%); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translateY(20%); opacity: 0; }
                }
            `}</style>
        </section>
    );
}
