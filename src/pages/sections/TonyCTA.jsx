// =========================================================
// ✅ TonyCTA.jsx — FULL FIXED VERSION (Part 1 / 3)
// Direct CTA routing → navigate("/about-tony#programs")
// =========================================================

import React, { useState, useEffect, useRef } from "react";
import {
    motion,
    useSpring,
    useMotionValue,
    useTransform,
    AnimatePresence,
} from "framer-motion";

import {
    Facebook, Instagram, Linkedin, Twitter, Youtube,
    Activity, ShieldCheck, Hash, Aperture, X,
    Scan, Database, Fingerprint,
} from "lucide-react";

import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";   // ⭐ DIRECT ROUTE FIX

// --- CONSTANTS ---
const BASE = "/tony-thompson-spmn-vital";
const COLOR_BLACK = "#000000";
const COLOR_BLACK_LOW = "#00000033";
const BRAND_PURPLE = "#A45BE0";

// --- HOOKS ---
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const media = window.matchMedia("(max-width: 768px)");
        const update = () => setIsMobile(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);
    return isMobile;
};

// --- SOCIALS ---
const Socials = () => (
    <div className="flex gap-6 md:gap-8">
        {[Facebook, Instagram, Linkedin, Twitter, Youtube].map((Icon, i) => (
            <a
                key={i}
                href="#"
                className="text-black/40 hover:text-brandPurple hover:scale-125 transition-all duration-300"
            >
                <Icon size={18} />
            </a>
        ))}
    </div>
);

// --- TILE ---
const Tile = ({ data, delay, isMobile, onClick, setFocused }) => {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(
        useSpring(y, { stiffness: 400, damping: 30 }),
        [-0.5, 0.5],
        ["8deg", "-8deg"]
    );
    const rotateY = useTransform(
        useSpring(x, { stiffness: 400, damping: 30 }),
        [-0.5, 0.5],
        ["-8deg", "8deg"]
    );

    const handleMove = (e) => {
        if (isMobile || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseEnter={() => !isMobile && setHovered(true)}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
                setHovered(false);
                setFocused(false);
            }}
            onClick={() => onClick(data)}
            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            whileInView={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                transition: { duration: 0.8, delay, type: "spring", bounce: 0 },
            }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`relative group cursor-pointer z-[50] hover:z-[70] ${isMobile ? "w-[70px] h-[70px]" : "w-[120px] h-[120px]"
                }`}
        >
            {/* TILE IMAGE */}
            <div className="relative w-full h-full overflow-hidden bg-white border border-black/10 group-hover:border-brandPurple transition-all duration-300">
                <img
                    src={data.src}
                    alt=""
                    className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:scale-110 transition-transform duration-700"
                />
            </div>

            {/* HOVER PREVIEW */}
            <AnimatePresence>
                {!isMobile && hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: -20, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute left-1/2 -translate-x-1/2 -top-[100px] w-[220px] z-[999] pointer-events-none bg-white/95 backdrop-blur-md border border-brandPurple/40 p-3 shadow-xl rounded-md"
                    >
                        <div className="flex items-center gap-2 mb-2 border-b border-black/10 pb-1">
                            <Database size={10} className="text-brandPurple" />
                            <span className="text-[8px] font-mono text-brandPurple tracking-widest">
                                INSIGHT
                            </span>
                        </div>

                        <p className="text-[10px] font-bold text-black leading-tight mb-1 line-clamp-2">
                            "{data.quote}"
                        </p>
                        <p className="text-[8px] font-mono text-black/50 uppercase">
                            {data.name} — {data.level}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// --- CLUSTER ---
const Cluster = ({ data, isMobile, onClick, delay = 0 }) => (
    <div className={`grid grid-cols-3 ${isMobile ? "gap-2" : "gap-4"} justify-items-center`}>
        {data.map((item, i) => (
            <div key={item.id} className={i === 3 ? "col-span-3 mt-2" : ""}>
                <Tile
                    data={item}
                    delay={delay + i * 0.1}
                    isMobile={isMobile}
                    onClick={onClick}
                    setFocused={() => { }}
                />
            </div>
        ))}
    </div>
);

// --- CENTER CTA REACTOR ---
const Reactor = ({ onClick, isMobile }) => {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    return (
        <motion.div
            ref={ref}
            onMouseMove={(e) => {
                if (isMobile) return;
                const rect = ref.current.getBoundingClientRect();
                x.set((e.clientX - (rect.left + rect.width / 2)) * 0.5);
                y.set((e.clientY - (rect.top + rect.height / 2)) * 0.5);
            }}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
                setHovered(false);
            }}
            onMouseEnter={() => setHovered(true)}
            onClick={onClick}
            style={{ x: useSpring(x), y: useSpring(y) }}
            className="relative z-30 cursor-pointer"
        >
            <motion.div
                animate={{
                    rotate: hovered ? 180 : 0,
                    scale: hovered ? 1.2 : 1,
                }}
                className="absolute -inset-4 rounded-3xl border border-brandPurple/30 border-dashed"
            />

            <motion.div
                animate={{
                    scale: hovered ? 0.95 : 1,
                    backgroundColor: hovered ? "#fff" : "rgba(255,255,255,0.4)",
                    borderColor: hovered ? BRAND_PURPLE : COLOR_BLACK_LOW,
                }}
                className="w-[98px] h-[98px] rounded-2xl backdrop-blur-sm border-2 flex items-center justify-center relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                <div className="relative z-10 flex flex-col items-center gap-1">
                    <motion.div
                        animate={{ color: hovered ? BRAND_PURPLE : COLOR_BLACK }}
                        className="font-black text-xl tracking-tighter"
                    >
                        {hovered ? "NOW" : "YOU"}
                    </motion.div>

                    <motion.div
                        animate={{
                            opacity: hovered ? 1 : 0.5,
                            color: hovered ? BRAND_PURPLE : COLOR_BLACK,
                        }}
                        className="text-[8px] font-mono tracking-[0.3em]"
                    >
                        {hovered ? "WIN" : "SYSTEM"}
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};
// =========================================================
// ✅ TonyCTA.jsx — FULL FIXED VERSION (Part 2 / 3)
// =========================================================

