import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, ScanLine, Crosshair, Hash } from "lucide-react";
import { useVideoModal } from "../../context/VideoModalContext";
import { useDevice } from "../../context/DeviceContext";

import mzhandu1 from "../../assets/images/mzhandu1.jpg";
import mzhandu2 from "../../assets/images/mzhandu2.jpg";
import j1 from "../../assets/images/j1.jpg";
import j2 from "../../assets/images/j2.jpg";
import j3 from "../../assets/images/j3.jpg";
import j4 from "../../assets/images/j4.jpg";
import komba1 from "../../assets/images/komba1.jpg";
import komba2 from "../../assets/images/komba2.jpg";

const journeyVideo = `${import.meta.env.BASE_URL}videos/Journey.mp4`;

export default function TonyJourney() {
    const tier = useDevice();
    const isLowDevice = tier === "low";

    const slides = [mzhandu1, mzhandu2, j1, j2, j3, j4, komba1, komba2];
    const [active, setActive] = useState(0);
    const [prev, setPrev] = useState(0);
    const videoRef = useRef(null);
    const { openVideo } = useVideoModal();

    useEffect(() => {
        const timer = setInterval(() => {
            setPrev(active);
            setActive((p) => (p + 1) % slides.length);
        }, isLowDevice ? 12000 : 9000);
        return () => clearInterval(timer);
    }, [active, slides.length, isLowDevice]);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) v.play().catch(() => { });
                else v.pause();
            },
            { threshold: 0.25 }
        );
        observer.observe(v);
        return () => observer.disconnect();
    }, []);

    const MonoLabel = ({ children, className = "" }) => (
        <div className={`flex items-center gap-2 text-[#9b26b6] font-mono text-[10px] tracking-[0.3em] uppercase opacity-80 ${className}`}>
            <Hash size={10} />
            <span>{children}</span>
        </div>
    );

    const HUDCorner = ({ position }) => {
        const borderClass = {
            "tl": "top-0 left-0 border-t border-l",
            "tr": "top-0 right-0 border-t border-r",
            "bl": "bottom-0 left-0 border-b border-l",
            "br": "bottom-0 right-0 border-b border-r"
        }[position];
        return <div className={`absolute ${borderClass} w-3 h-3 border-[#9b26b6]/50 z-20`} />;
    };

    return (
        <>
            {/* ⚓ SCROLL ANCHOR */}
            <div id="tony-journey" className="absolute -mt-20 w-full h-1 pointer-events-none opacity-0" />

            {/* =========================================================
                MOBILE SECTION (Split Layout - Optimized)
            ========================================================= */}
            <section className="md:hidden relative w-full flex flex-col items-center bg-[#030303] text-white overflow-hidden border-t border-white/10 pb-16">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 pointer-events-none" />

                {/* 1. HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.3, 1] }}
                    className="text-center px-6 pt-16 pb-10 max-w-[800px] relative z-10"
                >
                    <MonoLabel className="justify-center mb-4">Orientation // Mobile</MonoLabel>
                    <h1 className="font-[Montserrat] font-black text-[clamp(2rem,6vw,3rem)] leading-[0.95] tracking-tighter text-white uppercase">
                        Redefining <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b26b6] to-[#7d1f97]">
                            Leadership
                        </span>
                    </h1>
                </motion.div>

                {/* 2. PICTURE AREA (Slideshow) */}
                <div className="relative w-[90%] mb-12 aspect-[4/5] rounded-lg overflow-hidden border border-white/10 bg-white/5 shadow-[0_0_30px_rgba(155,38,182,0.15)]">
                    <HUDCorner position="tl" />
                    <HUDCorner position="br" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10" />

                    <img
                        src={slides[active]}
                        alt={`Visual Log ${active + 1}`}
                        className="w-full h-full object-cover grayscale contrast-125 brightness-90 transition-all duration-700 ease-in-out"
                    />

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20">
                        <div className="text-[10px] font-mono text-white/60">IMG_SEQ_0{active + 1}</div>
                        <ScanLine size={16} className="text-[#9b26b6] animate-pulse" />
                    </div>
                </div>

                {/* 3. CONTENT / ACTION AREA */}
                <div
                    onClick={() => openVideo(journeyVideo, false)}
                    className="relative w-full flex flex-col items-center justify-center px-6 py-12 cursor-pointer group border-t border-white/5 bg-[#050505]"
                    role="button"
                    aria-label="Initialize Journey Protocol"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#0f0f0f] to-[#030303] z-[0]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,38,182,0.08),transparent_70%)] z-[0]" />

                    <div className="relative z-[2] flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-8"
                        >
                            <h2 className="text-[2.5rem] font-black uppercase tracking-tighter leading-none mb-4 drop-shadow-lg text-white">
                                Beyond <span className="text-[#9b26b6]">Mastery</span>
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed font-medium max-w-[300px] mx-auto border-l-2 border-[#9b26b6] pl-4 text-left">
                                Evolution into structure. Creative instinct meets calculated architecture.
                            </p>
                        </motion.div>

                        <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-[#9b26b6]/30 flex items-center justify-center shadow-[0_0_30px_rgba(155,38,182,0.2)] group-active:scale-95 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#9b26b6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Play className="w-6 h-6 text-white fill-white relative z-10" />
                            <div className="absolute top-1 left-1 w-1 h-1 bg-white/50" />
                            <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/50" />
                        </div>
                        <div className="mt-4 font-['Press_Start_2P'] text-[10px] tracking-[0.2em] text-[#9b26b6] animate-pulse">
                            PRESS PLAY
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                DESKTOP SECTION (ORIGINAL RESTORED)
            ========================================================= */}
            <section className="hidden md:block">

                {/* DESKTOP HEADER */}
                <div className="relative w-full flex flex-col items-center justify-center bg-[#030303] text-white overflow-hidden border-t border-white/10">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
                        className="text-center px-[8vw] max-w-[1200px] py-[12vh] z-10"
                    >
                        <MonoLabel className="justify-center mb-6">The Turning Point // Leadership Protocol</MonoLabel>

                        <h1 className="font-[Montserrat] font-black leading-[0.9]
                            text-[clamp(3rem,6vw,7rem)] tracking-tighter uppercase
                            text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600
                            drop-shadow-2xl mb-4"
                        >
                            Redefining The <br />
                            <span className="text-[#9b26b6] drop-shadow-[0_0_30px_rgba(155,38,182,0.4)]">Future</span>
                        </h1>

                        <div className="h-[1px] w-24 bg-[#9b26b6] mx-auto shadow-[0_0_15px_#9b26b6]" />
                    </motion.div>

                    <div className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-b from-transparent to-[#030303] pointer-events-none" />
                </div>

                {/* DESKTOP SLIDESHOW */}
                <div
                    className="relative w-full flex justify-center bg-[#030303] mb-0 pb-0"
                    role="region"
                    aria-label="Tony's visual journey slideshow"
                >
                    <div className="relative z-10 w-[80%] aspect-[21/9] rounded-xl overflow-hidden bg-[#050505] border border-white/10 group">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#9b26b6]/50 to-transparent z-30" />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#9b26b6]/50 to-transparent z-30" />

                        <div className="absolute top-6 left-8 z-30 flex items-center gap-3">
                            <Crosshair size={20} className="text-[#9b26b6] opacity-80" />
                            <span className="font-mono text-xs text-white/50 tracking-widest">VISUAL_LOG_00{active + 1}</span>
                        </div>

                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay z-20 pointer-events-none" />

                        <motion.img
                            key={`prev-${prev}`}
                            src={slides[prev]}
                            alt="Previous scene"
                            initial={{ scale: 1.05 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 9, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
                        />
                        <motion.img
                            key={`active-${active}`}
                            src={slides[active]}
                            alt={`Tony Journey slide ${active + 1}`}
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.05 }}
                            transition={{ duration: 9, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 animate-fadeIn"
                        />
                    </div>
                </div>

                {/* DESKTOP VIDEO TRIGGER (ORIGINAL) */}
                <div
                    onClick={() => openVideo(journeyVideo, false)}
                    className="relative w-full h-[120vh] overflow-hidden m-0 p-0 flex flex-col items-center justify-center text-center text-white -mt-[20vh] cursor-pointer group focus:outline-none"
                    role="button"
                    aria-label="Play Journey Video"
                    tabIndex={0}
                >
                    {!isLowDevice && (
                        <video
                            ref={videoRef}
                            src={journeyVideo}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale transition-all duration-1000 group-hover:opacity-50 group-hover:scale-105 group-hover:grayscale-0"
                        />
                    )}

                    <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#030303] via-[#030303]/80 to-transparent z-[1]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_90%)] z-[1]" />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] z-[1] opacity-50" />

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="relative z-[2] px-6 max-w-[1000px]"
                    >
                        <div className="flex justify-center mb-8">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-[#9b26b6]/30 rounded-full">
                                <div className="w-2 h-2 bg-[#9b26b6] rounded-full animate-pulse" />
                                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/80">Now Playing</span>
                            </div>
                        </div>

                        <h2 className="text-[clamp(3rem,6vw,6rem)] font-black uppercase tracking-tighter mb-8 leading-[0.9] drop-shadow-2xl">
                            A Journey <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Beyond Mastery</span>
                        </h2>

                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light tracking-wide max-w-[700px] mx-auto mb-16 border-l border-[#9b26b6] pl-6 text-left">
                            What begins as a vision evolves into structure — where creative instinct meets calculated architecture. Tony’s journey is about designing timeless systems that turn ambition into sustainable progress.
                        </p>

                        <div className="relative mx-auto w-28 h-28 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-3xl border border-[#9b26b6]/30 group-hover:rotate-90 transition-transform duration-700 ease-in-out border-dashed" />

                            <div className="relative w-20 h-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center group-hover:bg-[#9b26b6] group-hover:border-[#9b26b6] transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_50px_rgba(155,38,182,0.6)]">
                                <Play className="w-8 h-8 text-white fill-white ml-1 transition-transform duration-300 group-hover:scale-110" />
                            </div>

                            {/* RE-NESTED HERE for correct positioning relative to the circle container */}
                            <div className="absolute -bottom-12 font-['Press_Start_2P'] text-xs tracking-[0.3em] text-[#9b26b6] opacity-0 group-hover:opacity-100 transition-opacity duration-500 uppercase">
                                PRESS PLAY
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <style>{`
                @keyframes fadeIn { 0% { opacity:0; } 100% { opacity:1; } }
                .animate-fadeIn { animation: fadeIn 3s ease-in-out forwards; }
            `}</style>
        </>
    );
}