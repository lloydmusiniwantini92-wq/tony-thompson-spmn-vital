import React, { useState, useEffect, useRef } from "react";
import {
    motion,
    useSpring,
    useMotionValue,
    useTransform,
    useMotionTemplate,
} from "framer-motion";

import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useDevice } from "../../context/DeviceContext";

// --- REAL ASSETS ---
import komba1 from "../../assets/images/komba1.jpg";
import komba2 from "../../assets/images/komba2.jpg";
import img1 from "../../assets/testimonials/testimonial1.png";
import img2 from "../../assets/testimonials/testimonial2.png";
import img3 from "../../assets/testimonials/testimonial3.png";
import img4 from "../../assets/testimonials/testimonial4.png";
import logoTT from "../../assets/images/logoTT.png";

// BACKGROUND FROM PUBLIC FOLDER
const tonyCTA = `${import.meta.env.BASE_URL}assets/images/tonyCTA.jpg`;
const t1 = `${import.meta.env.BASE_URL}assets/t1.jpg`;
const t2 = `${import.meta.env.BASE_URL}assets/t2.jpg`;
const t3 = `${import.meta.env.BASE_URL}assets/t3.jpg`;

// ==========================================================
// 3D TILE
// ==========================================================
const TechTile = ({ src, delay = 0, isLowDevice, sizeClass }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300 };

    const rotateX = useTransform(
        useSpring(y, springConfig),
        [-0.5, 0.5],
        ["10deg", "-10deg"]
    );
    const rotateY = useTransform(
        useSpring(x, springConfig),
        [-0.5, 0.5],
        ["-10deg", "10deg"]
    );

    const handleMove = (e) => {
        if (isLowDevice || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.7, delay },
            }}
            viewport={{ once: true }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative group pointer-events-auto cursor-pointer ${sizeClass}`}
        >
            <div className="relative w-full h-full overflow-hidden rounded-xl shadow-xl border border-white/10 bg-black/40 transition-all duration-500 group-hover:border-[#9b26b6]/60">

                <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />

                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-white/40" />
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white/40" />
            </div>
        </motion.div>
    );
};

// ==========================================================
// YOU / WIN BUTTON (Magnetic)
// ==========================================================
const MagneticOrb = ({ hovered, setHovered, onClick, isLowDevice }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMove = (e) => {
        if (isLowDevice) return;

        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        x.set((e.clientX - cx) * 0.3);
        y.set((e.clientY - cy) * 0.3);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
                setHovered(false);
            }}
            onMouseEnter={() => setHovered(true)}
            onClick={onClick}
            style={{ x: springX, y: springY }}
            className="relative z-20 cursor-pointer pointer-events-auto"
        >
            <motion.div
                animate={{
                    scale: hovered ? 1.05 : 1,
                    backgroundColor: hovered ? "#ffffff" : "rgba(0,0,0,0)",
                    color: hovered ? "#7d1f97" : "#ffffff",
                    boxShadow: hovered
                        ? "0 0 28px rgba(155,38,182,0.9)"
                        : "0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="
                    w-[100px] h-[100px] 
                    sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px]
                    rounded-xl border-2 border-white/40
                    flex flex-col items-center justify-center
                    overflow-hidden select-none
                "
            >
                <motion.span
                    key={hovered ? "win" : "you"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="font-extrabold text-[1.25rem] sm:text-[1.4rem] md:text-[1.5rem]"
                >
                    {hovered ? "WIN" : "YOU"}
                </motion.span>
            </motion.div>
        </motion.div>
    );
};

// ==========================================================
// MAIN CTA COMPONENT
// ==========================================================
export default function TonyCTA() {
    const tier = useDevice();
    const isLowDevice = tier === "low";

    const [hovered, setHovered] = useState(false);

    const [pool, setPool] = useState([
        komba1,
        komba2,
        img3,
        img4,
        t1,
        t2,
        t3,
        img2,
    ]);

    const topTiles = pool.slice(0, 4);
    const bottomTiles = pool.slice(4, 8);

    useEffect(() => {
        if (hovered && !isLowDevice) {
            const interval = setInterval(() => {
                setPool((prev) => {
                    const next = [...prev];
                    const r1 = Math.floor(Math.random() * 8);
                    const r2 = Math.floor(Math.random() * 8);
                    [next[r1], next[r2]] = [next[r2], next[r1]];
                    return next;
                });
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [hovered, isLowDevice]);

    const TShape = ({ tiles, delay = 0, size = "md" }) => {
        const sizeClass =
            size === "sm"
                ? "w-[80px] h-[80px]"
                : "w-[100px] h-[100px] md:w-[120px] md:h-[120px]"; // FIXED STRING

        const gap = size === "sm" ? "gap-3" : "gap-5";

        return (
            <div className={`grid grid-cols-3 ${gap} justify-items-center`}>
                {tiles.slice(0, 3).map((src, i) => (
                    <TechTile
                        key={i}
                        src={src}
                        delay={delay + i * 0.1}
                        isLowDevice={isLowDevice}
                        sizeClass={sizeClass}
                    />
                ))}

                <div className="col-span-3 flex justify-center mt-3">
                    <TechTile
                        src={tiles[3]}
                        delay={delay + 0.3}
                        isLowDevice={isLowDevice}
                        sizeClass={sizeClass}
                    />
                </div>
            </div>
        );
    };

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const goToPrograms = () => {
        sessionStorage.setItem("scrollToPrograms", "true");

        if (window.triggerGlobalFog) {
            window.triggerGlobalFog(() => {
                window.location.href = "/";
            });
        } else {
            window.location.href = "/#programs";
        }
    };

    return (
        <section
            className="relative w-full min-h-screen text-white overflow-hidden"
            onMouseMove={handleMouseMove}
            style={{
                backgroundColor: "#9b26b6",
            }}

        >
            <div className="absolute inset-0 opacity-[0.6]">
                <div className="absolute inset-0 
                    bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),
                    linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
                    bg-[size:4rem_4rem]" />

                <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_800px_at_var(--x)_var(--y),
                            rgba(155,38,182,0.08),transparent_40%)]"
                    style={{
                        "--x": useMotionTemplate`${mouseX}px`,
                        "--y": useMotionTemplate`${mouseY}px`,
                    }}
                />
            </div>

            {/* DESKTOP */}
            <div className="hidden md:flex relative w-full h-screen items-center justify-center z-10">
                <div className="absolute left-[5%] bottom-[10%] -rotate-6 scale-90 opacity-80 hover:opacity-100">
                    <TShape tiles={topTiles} />
                </div>

                <div className="absolute right-[5%] bottom-[10%] rotate-6 scale-90 opacity-80 hover:opacity-100">
                    <TShape tiles={bottomTiles} delay={0.4} />
                </div>

                <div className="relative z-20 flex flex-col items-center text-center pointer-events-none">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="font-black uppercase text-[4rem] lg:text-[6rem] leading-[0.9] mb-12"
                    >
                        <span className="block drop-shadow-[0_0_30px_rgba(155,38,182,0.5)]">
                            WHAT THE
                        </span>

                        <span className="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] opacity-60 animate-pulse">
                            TOP 10%
                        </span>

                        <span className="block text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                            DO DIFFERENTLY
                        </span>
                    </motion.h2>

                    <MagneticOrb
                        hovered={hovered}
                        setHovered={setHovered}
                        onClick={goToPrograms}
                        isLowDevice={isLowDevice}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-12 flex flex-col items-center pointer-events-auto"
                    >
                        <p className="font-mono text-[#9b26b6] text-sm tracking-[.3em] mb-6 uppercase">
                            // Skills. Careers. Legacy. Built.
                        </p>

                        <div className="flex gap-6 mb-8">
                            {[Facebook, Instagram, Linkedin, Twitter, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="text-gray-400 hover:text-white transition-all">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>

                        <img
                            src={logoTT}
                            className="w-24 opacity-50 hover:opacity-100 transition-all"
                        />
                    </motion.div>
                </div>
            </div>

            {/* MOBILE */}
            <div className="md:hidden relative w-full min-h-screen flex flex-col items-center py-20 px-4 z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="font-black uppercase text-[2.5rem] text-center leading-none mb-10"
                >
                    WHAT THE <span className="text-[#9b26b6]">TOP 10%</span>
                    <br />
                    DO DIFFERENTLY
                </motion.h2>

                <div className="scale-75">
                    <TShape tiles={topTiles} size="sm" />
                </div>

                <div className="my-10">
                    <MagneticOrb
                        hovered={hovered}
                        setHovered={setHovered}
                        onClick={goToPrograms}
                        isLowDevice={true}
                    />
                </div>

                <div className="scale-75">
                    <TShape tiles={bottomTiles} size="sm" />
                </div>

                <div className="flex gap-6 mb-8 mt-10">
                    {[Facebook, Instagram, Linkedin, Twitter, Youtube].map((Icon, i) => (
                        <a key={i} href="#" className="text-gray-400">
                            <Icon size={20} />
                        </a>
                    ))}
                </div>

                <img src={logoTT} className="w-[120px] opacity-80" />
            </div>
        </section>
    );
}
