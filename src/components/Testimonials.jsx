// Testimonials.jsx — Full Updated Version
// Features added:
// ✓ Section-visibility autoplay control
// ✓ Resume-from-last-time for each testimonial video
// ✓ No stalls between transitions
// ✓ Autoplay stops when section out of view
// ✓ Autoplay resumes when re-entered
// ✓ Videos remember timestamps individually

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVideoModal } from "../context/VideoModalContext";

import t1 from "../assets/testimonials/testimonial1.jpg";
import t2 from "../assets/testimonials/testimonial2.jpg";
import t3 from "../assets/testimonials/testimonial3.jpg";
import t4 from "../assets/testimonials/testimonial4.jpg";
import t5 from "../assets/testimonials/testimonial5.jpg";

import v1 from "../assets/testimonials/testimonialVideo1.mp4";
import v2 from "../assets/testimonials/testimonialVideo2.mp4";
import v3 from "../assets/testimonials/testimonialVideo3.mp4";
import v4 from "../assets/testimonials/testimonialVideo4.mp4";
import v5 from "../assets/testimonials/testimonialVideo5.mp4";

export default function Testimonials() {
    const testimonials = [
        { id: "horizon", img: t1, name: "Jane Smith", role: "VP, Horizon", quote: "Working with Tony didn’t just redefine our strategy — it redefined our mindset.", video: v1 },
        { id: "diversegrowth", img: t2, name: "Lermacus Therman", role: "Founder, DiverseGrowth", quote: "Tony unlocked a level of confidence and performance we didn’t think possible.", video: v2 },
        { id: "maven", img: t3, name: "Sophie K.", role: "Brand Director, Maven", quote: "Every interaction with Tony is a masterclass in clarity, focus, and results.", video: v3 },
        { id: "stellar", img: t4, name: "Lucas Howard", role: "Head of Ops, Stellar", quote: "Tony has that rare precision that moves teams and transforms outcomes.", video: v4 },
        { id: "nextgen", img: t5, name: "Alicia Ramos", role: "CEO, NextGen Realty", quote: "The systems Tony built with us turned inspiration into measurable momentum.", video: v5 }
    ];

    const { openVideo } = useVideoModal();
    const [active, setActive] = useState(0);
    const videoRef = useRef(null);
    const sectionRef = useRef(null);
    const intervalRef = useRef(null);

    // Stores last known playback time for each testimonial
    const videoTimes = useRef(Array(testimonials.length).fill(0));

    // Tracks whether the section is visible
    const isVisible = useRef(false);

    // === IntersectionObserver to control autoplay ===
    useEffect(() => {
        const sec = sectionRef.current;
        if (!sec) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible.current = entry.isIntersecting;

                if (entry.isIntersecting) {
                    startAutoplay();
                    resumeActiveVideo();
                } else {
                    stopAutoplay();
                    pauseActiveVideo();
                }
            },
            { threshold: 0.35 }
        );

        observer.observe(sec);
        return () => observer.disconnect();
    }, []);

    // === Resume currently active video from last saved time ===
    const resumeActiveVideo = () => {
        const v = videoRef.current;
        if (!v) return;

        v.currentTime = videoTimes.current[active] || 0;

        setTimeout(() => {
            v.play().catch(() => { });
        }, 50);
    };

    // === Pause and store current time ===
    const pauseActiveVideo = () => {
        const v = videoRef.current;
        if (!v) return;

        videoTimes.current[active] = v.currentTime;
        v.pause();
    };

    // === Autoplay rotation system ===
    const startAutoplay = () => {
        if (intervalRef.current) return;

        intervalRef.current = setInterval(() => {
            goToNext();
        }, 12000);
    };

    const stopAutoplay = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    // === Switch to next testimonial (seamless resume logic) ===
    const goToNext = () => {
        pauseActiveVideo();

        setActive((prev) => {
            const next = (prev + 1) % testimonials.length;
            setTimeout(() => {
                resumeActiveVideo();
            }, 80);
            return next;
        });
    };

    // === Handle manual avatar click ===
    const handleAvatarClick = (i) => {
        pauseActiveVideo();

        setActive(i);

        setTimeout(() => {
            resumeActiveVideo();
        }, 80);
    };

    // === Open video modal and preserve location ===
    const openVideoFromTestimonials = (videoSrc) => {
        const scrollY = window.scrollY;
        openVideo(videoSrc);

        window.addEventListener(
            "focus",
            () => {
                window.scrollTo({ top: scrollY, behavior: "instant" });
                const el = document.querySelector("#testimonials");
                if (el) {
                    window.lenis
                        ? window.lenis.scrollTo(el, { duration: 0.6, offset: -50 })
                        : el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            },
            { once: true }
        );
    };

    return (
        <motion.section
            id="testimonials"
            ref={sectionRef}
            className="relative flex flex-col items-center justify-center overflow-hidden text-white bg-gradient-to-br from-[#7d1f97] via-[#952ca8] to-[#7d1f97]"
            style={{ backgroundColor: "#7d1f97", marginBottom: "-8px", zIndex: 20 }}
        >
            {/* Purple fade overlay */}
            <div className="absolute top-0 left-0 w-full h-[160px] bg-gradient-to-b from-[#9b26b6]/40 via-[#000]/60 to-transparent pointer-events-none z-[5]" />

            {/* Heading */}
            <div className="absolute top-[1.2rem] left-1/2 -translate-x-1/2 z-[25]">
                <motion.h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-[0_0_25px_rgba(0,0,0,0.45)] uppercase">
                    Proof Beats Promise
                </motion.h2>
            </div>

            {/* Split Layout */}
            <div className="relative flex flex-col md:flex-row w-full min-h-[100vh]">

                {/* LEFT SIDE */}
                <div className="flex-1 flex flex-col justify-start px-[6vw] pt-[14rem] pb-[5rem] text-left relative overflow-hidden">
                    <div className="relative z-10 max-w-[700px] min-h-[14rem] md:min-h-[16rem]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.0, ease: [0.25, 1, 0.3, 1] }}
                            >
                                <p className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.2] mb-6 md:mb-10 tracking-tight">
                                    “{testimonials[active].quote}”
                                </p>
                                <div className="text-xl md:text-2xl font-semibold tracking-wide">
                                    <span className="text-white font-bold">{testimonials[active].name}</span>
                                    <br />
                                    <span className="text-white/80 font-medium">{testimonials[active].role}</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Avatars */}
                    <div className="absolute bottom-[6rem] left-[8%] flex gap-6 sm:gap-8 z-30 flex-wrap">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.id}
                                onClick={() => {
                                    handleAvatarClick(i);
                                    openVideoFromTestimonials(t.video);
                                }}
                                whileHover={{
                                    scale: 1.4,
                                    boxShadow: "0 0 40px rgba(155,38,182,0.8), 0 0 20px rgba(255,255,255,0.2)",
                                }}
                                transition={{ duration: 0.35 }}
                                className={`relative rounded-full overflow-hidden cursor-pointer border-[3px] sm:border-[4px] 
                                    ${i === active ? "border-white shadow-[0_0_25px_rgba(255,255,255,0.7)]" : "border-white/40"}
                                    w-[65px] h-[65px] sm:w-[82px] sm:h-[82px] md:w-[105px] md:h-[105px]`}
                            >
                                <img
                                    src={t.img}
                                    alt={t.name}
                                    className="w-full h-full object-cover"
                                    style={{
                                        filter: i === active ? "brightness(1.1)" : "brightness(0.8)",
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Dots */}
                    <div className="absolute bottom-[3rem] left-[8%] flex gap-3 z-30">
                        {testimonials.map((_, i) => (
                            <motion.div
                                key={i}
                                onClick={() => handleAvatarClick(i)}
                                className={`w-[14px] h-[14px] rounded-full cursor-pointer transition-all duration-300 
                                    ${i === active ? "bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.7)]" : "bg-white/40 hover:bg-white/70"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE VIDEO */}
                <div className="relative flex-1 flex items-center justify-center overflow-hidden group">
                    <AnimatePresence mode="wait">
                        <motion.video
                            key={active}
                            ref={videoRef}
                            src={testimonials[active].video}
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            onTimeUpdate={(e) => {
                                videoTimes.current[active] = e.target.currentTime;
                            }}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 2, ease: [0.25, 1, 0.3, 1] }}
                            style={{
                                boxShadow: "inset 0 0 200px rgba(0,0,0,0.3), 0 0 80px rgba(155,38,182,0.3)",
                            }}
                        />
                    </AnimatePresence>

                    <motion.div
                        className="absolute inset-0 z-50 bg-[#7d1f97]/0 group-hover:bg-[#7d1f97]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                        onClick={() => openVideoFromTestimonials(testimonials[active].video)}
                    >
                        <motion.span
                            className="text-white font-['Press_Start_2P'] text-[1.45rem] md:text-[2rem] tracking-[0.2em] uppercase opacity-100"
                            initial={{ scale: 0.9 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            Watch Story
                        </motion.span>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-b from-transparent via-[#9b26b6]/50 to-[#fff] pointer-events-none z-[5]" />
        </motion.section>
    );
}
