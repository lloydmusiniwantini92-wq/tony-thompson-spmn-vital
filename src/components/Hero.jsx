import React, { useEffect, useRef } from "react";
import "../styles/hero.css";
import { useVideoModal } from "../context/VideoModalContext";
import ScrollArrow from "./ScrollArrow";

const base = import.meta.env.BASE_URL || "/";
const heroImage = `${base}assets/mzhandu1.jpg`;
const verticallo = `${base}videos/verticallo.mp4`;

export default function Hero({ setHeroVisible }) {
    const heroRef = useRef(null);
    const widgetRef = useRef(null);
    const videoRef = useRef(null);

    const { openVideo } = useVideoModal();

    // Timestamp saved exactly like Testimonials.jsx
    const lastTime = useRef(0);

    // === HERO VISIBILITY (logo animation only) ===
    useEffect(() => {
        if (!heroRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => setHeroVisible(entry.intersectionRatio > 0.15),
            { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
        );

        observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, [setHeroVisible]);

    // ========================================================================
    // === STRICT HERO-ONLY VIDEO AUTOPLAY CONTROL ============================
    // === Video only plays when HERO is 100% fully visible ===================
    // ========================================================================
    useEffect(() => {
        const hero = heroRef.current;
        const video = videoRef.current;

        if (!hero || !video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const fullyVisible = entry.intersectionRatio === 1;

                if (fullyVisible) {
                    // Resume exactly from last time
                    video.currentTime = lastTime.current || 0;
                    setTimeout(() => video.play().catch(() => { }), 40);
                } else {
                    // Save timestamp & pause
                    lastTime.current = video.currentTime;
                    video.pause();
                }
            },
            { threshold: 1.0 } // 🔥 FULL VISIBILITY ONLY
        );

        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    const handleTimeUpdate = (e) => {
        lastTime.current = e.target.currentTime;
    };

    // Fog scroll
    const fogScrollTo = (selector) => {
        const runScroll = () => {
            const el = document.querySelector(selector);
            if (!el) return;

            const lenis = window.lenis;
            if (lenis) lenis.scrollTo(el, { duration: 1.4, offset: -40 });
            else el.scrollIntoView({ behavior: "smooth", block: "start" });
        };

        if (typeof window.triggerGlobalFog === "function") window.triggerGlobalFog(runScroll);
        else runScroll();
    };

    const handleBookTony = () => fogScrollTo("#about");
    const handleWinNow = () => fogScrollTo("#programs");

    return (
        <section
            ref={heroRef}
            id="home"
            role="main"
            aria-label="Hero section"
            className="hero relative w-full h-screen flex items-center justify-center overflow-hidden bg-black text-white"
            style={{ contain: "layout paint style" }}
        >
            {/* Background */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[1]"
                style={{
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Slogan */}
            <div
                className="absolute z-[3] text-left"
                style={{
                    top: "41%",
                    left: "3rem",
                    transform: "translateY(-50%)",
                    maxWidth: "55vw",
                }}
            >
                <h1
                    className="slogan-block font-extrabold leading-[1.05] text-white"
                    style={{
                        fontSize: "clamp(3rem, 5vw, 5.8rem)",
                        textShadow: "0 8px 20px rgba(0,0,0,0.5)",
                    }}
                >
                    <span className="slogan-line delay-0">The piece</span>
                    <br />
                    <span className="slogan-line delay-1">that changes</span>
                    <br />
                    <span className="slogan-line delay-2 text-white">YOUR game.</span>
                </h1>
            </div>

            {/* CTA Buttons */}
            <div
                className="absolute z-[900004] animate-buttonFloat flex gap-3
                    bottom-[2rem] left-[3rem] md:bottom-[2.8rem]
                    flex-row items-center justify-start"
                style={{ willChange: "transform" }}
            >
                <div
                    onClick={handleBookTony}
                    className="relative flex justify-center items-center w-[150px] h-[56px]
                        text-white font-['Press_Start_2P'] text-[0.9rem] cursor-pointer group
                        bg-gradient-to-br from-[#952ca8]/85 to-[#7d1f97]/70
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

                <div
                    onClick={handleWinNow}
                    className="relative flex justify-center items-center w-[150px] h-[56px]
                    text-white font-['Press_Start_2P'] text-[0.9rem] cursor-pointer group
                    bg-gradient-to-br from-[#7d1f97]/85 to-[#952ca8]/70
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
            </div>

            {/* VIDEO WIDGET */}
            <div
                ref={widgetRef}
                className="video-widget group absolute bottom-[2rem] right-[2rem] z-[900003] cursor-pointer select-none hidden md:block"
                onClick={() => openVideo(verticallo)}
            >
                <div
                    className="relative w[6.5cm] h-[2.3cm] rounded-[2cm]
                        bg-gradient-to-br from-[#952ca8] to-[#7d1f97]
                        shadow-[0_0_22px_rgba(155,38,182,0.75)]
                        flex justify-center items-center overflow-hidden animate-float"
                    style={{ width: "6.5cm", height: "2.3cm" }}
                >
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onTimeUpdate={handleTimeUpdate}
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

                    <div className="absolute inset-0 bg-gradient-to-br from-[#7d1f97]/40 to-[#952ca8]/25 pointer-events-none" />
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-[5]">
                <ScrollArrow target="#meet-tony" />
            </div>

            <style>{`
                @keyframes pulseGlow {
                    0%,100% { opacity:0.4; transform:translateX(-25%); }
                    50% { opacity:0.9; transform:translateX(25%); }
                }
                .animate-pulseGlow { animation:pulseGlow 6s ease-in-out infinite; }

                @keyframes fadeSlideIn {
                    0% { opacity: 0; transform: translateX(-120px) scale(0.96); filter: blur(6px); }
                    60% { opacity: 1; transform: translateX(0) scale(1.02); filter: blur(0); }
                    100% { opacity: 1; transform: translateX(0) scale(1); }
                }

                .slogan-line {
                    display: inline-block;
                    opacity: 0;
                    animation: fadeSlideIn 2.8s cubic-bezier(0.25,1,0.3,1) forwards;
                }

                .slogan-line.delay-0 { animation-delay: 0.3s; }
                .slogan-line.delay-1 { animation-delay: 1.1s; }
                .slogan-line.delay-2 { animation-delay: 2s; }
            `}</style>
        </section>
    );
}
