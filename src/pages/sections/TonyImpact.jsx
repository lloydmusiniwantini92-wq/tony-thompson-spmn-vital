import React, { useRef, useEffect, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
    useMotionValue,
    useMotionTemplate
} from "framer-motion";

// --- UTILS ---
function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

export default function TonyImpact() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const stats = [
        { label: "Featured Publications", value: 45, suffix: "+" },
        { label: "Professionals Reached Nationwide", value: 10000, suffix: "+" },
        { label: "Scotsman Guide Originators Coached", value: 3, suffix: "+" },
        { label: "Speaking Engagements", value: 200, suffix: "+" },
    ];

    const yHeading = useParallax(scrollYProgress, 100);
    const yContent = useParallax(scrollYProgress, -50);

    return (
        <section
            id="impact"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full min-h-[130vh] bg-black text-white flex flex-col justify-center items-center overflow-hidden py-32 group"
        >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

            <motion.div
                className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"
                style={{
                    maskImage: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                    WebkitMaskImage: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                }}
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7d1f97] opacity-10 blur-[150px] rounded-full pointer-events-none" />

            <motion.div
                style={{ y: yHeading }}
                className="relative z-10 text-center mb-24 px-4"
            >
                <motion.h2
                    initial={{ opacity: 0, filter: "blur(20px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-[clamp(3.5rem,8vw,8rem)] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 tracking-tighter leading-[0.9]"
                >
                    SEE THE <br /> IMPACT
                </motion.h2>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                    className="h-[1px] w-32 mx-auto bg-[#7d1f97] mt-8 shadow-[0_0_20px_#7d1f97]"
                />
            </motion.div>

            <div className="relative z-20 max-w-7xl w-full px-6 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((s, i) => (
                        <HolographicCard key={i} data={s} index={i} />
                    ))}
                </div>
            </div>

            <motion.div
                style={{ y: yContent }}
                className="relative z-10 w-full max-w-5xl px-6"
            >
                <div className="relative p-10 md:p-16 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden">

                    <motion.div
                        initial={{ top: "-10%" }}
                        whileInView={{ top: "120%" }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#7d1f97] to-transparent opacity-50 blur-[2px]"
                    />

                    <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">

                        <div className="hidden md:flex flex-col items-center gap-2 pt-2">
                            <div className="w-3 h-3 rounded-full bg-[#7d1f97] animate-pulse shadow-[0_0_10px_#7d1f97]" />
                            <div className="w-[1px] h-24 bg-gradient-to-b from-[#7d1f97] to-transparent opacity-30" />
                        </div>

                        <div className="space-y-10 text-center md:text-left">

                            {/* === Impact // Media Reach === */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">
                                    Impact // Media Reach
                                </h4>

                                <p className="text-xl md:text-3xl text-gray-200 font-light leading-relaxed">
                                    Tony has been featured in{" "}
                                    <InteractiveExternal href="https://www.scotsmanguide.com">
                                        Scotsman Guide
                                    </InteractiveExternal>
                                    ,{" "}
                                    <InteractiveExternal href="https://www.housingwire.com">
                                        Housing Wire
                                    </InteractiveExternal>
                                    ,{" "}
                                    <InteractiveExternal href="https://www.nationalmortgagenews.com">
                                        National Mortgage News
                                    </InteractiveExternal>
                                    , and more.
                                </p>
                            </div>

                            <div className="w-full h-[1px] bg-white/10" />

                            {/* === Impact // Performance Shift === */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">
                                    Impact // Performance Shift
                                </h4>

                                <p className="text-xl md:text-3xl text-gray-200 font-light leading-relaxed">
                                    Tony coaches top originators through his{" "}
                                    <GrowthPlatformLink />
                                    , reshaping how leaders perform and win.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

/* ======================================================
   HOLOGRAPHIC CARD
====================================================== */
function HolographicCard({ data, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const springValue = useSpring(0, { stiffness: 50, damping: 20, mass: 1 });
    const displayValue = useTransform(springValue, (n) => Math.floor(n).toLocaleString());

    useEffect(() => {
        if (isInView) springValue.set(data.value);
    }, [isInView, data.value, springValue]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-500"
        >
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="flex items-baseline gap-1">
                    <motion.span className="text-5xl md:text-6xl font-bold text-white tracking-tighter tabular-nums">
                        {displayValue}
                    </motion.span>
                    <span className="text-3xl font-light text-[#7d1f97]">{data.suffix}</span>
                </div>
                <div className="w-8 h-[2px] bg-[#7d1f97]/50 my-4 group-hover:w-full group-hover:bg-[#7d1f97] transition-all duration-500" />
                <p className="text-gray-400 text-sm uppercase tracking-widest font-medium group-hover:text-white transition-colors duration-300">
                    {data.label}
                </p>
            </div>
        </motion.div>
    );
}

/* ======================================================
   INTERACTIVE LINKS
====================================================== */

const InteractiveExternal = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-block group cursor-pointer"
    >
        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#7d1f97] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
        <span className="relative font-semibold text-white group-hover:text-[#d8b6e2] transition-colors duration-300">
            {children}
        </span>
    </a>
);

/* ======================================================
   FIXED — GROWTH PLATFORM (now identical behavior to CTA)
====================================================== */

/* ======================================================
   FIXED — GROWTH PLATFORM (now identical behavior to CTA)
====================================================== */

const GrowthPlatformLink = () => {
    const goToPrograms = () => {
        const base = import.meta.env.BASE_URL;

        // EXACT MATCH with CTA behavior
        window.location.href = `${base}?target=programs`;
    };

    return (
        <span
            onClick={goToPrograms}
            className="relative inline-block group cursor-pointer"
        >
            <span className="absolute -inset-1 bg-[#7d1f97] blur opacity-20 group-hover:opacity-50 transition duration-500 rounded-lg"></span>
            <span className="relative font-bold text-white text-2xl md:text-3xl drop-shadow-[0_0_10px_rgba(125,31,151,0.8)]">
                Growth Platform
            </span>
        </span>
    );
};