// --- MODAL ---
const Modal = ({ data, onClose, isMobile }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "unset");
    }, []);

    if (!data) return null;

    return createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />

            <motion.div
                initial={isMobile ? { y: "100%" } : { scale: 0.8, opacity: 0 }}
                animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1 }}
                exit={isMobile ? { y: "100%" } : { scale: 0.8, opacity: 0 }}
                className={`relative bg-white border-2 border-brandPurple overflow-hidden ${isMobile
                        ? "w-full h-[85vh] mt-auto rounded-t-3xl"
                        : "w-[800px] max-w-[90vw] rounded-xl shadow-2xl"
                    }`}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between p-6 border-b border-brandPurple bg-brandPurple/10">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="text-brandPurple" size={20} />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono tracking-[0.3em] text-brandPurple">
                                PERFORMANCE PROFILE
                            </span>
                            <span className="text-black font-bold tracking-wider text-sm">
                                ID: {data.id}
                            </span>
                        </div>
                    </div>

                    <button onClick={onClose} className="text-black hover:text-brandPurple">
                        <X size={20} />
                    </button>
                </div>

                {/* BODY */}
                <div
                    className={`p-6 md:p-10 grid ${isMobile ? "grid-cols-1 gap-6" : "grid-cols-5 gap-8"
                        }`}
                >
                    {/* LEFT: IMAGE */}
                    <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                        <div className="relative aspect-square w-full overflow-hidden border border-brandPurple/40 rounded-md">
                            <img
                                src={data.src}
                                className="w-full h-full object-cover grayscale contrast-125"
                                alt="Subject"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-md p-2 flex justify-between items-center border-t border-brandPurple/40">
                                <span className="text-[9px] font-mono text-black/60">
                                    ASSET_{data.id.split("-")[1]}
                                </span>
                                <Scan size={12} className="text-brandPurple" />
                            </div>
                        </div>

                        {/* INFO CARDS */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-black/5 p-2 border border-black/10 rounded">
                                <span className="block text-[8px] font-mono text-black/40 mb-1">
                                    LEVEL
                                </span>
                                <span className="text-xs font-bold text-black">{data.level}</span>
                            </div>
                            <div className="bg-black/5 p-2 border border-black/10 rounded">
                                <span className="block text-[8px] font-mono text-black/40 mb-1">
                                    DIVISION
                                </span>
                                <span className="text-xs font-bold text-black">{data.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: TEXT */}
                    <div className="col-span-1 md:col-span-3 flex flex-col justify-center">
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2 opacity-70">
                                <Activity size={14} className="text-brandPurple" />
                                <span className="text-[10px] font-mono tracking-widest text-black">
                                    LEADERSHIP INSIGHT
                                </span>
                            </div>

                            <h3 className="text-xl md:text-3xl font-bold text-black leading-tight">
                                "{data.quote}"
                            </h3>
                        </div>

                        <div className="h-[1px] w-full bg-gradient-to-r from-brandPurple to-transparent my-6" />

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-brandPurple/10 flex items-center justify-center border border-brandPurple/40">
                                <Fingerprint size={18} className="text-brandPurple" />
                            </div>

                            <div>
                                <h4 className="text-black font-bold uppercase">{data.name}</h4>
                                <p className="text-brandPurple text-xs font-mono">{data.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>,
        document.body
    );
};

