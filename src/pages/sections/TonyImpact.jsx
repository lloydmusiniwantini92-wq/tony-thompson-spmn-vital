// ✅ src/pages/sections/TonyImpact.jsx — Clean Montserrat Edition (No 2P Font)
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function TonyImpact() {
    const stats = [
        { label: "Speaking Engagements", value: 200, suffix: "+" },
        { label: "Professionals Reached Nationwide", value: 10000, suffix: "+" },
        { label: "Featured In", value: 4, suffix: "+" },
        { label: "Top Originators Coached", value: 1, suffix: "+" },
    ];

    return (
        <section
            id="impact"
            className="relative w-full min-h-screen flex flex-col justify-center items-center 
                bg-black text-white overflow-hidden"
        >
            {/* === Title === */}
            <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-[clamp(3rem,8vw,7rem)] font-extrabold text-center mb-6 tracking-tight 
                    text-white"
            >
                SEE THE IMPACT
            </motion.h2>

            {/* === Tagline === */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-gray-400 text-sm md:text-base text-center mb-16 font-light tracking-wide"
            >
                Tony’s reach continues to expand — empowering, equipping, and transforming lives.
            </motion.p>

            {/* === Stats Grid === */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-20 z-10">
                {stats.map((s, i) => (
                    <AnimatedStat key={i} value={s.value} label={s.label} suffix={s.suffix} delay={i * 0.3} />
                ))}
            </div>

            {/* === Descriptive Text Below Stats === */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
                className="max-w-3xl text-center text-gray-300 text-base md:text-lg mt-16 px-6 leading-relaxed"
            >
                <p className="mb-3">
                    Featured in <span className="text-white font-semibold">Scotsman Guide</span>,{" "}
                    <span className="text-white font-semibold">Housing Wire</span>,{" "}
                    <span className="text-white font-semibold">National Mortgage News</span>, and more.
                </p>
                <p>
                    Coaches top originators through his{" "}
                    <span className="text-[#9b26b6] font-semibold">Growth Platform</span>,
                    transforming leadership and performance across the nation.
                </p>
            </motion.div>
        </section>
    );
}

// === AnimatedStat Component ===
function AnimatedStat({ value, suffix, label, delay }) {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            scale: [1, 1.1, 1],
            opacity: [1, 0.9, 1],
            transition: { repeat: Infinity, duration: 2.8, delay },
        });
    }, [controls, delay]);

    const [displayValue, setDisplayValue] = React.useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        const duration = 1500;
        const stepTime = 20;
        const step = (end / (duration / stepTime)) * 1.05;

        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                start = end;
                clearInterval(timer);
            }
            setDisplayValue(Math.floor(start));
        }, stepTime);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay }}
            viewport={{ once: true }}
            className="text-center"
        >
            <motion.h3
                animate={controls}
                className="text-4xl md:text-5xl font-bold text-[#9b26b6] mb-2"
            >
                {displayValue.toLocaleString()}
                {suffix}
            </motion.h3>
            <p className="text-gray-300 text-base md:text-lg tracking-wide">{label}</p>
        </motion.div>
    );
}
