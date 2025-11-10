import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
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

    // slideshow autoplay
    useEffect(() => {
        const timer = setInterval(() => {
            setPrev(active);
            setActive((p) => (p + 1) % slides.length);
        }, isLowDevice ? 12000 : 9000);
        return () => clearInterval(timer);
    }, [active, slides.length, isLowDevice]);

    // play/pause background video when visible
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

    return (
        <>
            {/* ===================== MOBILE (< md) ===================== */}
            <section className="md:hidden relative w-full flex flex-col items-center bg-white text-black overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: isLowDevice ? 0.8 : 1.2,
                        ease: [0.25, 1, 0.3, 1],
                    }}
                    className="text-center px-6 py-16 max-w-[800px]"
                >
                    <h1 className="font-[Montserrat] font-extrabold text-[clamp(2rem,6vw,3rem)] leading-[1.1] tracking-tight bg-gradient-to-r from-[#7d1f97] to-[#952ca8] text-transparent bg-clip-text">
                        REDEFINING THE FUTURE OF LEADERSHIP
                    </h1>
                </motion.div>

                {/* lightweight slideshow */}
                <div className="w-[90%] mb-12 rounded-2xl overflow-hidden shadow-xl">
                    <img
                        src={slides[active]}
                        alt={`Journey mobile slide ${active + 1}`}
                        className="w-full h-auto object-cover transition-all duration-700 ease-in-out"
                    />
                </div>

                {/* trimmed journey video */}
                <div className="relative w-full flex flex-col items-center justify-center bg-black text-white">
                    {!isLowDevice && (
                        <video
                            ref={videoRef}
                            src={journeyVideo}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="w-full h-[60vh] object-cover"
                        />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 z-[1]" />
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: isLowDevice ? 0.8 : 1.2,
                            ease: [0.25, 1, 0.3, 1],
                        }}
                        viewport={{ once: true }}
                        className="relative z-[2] px-6 py-12 text-center"
                    >
                        <h2 className="text-[clamp(2rem,6vw,3rem)] font-extrabold mb-6 leading-[1.1] drop-shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                            A JOURNEY BEYOND MASTERY
                        </h2>
                        <p className="text-white/90 text-base leading-relaxed font-light tracking-wide max-w-[700px] mx-auto">
                            What begins as a vision evolves into structure — where creative instinct meets calculated architecture.
                            Tony’s journey isn’t about following trends; it’s about designing timeless systems that turn ambition
                            into sustainable progress.
                        </p>
                    </motion.div>

                    <button
                        onClick={() => openVideo(journeyVideo)}
                        className="relative z-[3] mb-16 mt-2 flex items-center justify-center"
                        aria-label="Play Tony's journey video"
                    >
                        <div
                            className="flex justify-center items-center w-[140px] h-[52px]
              text-white font-['Press_Start_2P'] text-[0.8rem] uppercase tracking-wider
              bg-gradient-to-br from-[#7d1f97]/85 to-[#952ca8]/70
              rounded-[10px] border border-white/20 shadow-[0_10px_20px_rgba(125,31,151,0.7)]
              transition-all duration-[500ms] ease-[cubic-bezier(0.25,1,0.3,1)]
              hover:translate-y-[-3px]"
                        >
                            <span>PLAY</span>
                        </div>
                    </button>
                </div>
            </section>

            {/* ===================== DESKTOP (>= md) ===================== */}
            <section
                className="hidden md:flex relative w-full flex-col items-center justify-center bg-white text-black overflow-hidden"
                role="region"
                aria-label="Leadership introduction section"
            >
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
                    className="text-center px-[8vw] max-w-[1100px] py-[10vh] z-10"
                >
                    <h1
                        className="font-[Montserrat] font-extrabold leading-[1.05]
            text-[clamp(2.8rem,6vw,6rem)] tracking-tight 
            bg-gradient-to-r from-[#7d1f97] to-[#952ca8]
            text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(125,31,151,0.35)]"
                    >
                        REDEFINING THE FUTURE OF LEADERSHIP
                    </h1>
                </motion.div>
                <div className="absolute bottom-0 w-full h-[20vh] bg-gradient-to-b from-transparent to-white/90 pointer-events-none" />
            </section>

            <div
                className="hidden md:flex relative w-full justify-center bg-white mb-0 pb-0"
                role="region"
                aria-label="Tony's visual journey slideshow"
            >
                <div className="relative z-10 w-[80%] aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-black">
                    <motion.img
                        key={`prev-${prev}`}
                        src={slides[prev]}
                        alt="Previous scene"
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 9, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-100"
                    />
                    <motion.img
                        key={`active-${active}`}
                        src={slides[active]}
                        alt={`Tony Journey slide ${active + 1}`}
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.05 }}
                        transition={{ duration: 9, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[4000ms] ease-in-out opacity-100 animate-fadeIn"
                    />
                    {/* 🧹 Removed overlay filters completely */}
                </div>
            </div>

            <section
                id="tony-journey"
                className="hidden md:flex relative w-full h-[120vh] overflow-hidden m-0 p-0 flex-col items-center justify-center text-center text-white -mt-[25vh]"
                role="region"
                aria-label="Journey background section"
            >
                <video
                    ref={videoRef}
                    src={journeyVideo}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Journey background video"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <track
                        kind="captions"
                        srcLang="en"
                        label="English captions"
                        src={`${import.meta.env.BASE_URL}videos/JourneyCaptions.vtt`}
                        default
                    />
                </video>

                <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-white via-white/70 to-transparent z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 z-[1]" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="relative z-[2] px-6 max-w-[1000px]"
                >
                    <h2 className="text-[clamp(2.8rem,6vw,6rem)] font-extrabold mb-8 tracking-tight leading-[1] drop-shadow-[0_0_25px_rgba(0,0,0,0.7)]">
                        A JOURNEY BEYOND MASTERY
                    </h2>
                    <p className="text-white text-lg md:text-xl leading-relaxed font-light tracking-wide max-w-[800px] mx-auto drop-shadow-[0_0_25px_rgba(0,0,0,0.6)]">
                        What begins as a vision evolves into structure — where creative instinct meets calculated architecture. Tony’s journey isn’t about following trends; it’s about designing timeless systems that turn ambition into sustainable progress.
                    </p>
                </motion.div>

                <button
                    onClick={() => openVideo(journeyVideo)}
                    className="relative z-[3] mt-16 flex items-center justify-center"
                    aria-label="Play Tony's journey video"
                >
                    <div
                        className="relative flex justify-center items-center w-[160px] h-[60px]
            text-white font-['Press_Start_2P'] text-[0.9rem] uppercase tracking-wider
            bg-gradient-to-br from-[#7d1f97]/85 to-[#952ca8]/70
            rounded-[12px] border border-white/20 shadow-[0_10px_25px_rgba(125,31,151,0.7)]
            transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.3,1)]
            hover:translate-y-[-4px] cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-pulseGlow rounded-[12px]" />
                        <span className="relative z-10">PLAY</span>
                    </div>
                </button>
            </section>

            {/* Keyframes */}
            <style>{`
        @keyframes fadeIn { 0% { opacity:0; } 40% { opacity:1; } 100% { opacity:1; } }
        .animate-fadeIn { animation: fadeIn 4s ease-in-out forwards; }
      `}</style>
        </>
    );
}
