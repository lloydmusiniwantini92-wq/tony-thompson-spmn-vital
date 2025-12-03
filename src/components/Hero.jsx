import React, { useEffect, useRef, useState } from "react";
import "../styles/hero.css";
import { useVideoModal } from "../context/VideoModalContext";
import ScrollArrow from "./ScrollArrow";

const base = import.meta.env.BASE_URL || "/";
const heroImage = `${base}assets/mzhandu1.jpg`;
const verticallo = `${base}videos/verticallo.mp4`;

export default function Hero({ setHeroVisible }) {
    const heroRef = useRef(null);
    const videoRef = useRef(null);

    const { openVideo } = useVideoModal();
    const lastTime = useRef(0);

    // ============================================================
    // ⭐ Hydration-safe mobile detection (matchMedia)
    // ============================================================
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 767px)");
        setIsMobile(media.matches);

        const listener = (e) => setIsMobile(e.matches);
        media.addEventListener("change", listener);

        return () => media.removeEventListener("change", listener);
    }, []);

    // ============================================================
    // ⭐ Responsive Styles (Inline Only)
    // ============================================================

    // Hero container height
    const heroStyle = {
        contain: "layout paint style",
        height: isMobile ? "100dvh" : "100vh",
    };

    // Slogan positioning + text responsiveness
    const sloganWrapperStyle = isMobile
        ? {
            position: "absolute",
            top: "28%",
            left: "1rem",
            maxWidth: "90vw",
            zIndex: 3,
            transform: "translateY(-10%)",
            textAlign: "left",
        }
        : {
            position: "absolute",
            top: "41%",
            left: "3rem",
            maxWidth: "55vw",
            zIndex: 3,
            transform: "translateY(-50%)",
            textAlign: "left",
        };

    const sloganTextStyle = isMobile
        ? {
            fontSize: "2rem",
            lineHeight: 1.1,
            fontWeight: 800,
            textShadow: "0 6px 16px rgba(0,0,0,0.45)",
        }
        : {
            fontSize: "clamp(3rem, 5vw, 5.8rem)",
            lineHeight: 1.05,
            fontWeight: 800,
            textShadow: "0 8px 20px rgba(0,0,0,0.5)",
        };

    // CTA Wrapper
    const ctaContainerStyle = isMobile
        ? {
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "row",
            gap: "0.7rem",
            zIndex: 900004,
        }
        : {
            position: "absolute",
            bottom: "2.8rem",
            left: "3rem",
            display: "flex",
            flexDirection: "row",
            gap: "0.75rem",
            zIndex: 900004,
        };

    // CTA button responsiveness
    const ctaButtonSize = isMobile
        ? { width: "130px", height: "48px", fontSize: "0.75rem" }
        : { width: "150px", height: "56px", fontSize: "0.9rem" };

    // Background photo responsiveness
    const bgStyle = isMobile
        ? {
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
        }
        : {
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        };

    // ============================================================
    // ⭐ HERO VISIBILITY (desktop only)
    // ============================================================
    useEffect(() => {
        if (!heroRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => setHeroVisible(entry.intersectionRatio > 0.15),
            { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
        );

        observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, [setHeroVisible]);

    // ============================================================
    // ⭐ VIDEO AUTOPLAY CONTROL
    // ============================================================
    useEffect(() => {
        const hero = heroRef.current;
        const video = videoRef.current;
        if (!hero || !video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const fullyVisible = entry.intersectionRatio === 1;

                if (fullyVisible) {
                    video.currentTime = lastTime.current || 0;
                    setTimeout(() => video.play().catch(() => { }), 40);
                } else {
                    lastTime.current = video.currentTime;
                    video.pause();
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    const handleTimeUpdate = (e) => (lastTime.current = e.target.currentTime);

    // ============================================================
    // ⭐ Scroll behavior
    // ============================================================
    const fogScrollTo = (selector) => {
        if (isMobile) return; // Mobile = no scroll

        const runScroll = () => {
            const el = document.querySelector(selector);
            if (!el) return;

            const lenis = window.lenis;
            if (lenis) lenis.scrollTo(el, { duration: 1.4, offset: -40 });
            else el.scrollIntoView({ behavior: "smooth", block: "start" });
        };

        if (typeof window.triggerGlobalFog === "function") {
            window.triggerGlobalFog(runScroll);
        } else {
            runScroll();
        }
    };

    const handleBookTony = () => fogScrollTo("#about");
    const handleWinNow = () => fogScrollTo("#programs");

    // ============================================================
    // ⭐ Component Render
    // ============================================================
    return (
        <section
            ref={heroRef}
            id="home"
            role="main"
            aria-label="Hero section"
            className="hero relative w-full flex items-center justify-center overflow-hidden bg-black text-white"
            style={heroStyle}
        >
            {/* Background */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[1]"
                style={bgStyle}
            />

            {/* Slogan */}
            <div style={sloganWrapperStyle}>
                <h1 className="slogan-block" style={sloganTextStyle}>
                    <span className="slogan-line delay-0">The piece</span><br />
                    <span className="slogan-line delay-1">that changes</span><br />
                    <span className="slogan-line delay-2">YOUR game.</span>
                </h1>
            </div>

            {/* CTA BUTTONS */}
            <div style={ctaContainerStyle} className="animate-buttonFloat">
                {/* GET STARTED */}
                <div
                    onClick={handleBookTony}
                    className="relative flex justify-center items-center text-white font-['Press_Start_2P'] cursor-pointer group
                    bg-gradient-to-br from-[#952ca8]/85 to-[#7d1f97]/70 rounded-[10px]
                    border border-white/20 shadow-[0_10px_25px_rgba(177,79,192,0.7)]
                    transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.3,1)]
                    hover:translate-y-[-4px] uppercase tracking-wider"
                    style={ctaButtonSize}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulseGlow rounded-[10px]" />
                    <span className="transition-all duration-500 group-hover:opacity-0">GET</span>
                    <span className="absolute opacity-0 transition-all duration-500 group-hover:opacity-100">STARTED</span>
                </div>

                {/* WIN NOW */}
                <div
                    onClick={handleWinNow}
                    className="relative flex justify-center items-center text-white font-['Press_Start_2P'] cursor-pointer group
                    bg-gradient-to-br from-[#7d1f97]/85 to-[#952ca8]/70 rounded-[10px]
                    border border-white/20 shadow-[0_10px_25px_rgba(155,38,182,0.7)]
                    transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.3,1)]
                    hover:translate-y-[-4px] uppercase tracking-wider"
                    style={ctaButtonSize}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulseGlow rounded-[10px]" />
                    <span className="transition-all duration-500 group-hover:opacity-0">WIN</span>
                    <span className="absolute opacity-0 transition-all duration-500 group-hover:opacity-100">NOW</span>
                </div>
            </div>

            {/* VIDEO WIDGET (desktop only) */}
            {!isMobile && (
                <div
                    className="video-widget group absolute bottom-[3rem] right-[2rem] z-[900003] cursor-pointer select-none"
                    onClick={() => openVideo(verticallo)}
                >
                    <div
                        className="relative rounded-[2cm]
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
            )}

            {/* DESKTOP ARROW ONLY */}
            {!isMobile && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-[5]">
                    <ScrollArrow target="#meet-tony" />
                </div>
            )}

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
