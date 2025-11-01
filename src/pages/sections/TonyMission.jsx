// ✅ src/components/sections/TonyMission.jsx — Clean Montserrat Edition (No 2P Font)
import React, { useState, useEffect, useRef } from "react";
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
    const [paused, setPaused] = useState(false);
    const intervalRef = useRef(null);

    // 🕰️ Slower looping (8 seconds per cycle)
    useEffect(() => {
        const startLoop = () => {
            intervalRef.current = setInterval(() => {
                if (!paused) {
                    setIndex((prev) => (prev + 1) % portals.length);
                }
            }, 8000);
        };
        startLoop();
        return () => clearInterval(intervalRef.current);
    }, [paused, portals.length]);

    return (
        <section
            id="mission"
            className="relative w-full min-h-screen flex flex-col justify-center items-center
            bg-black text-white overflow-hidden"
        >
            {/* === BACKGROUND === */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <img
                    src={missionBg}
                    alt="Tony Thompson Mission"
                    className="w-full h-full object-cover brightness-[0.85] contrast-[1.15] scale-[1.05]"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
            </motion.div>

            {/* === STATIC HEADER === */}
            <motion.h2
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.3, ease: [0.25, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="relative top-[-18vh]
                    text-[clamp(3rem,8vw,8rem)] font-extrabold text-white text-center
                    tracking-tight leading-[1] drop-shadow-[0_0_35px_rgba(0,0,0,0.6)]
                    font-sans z-[2]"
            >
                SET YOUR MISSION
            </motion.h2>

            {/* === DYNAMIC PORTAL TEXTS === */}
            <div
                className="relative z-[3] max-w-3xl text-center px-6 min-h-[280px] cursor-default select-none"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={`${index}-${portals[index].title}`}
                        initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -15, filter: "blur(6px)" }}
                        transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
                    >
                        <motion.h3
                            className="text-white text-[1.5rem] md:text-[2rem] font-semibold mb-4 
                            drop-shadow-[0_0_25px_rgba(0,0,0,0.6)] transition-all duration-300"
                        >
                            {portals[index].title}
                        </motion.h3>

                        <motion.p
                            className="text-gray-300 text-base md:text-lg leading-relaxed font-light tracking-wide"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            {portals[index].text}
                        </motion.p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* === FLOOR GRADIENT === */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[20vh]
                bg-gradient-to-t from-black via-black/40 to-transparent z-[1]"
            />
        </section>
    );
}
