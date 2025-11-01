// ✅ src/components/Testimonials.jsx — Circular avatars smaller on mobile only (everything else untouched)
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVideoModal } from "../context/VideoModalContext";
import t1 from "../assets/testimonials/testimonial1.png";
import t2 from "../assets/testimonials/testimonial2.png";
import t3 from "../assets/testimonials/testimonial3.png";
import t4 from "../assets/testimonials/testimonial4.png";
import v1 from "../assets/testimonials/testimonialVideo1.mp4";
import v2 from "../assets/testimonials/testimonialVideo2.mp4";
import v3 from "../assets/testimonials/testimonialVideo3.mp4";
import v4 from "../assets/testimonials/testimonialVideo4.mp4";
import "../styles/testimonials.css";

import mba from "../assets/partners/mba.png";
import nmn from "../assets/partners/nmn.png";
import scotsman from "../assets/partners/scotsman.png";
import inman from "../assets/partners/inman.png";
import mpa from "../assets/partners/mpa.jpg";

export default function Testimonials() {
    const testimonials = [
        {
            id: "horizon",
            img: t1,
            name: "Jane Smith",
            role: "VP, Horizon",
            quote:
                "Working with Tony didn’t just redefine our strategy — it redefined our mindset.",
            video: v1,
        },
        {
            id: "diversegrowth",
            img: t2,
            name: "Mark Lee",
            role: "Founder, DiverseGrowth",
            quote:
                "Tony unlocked a level of confidence and performance we didn’t think possible.",
            video: v2,
        },
        {
            id: "maven",
            img: t3,
            name: "Sophie K.",
            role: "Brand Director, Maven",
            quote:
                "Every interaction with Tony is a masterclass in clarity, focus, and results.",
            video: v3,
        },
        {
            id: "stellar",
            img: t4,
            name: "Lucas Howard",
            role: "Head of Ops, Stellar",
            quote:
                "Tony has that rare precision that moves teams and transforms outcomes.",
            video: v4,
        },
    ];

    const partners = [
        { name: "MBA", logo: mba },
        { name: "National Mortgage News", logo: nmn },
        { name: "Scotsman Guide", logo: scotsman },
        { name: "Inman", logo: inman },
        { name: "MPA", logo: mpa },
    ];

    const [active, setActive] = useState(0);
    const intervalRef = useRef(null);
    const { openVideo } = useVideoModal();

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

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setActive((prev) => (prev + 1) % testimonials.length);
        }, 12000);
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <motion.section
            id="testimonials"
            className="relative flex flex-col items-center justify-center overflow-hidden text-white"
        >
            {/* Heading */}
            <div className="absolute top-[1.2rem] left-1/2 -translate-x-1/2 z-[6]">
                <motion.h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-[0_0_25px_rgba(0,0,0,0.45)] uppercase">
                    Proof Beats Promise
                </motion.h2>
            </div>

            {/* Split Layout */}
            <div className="relative flex flex-col md:flex-row w-full min-h-[100vh] mt-[7rem]">
                {/* LEFT SIDE */}
                <div className="flex-1 flex flex-col justify-start bg-gradient-to-br from-[#9b26b6] via-[#b14fc0] to-[#9b26b6] px-[6vw] pt-[8rem] pb-[5rem] text-left relative overflow-hidden">
                    {/* Quote */}
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
                                <p className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.2] mb-6 md:mb-10 tracking-tight text-white">
                                    “{testimonials[active].quote}”
                                </p>
                                <div className="text-xl md:text-2xl font-semibold tracking-wide">
                                    <span className="text-white font-bold">
                                        {testimonials[active].name}
                                    </span>
                                    <br />
                                    <span className="text-white/80 font-medium">
                                        {testimonials[active].role}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Avatar Cluster */}
                    <div className="absolute bottom-[6rem] left-[8%] flex gap-6 sm:gap-8 z-30 flex-wrap">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.id}
                                onClick={() => {
                                    setActive(i);
                                    openVideoFromTestimonials(t.video);
                                }}
                                whileHover={{
                                    scale: 1.5,
                                    boxShadow:
                                        "0 0 60px rgba(155,38,182,0.9), 0 0 40px rgba(255,255,255,0.2)",
                                }}
                                transition={{ duration: 0.35 }}
                                className={`relative rounded-full overflow-hidden cursor-pointer border-[3px] sm:border-[4px] ${i === active
                                        ? "border-white shadow-[0_0_25px_rgba(255,255,255,0.7)]"
                                        : "border-white/40"
                                    } w-[65px] h-[65px] sm:w-[82px] sm:h-[82px] md:w-[105px] md:h-[105px]`}
                            >
                                <img
                                    src={t.img}
                                    alt={t.name}
                                    className="w-full h-full object-cover"
                                    style={{
                                        filter:
                                            i === active ? "brightness(1.1)" : "brightness(0.85)",
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE VIDEO */}
                <div className="relative flex-1 flex items-center justify-center overflow-hidden group">
                    <AnimatePresence mode="sync">
                        <motion.video
                            key={active}
                            src={testimonials[active].video}
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 2, ease: [0.25, 1, 0.3, 1] }}
                        />
                    </AnimatePresence>

                    <motion.div
                        className="absolute inset-0 bg-[#9b26b6]/0 group-hover:bg-[#9b26b6]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 cursor-pointer"
                        onClick={() => openVideoFromTestimonials(testimonials[active].video)}
                    >
                        <motion.span
                            className="text-white text-2xl md:text-3xl font-extrabold tracking-wider uppercase"
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileHover={{ scale: 1.05, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            ▶ Watch Story
                        </motion.span>
                    </motion.div>
                </div>
            </div>

            {/* Partners */}
            <div className="relative z-10 w-full text-center bg-white pt-[3rem] pb-[5rem]">
                <h3 className="text-xl md:text-2xl font-bold text-[#111] tracking-wider mb-3">
                    Trusted by Industry Leaders
                </h3>
                <h4 className="text-[#9b26b6] text-lg md:text-xl font-semibold mb-8">
                    As Featured In
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-8 max-w-7xl mx-auto items-center justify-items-center">
                    {partners.map((partner) => (
                        <div
                            key={partner.name}
                            className="flex items-center justify-center w-[150px] h-[70px] opacity-90 hover:opacity-100 transition-all duration-500"
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="object-contain w-full h-full"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
