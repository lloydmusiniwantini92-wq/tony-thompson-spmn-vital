import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import missionBg from "../../assets/images/mission.jpg";

export default function TonyMission() {
    const portals = [
        {
            title: "Lead. Influence. Leave Your Mark.",
            text: "Tony’s mission is to help professionals in real estate and finance sharpen their skills, amplify their influence, and build legacies that outlast any single move. Every action is a block placed toward a bigger picture.",
        },
        {
            title: "Vision Into Motion.",
            text: "Success isn’t accidental — it’s built through rhythm, structure, and heart. Tony’s approach transforms ambition into architecture that lasts decades beyond trends.",
        },
        {
            title: "Purpose Before Profit.",
            text: "Greatness begins when leaders choose purpose over applause. Tony’s work empowers visionaries to create impact that outlives transactions.",
        },
        {
            title: "Master The Invisible.",
            text: "The unseen habits define legacy. Tony helps leaders engineer the quiet systems behind public success — mindset, clarity, and follow-through.",
        },
        {
            title: "Systems That Serve Humanity.",
            text: "Innovation isn’t about disruption — it’s about design. Tony crafts frameworks that merge empathy with precision, helping people and organizations grow together.",
        },
        {
            title: "From Dream To Design.",
            text: "Ideas fade unless anchored in structure. Tony bridges inspiration and execution — transforming passion into progress that compounds over time.",
        },
    ];

    const [index, setIndex] = useState(0);

    const DURATION = 9000;

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % portals.length);
        }, DURATION);
        return () => clearInterval(timer);
    }, [portals.length]);

    const industrialEase = [0.25, 1, 0.5, 1];

    return (
        <section
            id="mission"
            className="relative w-full h-screen flex flex-col justify-end pb-32 items-center bg-black text-white overflow-hidden"
        >
            {/* === LAYER 0: CINEMATIC PLATE + HEAVY FADE === */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    className="w-full h-full"
                >
                    <img
                        src={missionBg}
                        alt="Tony Thompson Mission"
                        className="w-full h-full object-cover brightness-[0.8]"
                    />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
            </div>

            {/* === LAYER 1: STATIC "HUD" ELEMENTS — NOW CENTER-TOP === */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30 opacity-70">
                <div className="w-2 h-2 bg-[#7d1f97] rounded-full animate-pulse" />
                <span className="font-mono text-xs tracking-[0.3em] uppercase">
                    Mission // The Turning Point
                </span>
            </div>

            {/* === LAYER 2: INDUSTRIAL KINETIC TYPOGRAPHY === */}
            <div className="relative z-20 w-full max-w-[90%] md:max-w-6xl mx-auto px-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        className="flex flex-col items-start"
                    >
                        <div className="overflow-hidden">
                            <motion.h2
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                exit={{ y: "-100%", opacity: 0 }}
                                transition={{ duration: 0.8, ease: industrialEase }}
                                className="text-[clamp(3rem,8vw,7rem)] font-black uppercase tracking-tighter leading-[0.9] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 drop-shadow-2xl"
                            >
                                {portals[index].title}
                            </motion.h2>
                        </div>

                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "120px", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: industrialEase }}
                            className="h-[4px] bg-[#7d1f97] mb-8 shadow-[0_0_20px_#7d1f97]"
                        />

                        <div className="overflow-hidden max-w-3xl">
                            <motion.p
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -40, opacity: 0 }}
                                transition={{ duration: 0.8, delay: 0.1, ease: industrialEase }}
                                className="text-lg md:text-2xl text-gray-300 font-medium leading-relaxed"
                            >
                                {portals[index].text}
                            </motion.p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* === LAYER 3: TELEMETRY PROGRESS BAR === */}
            <div className="absolute bottom-12 left-0 w-full px-6 md:px-20 z-30">
                <div className="flex items-end gap-6">
                    <div className="text-5xl font-black text-white/20 tabular-nums tracking-tighter leading-none">
                        0{index + 1}
                    </div>

                    <div className="flex-1 h-[2px] bg-white/10 relative mb-2 flex items-center gap-1">
                        {portals.map((_, i) => (
                            <div
                                key={i}
                                className={`h-[4px] flex-1 transition-all duration-500 ${i < index ? "bg-white/30" : "bg-transparent"
                                    }`}
                            />
                        ))}

                        <motion.div
                            key={index}
                            className="absolute h-[4px] bg-[#7d1f97] shadow-[0_0_15px_#7d1f97] z-10"
                            style={{ left: `${(index / portals.length) * 100}%` }}
                            initial={{ width: "0%" }}
                            animate={{ width: `${(1 / portals.length) * 100}%` }}
                            transition={{ duration: DURATION / 1000, ease: "linear" }}
                        />
                    </div>

                    <div className="text-xl font-bold text-white/20 tabular-nums leading-none mb-1">
                        / 0{portals.length}
                    </div>
                </div>
            </div>
        </section>
    );
}
