import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    Youtube,
} from "lucide-react";

import img1 from "../../assets/testimonials/testimonial1.png";
import img2 from "../../assets/testimonials/testimonial2.png";
import img3 from "../../assets/testimonials/testimonial3.png";
import img4 from "../../assets/testimonials/testimonial4.png";
import logoTT from "../../assets/images/logoTT.png";

export default function TonyCTA() {
    const [hovered, setHovered] = useState(false);

    // ✅ Navigate via unified target param (works from any route)
    const handleScrollToPrograms = () => {
        const target = "#programs";
        if (window.location.pathname === "/") {
            const el = document.querySelector(target);
            if (el) {
                if (window.lenis) {
                    window.lenis.scrollTo(el, { duration: 1.2, offset: -60 });
                } else {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        } else {
            window.location.href = `/?target=${encodeURIComponent(target)}`;
        }
    };

    const tiles = [img1, img2, img3, img4];

    const TShape = ({ delay = 0 }) => (
        <div className="grid grid-cols-3 gap-5">
            {tiles.slice(0, 3).map((src, i) => (
                <motion.div
                    key={`top-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: delay + i * 0.1, duration: 0.6 }}
                    className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px]
                        rounded-xl overflow-hidden shadow-[0_0_14px_rgba(0,0,0,0.3)]"
                >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                </motion.div>
            ))}
            <div className="col-span-3 flex justify-center mt-3">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: delay + 0.3, duration: 0.6 }}
                    className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px]
                        rounded-xl overflow-hidden shadow-[0_0_14px_rgba(0,0,0,0.3)]"
                >
                    <img src={img4} alt="" className="w-full h-full object-cover" />
                </motion.div>
            </div>
        </div>
    );

    return (
        <section
            id="cta"
            className="relative w-full min-h-screen flex flex-col justify-between items-center
                bg-[#9b26b6] text-white overflow-hidden"
        >
            {/* === Glow === */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.25, 0.5, 0.25] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[900px] h-[900px] bg-[#b14fc0]/30 blur-[150px] rounded-full -z-10"
            />

            {/* === Title === */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="absolute font-talisman font-extrabold text-left text-white leading-[1.1]
                    text-[clamp(2rem,6vw,4rem)] max-w-[90vw]"
                style={{
                    left: "2cm",
                    top: "1.5cm",
                    letterSpacing: "0.0015em",
                }}
            >
                What the Top 10 % <br className="hidden sm:block" />
                Do Differently
            </motion.h2>

            {/* === T Shapes === */}
            <div style={{ position: "absolute", transform: "translate(12cm, 2cm)" }}>
                <TShape delay={0.1} />
            </div>
            <div style={{ position: "absolute", transform: "translate(2cm, 10cm)" }}>
                <TShape delay={0.4} />
            </div>

            {/* === YOU / WIN Tile === */}
            <motion.div
                onClick={handleScrollToPrograms}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                whileHover={{
                    backgroundColor: "#fff",
                    color: "#9b26b6",
                    scale: 1.08,
                    boxShadow: "0 0 25px rgba(255,255,255,0.9)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="absolute right-[9.4vw] bottom-[35.5vh]
                    w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px]
                    flex flex-col items-center justify-center
                    rounded-xl border-2 border-white/40 text-white
                    font-p2 text-[1rem] uppercase tracking-wider cursor-pointer select-none"
            >
                <motion.span
                    key={hovered ? "win" : "you"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="font-extrabold text-[1.25rem] sm:text-[1.4rem] md:text-[1.5rem]"
                >
                    {hovered ? "WIN" : "YOU"}
                </motion.span>
            </motion.div>

            {/* === Subtext + Icons === */}
            <div className="absolute bottom-[6vh] left-[8vw] text-left">
                <p className="text-white/80 text-xs sm:text-sm md:text-base mb-4">
                    Skills. Careers. Legacy. Built.
                </p>
                <div className="flex gap-4">
                    {[Facebook, Instagram, Linkedin, Twitter, Youtube].map((Icon, i) => (
                        <a
                            key={i}
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[30px] h-[30px] bg-black rounded-full flex items-center justify-center
                                opacity-85 hover:opacity-100 transition"
                        >
                            <Icon size={16} />
                        </a>
                    ))}
                </div>
            </div>

            {/* === Logo === */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute bottom-[1.5cm] right-[1.5cm]"
            >
                <img
                    src={logoTT}
                    alt="Tony Thompson Logo"
                    className="w-[180px] sm:w-[200px] md:w-[220px] object-contain opacity-95"
                />
            </motion.div>
        </section>
    );
}