// =========================================================
// MAIN CTA COMPONENT
// =========================================================

export default function TonyCTA() {
    const isMobile = useIsMobile();
    const [activeData, setActiveData] = useState(null);

    const top = SECTOR_DATA.slice(0, 4);
    const bottom = SECTOR_DATA.slice(4, 8);

    const navigate = useNavigate(); // ⭐ DIRECT ROUTE FIX

    useEffect(() => {
        const esc = (e) => e.key === "Escape" && setActiveData(null);
        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, []);

    return (
        <section className="relative w-full min-h-screen bg-white text-black overflow-hidden font-sans flex items-center justify-center">
            <AnimatePresence>
                {activeData && (
                    <Modal
                        data={activeData}
                        onClose={() => setActiveData(null)}
                        isMobile={isMobile}
                    />
                )}
            </AnimatePresence>

            <div
                className={`relative w-full max-w-7xl mx-auto h-screen flex flex-col items-center justify-center transition-all duration-700 ${activeData ? "blur-md scale-95 opacity-50" : ""
                    }`}
            >
                {/* DESKTOP HEADER */}
                {!isMobile && (
                    <div className="absolute top-10 w-full flex justify-between px-10 text-black/40 font-mono text-xs">
                        <div className="flex gap-4">
                            <span>V.10.0</span>
                            <span>
                                <span className="text-brandPurple animate-pulse">●</span> ACTIVE
                            </span>
                        </div>
                        <div className="flex gap-4">
                            <span>FRAMEWORK: EXECUTIVE</span>
                            <span>STANDARD: TOP_10%</span>
                        </div>
                    </div>
                )}

                {/* =====================================================
                   LAYOUT: Left Cluster — Center CTA — Right Cluster
                   ===================================================== */}
                <div className="relative w-full flex flex-col md:block items-center justify-center">
                    {/* LEFT CLUSTER */}
                    <div
                        className={`z-10 ${isMobile
                                ? "scale-90 mb-8"
                                : "absolute left-[5%] bottom-[-1%] -rotate-3 scale-90 opacity-90"
                            }`}
                    >
                        {!isMobile && (
                            <div className="mb-4 flex gap-2 text-brandPurple/60 text-[10px] font-mono">
                                <Hash size={10} />
                                <span>DATA GROUP A</span>
                            </div>
                        )}
                        <Cluster data={top} isMobile={isMobile} onClick={setActiveData} />
                    </div>

                    {/* =====================================================
                       CENTER CTA — DIRECT ROUTING FIX HERE ⭐⭐⭐⭐⭐
                       ===================================================== */}
                    <div className="z-20 text-center flex flex-col items-center my-4 md:my-0 md:mt-[30px]">
                        <div className="font-black uppercase text-[2.5rem] md:text-[7rem] leading-[0.9] tracking-tighter text-black mb-8 md:mb-12">
                            {!isMobile && (
                                <div className="text-black/30 text-[2rem] mb-2 font-mono tracking-[0.5em]">
                                    FRAMEWORK:
                                </div>
                            )}

                            WHAT THE
                            <span
                                className={`block ${isMobile
                                        ? "text-brandPurple text-[3.5rem]"
                                        : "text-transparent [-webkit-text-stroke:2px_rgba(0,0,0,0.8)]"
                                    }`}
                            >
                                TOP 10%
                            </span>
                            DO DIFFERENTLY

                            {!isMobile && (
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                    className="h-2 bg-brandPurple mt-2"
                                />
                            )}
                        </div>

                        {/* === CTA BUTTON ROUTES DIRECTLY TO PROGRAMS === */}
                        <Reactor
                            onClick={() => {
                                window.location.href = `${import.meta.env.BASE_URL}?target=programs`;
                            }}
                            isMobile={isMobile}
                        />

                        <div className="mt-12 flex flex-col items-center">
                            <div className="flex items-center gap-4 mb-6 opacity-60">
                                <div className="h-[1px] w-12 bg-black" />
                                <p className="font-mono text-brandPurple text-xs tracking-[0.4em] uppercase">
                                    SYSTEMS.ONLINE
                                </p>
                                <div className="h-[1px] w-12 bg-black" />
                            </div>

                            <Socials />

                            <div className="font-black text-2xl tracking-tighter opacity-50 mt-6">
                                TONY
                                <span className="text-brandPurple">THOMPSON</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CLUSTER */}
                    <div
                        className={`z-10 ${isMobile
                                ? "scale-90 mt-8"
                                : "absolute right-[5%] bottom-[-1%] rotate-3 scale-90 opacity-90"
                            }`}
                    >
                        {!isMobile && (
                            <div className="mb-4 flex gap-2 justify-end text-brandPurple/60 text-[10px] font-mono">
                                <span>DATA GROUP B</span>
                                <Aperture size={10} />
                            </div>
                        )}

                        <Cluster
                            data={bottom}
                            isMobile={isMobile}
                            onClick={setActiveData}
                            delay={0.4}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}


// =========================================================
// 🔥 FINAL SECTION — ASSETS + SECTOR_DATA
// =========================================================

const ASSETS = {
    k1: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800",
    k2: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800",
    i3: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    i4: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    t1: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",
    t2: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    t3: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
    i2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
};

export const SECTOR_DATA = [
    {
        id: "REC-01",
        src: ASSETS.k1,
        name: "Sarah Jenkins",
        role: "Loan Officer",
        location: "Division A",
        level: "Executive Contributor",
        quote: "Tony helped me eliminate noise and operate with precision.",
    },
    {
        id: "REC-02",
        src: ASSETS.k2,
        name: "David Peterson",
        role: "Branch Manager",
        location: "Division B",
        level: "Leadership Tier 1",
        quote: "Tony sharpened the way I lead and execute.",
    },
    {
        id: "REC-03",
        src: ASSETS.i3,
        name: "Lisa Kwon",
        role: "Regional VP",
        location: "Division C",
        level: "Executive Leader",
        quote: "He doesn't hype you—he restructures how you think.",
    },
    {
        id: "REC-04",
        src: ASSETS.i4,
        name: "Chris Thompson",
        role: "Executive",
        location: "Corporate HQ",
        level: "Leadership Tier 2",
        quote: "I became significantly more intentional and decisive.",
    },
    {
        id: "REC-05",
        src: ASSETS.t1,
        name: "Marcus Reid",
        role: "Entrepreneur",
        location: "Field Ops",
        level: "Owner Tier",
        quote: "I stopped wasting effort and started driving results.",
    },
    {
        id: "REC-06",
        src: ASSETS.t2,
        name: "Elena Rodriguez",
        role: "Sales Director",
        location: "Division D",
        level: "Top Performer",
        quote: "Tony simplifies the complex and accelerates execution.",
    },
    {
        id: "REC-07",
        src: ASSETS.t3,
        name: "James O’Connell",
        role: "Senior Agent",
        location: "West Division",
        level: "Top 10% Producer",
        quote: "I finally understood what consistent excellence looks like.",
    },
    {
        id: "REC-08",
        src: ASSETS.i2,
        name: "Dr. Aris Thorne",
        role: "Consultant",
        location: "Advisory Group",
        level: "Executive Advisor",
        quote: "The clarity alone pays for itself.",
    },
];
