// ✅ src/components/Hero.jsx — Fixed: GET/STARTED & WIN/NOW Skip Fog
import React, { useEffect, useRef, useState } from "react";
import "../styles/hero.css";
import { useVideoModal } from "../context/VideoModalContext";
import heroBG from "../assets/images/hero.jpg?w=1920&format=webp&quality=80";
import ScrollArrow from "./ScrollArrow";

const verticallo = `${import.meta.env.BASE_URL}videos/verticallo.mp4`;

export default function Hero({ setHeroVisible }) {
    const [inTestimonials, setInTestimonials] = useState(false);
    const heroRef = useRef(null);
    const videoRef = useRef(null);
    const { openVideo } = useVideoModal();

    /* === Visibility detection === */
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

    useEffect(() => {
        if (!heroRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => setHeroVisible(entry.intersectionRatio > 0.15),
            { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
        );
        observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, [setHeroVisible]);

    useEffect(() => {
        const v = videoRef.current;
        if (v) {
            const playVideo = () => v.play().catch(() => { });
            v.addEventListener("loadeddata", playVideo);
            return () => v.removeEventListener("loadeddata", playVideo);
        }
    }, []);

    /* === Smooth scroll helper (no fog) === */
    const scrollToSelector = (selector) => {
        const el = document.querySelector(selector);
        const lenis = window.lenis;
        if (!el) return;
        if (lenis) lenis.scrollTo(el, { duration: 1.3 });
        else el.scrollIntoView({ behavior: "smooth" });
    };

    /* === Smooth scroll with fog (used only elsewhere if needed) === */
    const handleScrollToWithFog = (selector) => {
        const lenis = window.lenis;
        const fade = window.triggerGlobalFog;
        if (typeof fade === "function") {
            fade(() => {
                const el = document.querySelector(selector);
                if (!el) return;
                if (lenis) lenis.scrollTo(el, { duration: 1.3 });
                else el.scrollIntoView({ behavior: "smooth" });
            });
        } else {
            scrollToSelector(selector);
        }
    };

    const ui = {
        scrollText: inTestimonials ? "text-black" : "text-white",
        scrollArrow: inTestimonials ? "border-black" : "border-[#9b26b6]",
    };

    return (
        <section
            ref={heroRef}
            id="home"
            className="hero relative w-full h-screen flex items-center justify-center overflow-hidden"
            style={{ contain: "layout paint style" }}
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

            {/* === CTA Buttons === */}
            <div
                className="
                    absolute z-[900004] animate-buttonFloat flex gap-3
                    left-1/2 top-[calc(55%+4cm)] -translate-x-1/2 -translate-y-1/2 flex-row items-center justify-center
                    md:left-10 md:bottom-10 md:top-auto md:-translate-x-0 md:-translate-y-0 md:flex-row md:items-center md:justify-start
                "
                style={{ willChange: "transform" }}
            >
                {/* WIN / NOW (NO FOG) */}
                <div
                    onClick={() => scrollToSelector("#programs")}
                    className="win-now relative flex justify-center items-center w-[150px] h-[56px]
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

                {/* GET / STARTED (NO FOG) */}
                <div
                    onClick={() => scrollToSelector("#about")}
                    className="get-started relative flex justify-center items-center w-[150px] h-[56px]
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

            {/* === Video Widget === */}
            <div
                className="video-widget group absolute bottom-8 right-8 z-[900003] cursor-pointer select-none hidden md:block"
                onClick={() => openVideo(verticallo)}
            >
                <div
                    className="relative w-[6.5cm] h-[2.3cm] rounded-[2cm]
                        bg-gradient-to-br from-[#b14fc0] to-[#9b26b6]
                        shadow-[0_0_22px_rgba(155,38,182,0.75)]
                        flex justify-center items-center overflow-hidden animate-float"
                >
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                        muted
                        loop
                        playsInline
                        preload="auto"
                        autoPlay
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

            {/* === Scroll Indicator === */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-[5]">
                <ScrollArrow target="#meet-tony" />
            </div>

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
