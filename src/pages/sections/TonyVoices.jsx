// ✅ src/pages/sections/TonyVoices.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TonyPartners from "./TonyPartners";


// Base path
const BASE = "/tony-thompson-spmn-vital";

// --- Type 7 Components ---

// 1. Atmospheric Noise Texture
const NoiseOverlay = () => (
    <div className="absolute inset-0 pointer-events-none z-[5] opacity-[0.03] mix-blend-overlay">
        <svg className="w-full h-full">
            <filter id="noise">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.8"
                    numOctaves="3"
                    stitchTiles="stitch"
                />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
    </div>
);

// 2. Floating Ambient Energy Orbs
const AmbientOrb = ({ color, top, left, delay }) => (
    <motion.div
        initial={{ scale: 0.8, opacity: 0.4 }}
        animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 90, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: delay }}
        className={`absolute w-[800px] h-[800px] rounded-full blur-[150px] mix-blend-multiply pointer-events-none z-0 ${color}`}
        style={{ top, left }}
    />
);

export default function TonyVoices() {
    const containerRef = useRef(null);

    // Scroll physics for parallax
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const yHeading = useTransform(scrollYProgress, [0, 0.5], ["50px", "-50px"]);
    const opacityHeading = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // === FINAL TESTIMONIALS (Client-correct copy) ===
    const testimonials = [
        {
            img: `${BASE}/assets/images/Fratantoni.jpg`,
            quote: `“WHEN TONY SPEAKS, HE DOESN’T JUST DELIVER A MESSAGE—HE MOVES PEOPLE.”`,
            author: "MICHAEL FRATANTONI, PH.D, CHIEF ECONOMIST, SVP, MBA",
            align: "left",
        },
        {
            img: `${BASE}/assets/images/LINDSI.jpeg`,
            quote: `“TONY IS ONE OF THE MOST POWERFUL AND ENGAGING SPEAKERS IN THE INDUSTRY.”`,
            author: "LINDSI FLYNN, CMO, US MORTGAGE CORPORATION",
            align: "right",
        },
    ];

    return (
        <section
            ref={containerRef}
            id="tony-voices"
            className="relative w-full min-h-[140vh] bg-white text-black overflow-hidden flex flex-col items-center py-32"
        >
            {/* === LAYER 0: Atmospheric FX === */}
            <NoiseOverlay />
            <motion.div style={{ y: yBackground }} className="absolute inset-0 w-full h-full">
                <AmbientOrb color="bg-[#f3e6f5]" top="-20%" left="-10%" delay={0} />
                <AmbientOrb color="bg-[#eaddf0]" top="40%" left="60%" delay={2} />
            </motion.div>

            {/* === LAYER 1: Content === */}
            <div className="relative z-10 w-full px-6">
                {/* PARTNERS SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full mb-32"
                >
                    <TonyPartners />
                </motion.div>

                {/* TYPE 7 HEADER */}
                <div className="relative w-full flex justify-center items-center mb-40">
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: 150 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="absolute top-[-100px] w-[1px] bg-gradient-to-b from-transparent via-[#7d1f97] to-transparent"
                    />

                    <motion.h1
                        style={{ y: yHeading, opacity: opacityHeading }}
                        className="text-center text-[clamp(3.5rem,9vw,10rem)] font-black uppercase tracking-tighter leading-[0.85]"
                    >
                        <span className="block bg-gradient-to-b from-[#7d1f97] to-[#2a0a33] text-transparent bg-clip-text mix-blend-hard-light drop-shadow-2xl">
                            HEAR THE
                        </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#7d1f97] via-[#b04cc9] to-[#7d1f97] opacity-80">
                            VOICES
                        </span>
                    </motion.h1>
                </div>

                {/* TESTIMONIAL CARDS */}
                <div className="max-w-7xl mx-auto space-y-40">
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={i} data={t} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// === TESTIMONIAL CARD ===
function TestimonialCard({ data, index }) {
    const cardRef = useRef(null);
    const isEven = index % 2 === 0;

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });

    const yImage = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
    const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.9, 1, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={cardRef}
            style={{ opacity, scale }}
            className={`flex flex-col md:flex-row ${isEven ? "" : "md:flex-row-reverse"
                } items-center gap-12 md:gap-24 relative`}
        >
            {/* Connector Line */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[120vw] h-[1px] bg-gradient-to-r from-transparent via-[#7d1f97]/20 to-transparent -z-10" />

            {/* Avatar */}
            <div className="relative group">
                <motion.div
                    style={{ y: yImage }}
                    className="relative z-10 w-48 h-48 md:w-64 md:h-64"
                >
                    <div className="absolute inset-[-20px] rounded-full border border-[#7d1f97]/30 border-dashed animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-[-10px] rounded-full border border-[#7d1f97]/20 animate-[spin_15s_linear_infinite_reverse]" />

                    <img
                        src={data.img}
                        alt={data.author}
                        className="w-full h-full object-cover rounded-full shadow-[0_20px_50px_rgba(125,31,151,0.3)] grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                </motion.div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#7d1f97] blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
            </div>

            {/* Quote */}
            <motion.div
                style={{ y: yText }}
                className="flex-1 text-center md:text-left relative"
            >
                <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.2] text-[#1a1a1a] tracking-tight mb-8">
                    <span className="absolute -top-12 left-0 text-[#7d1f97]/10 text-[8rem] font-serif select-none">
                        &ldquo;
                    </span>

                    <span className="relative z-10">{data.quote}</span>
                </h3>

                <div
                    className={`flex flex-col ${isEven ? "md:items-start" : "md:items-end"
                        } items-center gap-2`}
                >
                    <div className="h-[2px] w-12 bg-[#7d1f97]" />
                    <p className="text-sm md:text-base font-bold tracking-[0.2em] text-[#7d1f97] uppercase">
                        {data.author}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}
