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

    return (
        <section
            id="about-tony-hero"
            className="relative w-full min-h-screen flex flex-col md:flex-row bg-black text-white overflow-hidden"
            style={{
                contain: "layout paint",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
            }}
        >
            {/* LEFT SIDE */}
            <div className="relative w-full md:w-1/3 flex flex-col justify-center items-center bg-gradient-to-b from-[#9b26b6]/85 via-[#9b26b6]/70 to-[#b14fc0]/85 px-10 md:px-14 py-20 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="space-y-8 max-w-[460px]"
                >
                    <h1 className="text-[clamp(2.4rem,5.5vw,5rem)] font-extrabold tracking-tight leading-[1.05] uppercase text-white">
                        ABOUT <span className="text-white font-black">TONY</span>
                    </h1>

                    <p className="text-[1.15rem] md:text-[1.25rem] leading-[1.8] font-medium text-white/90 italic">
                        A visionary leader helping organizations and professionals unlock
                        growth through{" "}
                        <span className="font-semibold not-italic">purpose</span>,{" "}
                        <span className="font-semibold not-italic">systems</span>, and{" "}
                        <span className="font-semibold not-italic">performance</span>.
                    </p>

                    <p className="text-[1rem] leading-[1.7] text-white/85 font-light">
                        Tony’s work inspires transformation — blending clarity of vision
                        with disciplined execution. He challenges leaders to not just
                        succeed, but to redefine what success means.
                    </p>
                </motion.div>

                <motion.img
                    src={aboutHero}
                    alt="Tony Thompson Abstract"
                    className="absolute inset-0 object-cover opacity-10 w-full h-full pointer-events-none"
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.1 }}
                    transition={{ duration: 2.2, ease: "easeOut" }}
                />
            </div>

            {/* RIGHT SIDE */}
            <div className="relative w-full md:w-2/3 h-[60vh] md:h-auto overflow-hidden flex items-end justify-center">
                <motion.video
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster={aboutHero}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                >
                    <source src={tonyWinWEBM} type="video/webm" />
                    <source src={tonyWinMP4} type="video/mp4" />
                </motion.video>

                <div className="absolute inset-0 bg-gradient-to-l from-black/45 via-black/25 to-transparent" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.3, ease: "easeOut", delay: 0.4 }}
                    className="relative z-10 mb-14"
                >
                    <button
                        onClick={() => {
                            const next = document.querySelector("#tony-journey");
                            if (next) next.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="relative flex justify-center items-center w-[190px] h-[62px]
              text-white font-['Press_Start_2P'] text-[0.9rem] cursor-pointer group
              bg-gradient-to-br from-[#b14fc0]/85 to-[#9b26b6]/70
              rounded-[12px]
              border border-white/20
              shadow-[0_10px_25px_rgba(177,79,192,0.7),inset_0_2px_6px_rgba(255,255,255,0.3)]
              transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.3,1)]
              hover:translate-y-[-4px]
              hover:shadow-[0_14px_35px_rgba(177,79,192,0.85),inset_0_2px_10px_rgba(255,255,255,0.4)]
              uppercase tracking-widest overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulseGlow rounded-[12px]" />
                        <span className="relative z-10 transition-all duration-500 group-hover:opacity-0">
                            EXPLORE
                        </span>
                        <span className="absolute z-10 opacity-0 transition-all duration-500 group-hover:opacity-100">
                            JOURNEY
                        </span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
