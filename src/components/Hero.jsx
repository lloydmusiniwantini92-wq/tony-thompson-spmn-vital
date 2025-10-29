import React, { useEffect, useRef, useState } from "react";
import "../styles/hero.css";
import { useVideoModal } from "../context/VideoModalContext";
const verticallo = "/videos/verticallo.mp4";
import heroBG from "../assets/images/hero.jpg?w=1920&format=webp&quality=80";
import ScrollArrow from "./ScrollArrow";

export default function Hero({ setHeroVisible }) {
    const [inTestimonials, setInTestimonials] = useState(false);
    const heroRef = useRef(null);
    const { openVideo } = useVideoModal();

    /* === Detect when testimonials section is visible (for scroll indicator color) === */
    useEffect(() => {
        const testimonials = document.getElementById("testimonials");
        if (!testimonials) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const ratio = entry.intersectionRatio;
                    setInTestimonials(ratio >= 0.1 && ratio <= 0.9);
                });
            },
            { threshold: Array.from({ length: 50 }, (_, i) => i / 50) }
        );

        observer.observe(testimonials);
        return () => observer.disconnect();
    }, []);

    /* === Detect hero visibility for logo crossfade === */
    useEffect(() => {
        if (!heroRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => setHeroVisible(entry.intersectionRatio > 0.15),
            { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
        );

        observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, [setHeroVisible]);

    /* === Smooth scroll helper === */
    const handleScrollTo = (selector) => {
        const el = document.querySelector(selector);
        if (el)
            window.lenis
                ? window.lenis.scrollTo(el)
                : el.scrollIntoView({ behavior: "smooth" });
    };

    /* === UI color logic === */
    const ui = {
        scrollText: inTestimonials ? "text-black" : "text-white",
        scrollArrow: inTestimonials ? "border-black" : "border-[#9b26b6]",
    };

    return (
        <section
            ref={heroRef}
            id="home"
            className="hero relative w-full h-screen flex items-center justify-center overflow-hidden"
            style={{
                contain: "layout paint style",
            }}
        >
            {/* === Background === */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[1]"
                style={{
                    backgroundImage: `url(${heroBG})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* === CTA BUTTONS === */}
            <div
                className="absolute bottom-10 left-10 flex gap-3 z-[900004] animate-buttonFloat"
                style={{ willChange: "transform" }}
            >
                {/* WIN / NOW button → scrolls to Programs */}
                <div
                    onClick={() => handleScrollTo("#programs")}
                    className="relative flex justify-center items-center w-[150px] h-[56px]
                        text-white font-['Press_Start_2P'] text-[0.9rem] cursor-pointer group
                        bg-gradient-to-br from-[#9b26b6]/85 to-[#b14fc0]/70
                        rounded-[10px] border border-white/20 shadow-[0_10px_25px_rgba(155,38,182,0.7)]
                        transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.3,1)]
                        hover:translate-y-[-4px] uppercase tracking-wider"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulseGlow rounded-[10px]" />
                    <span className="transition-all duration-500 group-hover:opacity-0">WIN</span>
                    <span className="absolute opacity-0 transition-all duration-500 group-hover:opacity-100">
                        NOW
                    </span>
                </div>

                {/* GET / STARTED button → scrolls to About */}
                <div
                    onClick={() => handleScrollTo("#about")}
                    className="relative flex justify-center items-center w-[150px] h-[56px]
                        text-white font-['Press_Start_2P'] text-[0.9rem] cursor-pointer group
                        bg-gradient-to-br from-[#b14fc0]/85 to-[#9b26b6]/70
                        rounded-[10px] border border-white/20 shadow-[0_10px_25px_rgba(177,79,192,0.7)]
                        transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.3,1)]
                        hover:translate-y-[-4px] uppercase tracking-wider"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulseGlow rounded-[10px]" />
                    <span className="transition-all duration-500 group-hover:opacity-0">GET</span>
                    <span className="absolute opacity-0 transition-all duration-500 group-hover:opacity-100">
                        STARTED
                    </span>
                </div>
            </div>

            {/* === VIDEO WIDGET === */}
            <div
                className="video-widget group absolute bottom-8 right-8 z-[900003] cursor-pointer select-none"
                onClick={() => openVideo(verticallo)}
            >
                <div
                    className="relative w-[6.5cm] h-[2.3cm] rounded-[2cm]
                        bg-gradient-to-br from-[#b14fc0] to-[#9b26b6]
                        shadow-[0_0_22px_rgba(155,38,182,0.75)]
                        flex justify-center items-center overflow-hidden animate-float"
                >
                    <video
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        decoding="async"
                        loading="lazy"
                    >
                        <source src={verticallo} type="video/mp4" />
                    </video>

                    <span
                        className="relative z-10 font-['Press_Start_2P'] text-[0.8rem] tracking-wide 
                            text-transparent bg-clip-text bg-gradient-to-r 
                            from-[#e5c4ff] via-[#ffffff] to-[#e5c4ff]"
                    >
                        PRESS PLAY
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#9b26b6]/40 to-[#b14fc0]/25 pointer-events-none" />
                </div>
            </div>

            {/* === SCROLL INDICATOR === */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-[5]">
                <ScrollArrow target="#meet-tony" />
            </div>

            {/* === Animation Keyframes === */}
            <style>{`
                @keyframes pulseGlow {
                    0%,100% { opacity:0.4; transform:translateX(-25%); }
                    50% { opacity:0.9; transform:translateX(25%); }
                }
                .animate-pulseGlow { animation:pulseGlow 6s ease-in-out infinite; }
            `}</style>
        </section>
    );
}
