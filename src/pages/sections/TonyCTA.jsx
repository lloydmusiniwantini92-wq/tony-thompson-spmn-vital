import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

import img1 from "../../assets/testimonials/testimonial1.png";
import img2 from "../../assets/testimonials/testimonial2.png";
import img3 from "../../assets/testimonials/testimonial3.png";
import img4 from "../../assets/testimonials/testimonial4.png";
import komba1 from "../../assets/images/komba1.jpg";
import komba2 from "../../assets/images/komba2.jpg";
import logoTT from "../../assets/images/logoTT.png";

const t1 = `${import.meta.env.BASE_URL}assets/t1.jpg`;
const t2 = `${import.meta.env.BASE_URL}assets/t2.jpg`;
const t3 = `${import.meta.env.BASE_URL}assets/t3.jpg`;

export default function TonyCTA() {
    const [hovered, setHovered] = useState(false);
    const [pool, setPool] = useState([komba1, komba2, img3, img4, t1, t2, t3, img2]);

    const topTiles = pool.slice(0, 4);
    const bottomTiles = pool.slice(4, 8);

    useEffect(() => {
        if (hovered) {
            setPool((prev) => {
                const next = [...prev];
                const topIndex = Math.floor(Math.random() * 4);
                const bottomIndex = 4 + Math.floor(Math.random() * 4);
                [next[topIndex], next[bottomIndex]] = [next[bottomIndex], next[topIndex]];
                return next.map((src) => `${src}?t=${Date.now()}`);
            });
        }
    }, [hovered]);

    /* =========================================================
       🧭 Scroll or Navigate to PROGRAMS Section (Fog + cross-page fix)
       ========================================================= */
    const handleGoToPrograms = () => {
        const target = "#programs";

        // === If already on homepage ===
        if (window.location.pathname === "/") {
            const el = document.querySelector(target);
            if (el) {
                const lenis = window.lenis;
                if (lenis) lenis.scrollTo(el, { duration: 1.3, offset: -40 });
                else el.scrollIntoView({ behavior: "smooth" });
                return;
            }
        }

        // === If on another page: use fade pre-mount scroll ===
        const params = new URLSearchParams();
        params.set("target", target);
        window.location.href = `/?${params.toString()}`;
    };

    const TShape = ({ tiles, delay = 0 }) => (
        <div className="grid grid-cols-3 gap-5">
            {tiles.slice(0, 3).map((src, i) => (
                <motion.div
                    key={`${src}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: delay + i * 0.1, duration: 0.6 }}
                    className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px]
                        rounded-xl overflow-hidden shadow-[0_0_14px_rgba(0,0,0,0.3)]"
                >
                    <motion.img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    />
                </motion.div>
            ))}
            <div className="col-span-3 flex justify-center mt-3">
                <motion.div
                    key={tiles[3]}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: delay + 0.3, duration: 0.6 }}
                    className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px]
                        rounded-xl overflow-hidden shadow-[0_0_14px_rgba(0,0,0,0.3)]"
                >
                    <motion.img
                        src={tiles[3]}
                        alt=""
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    />
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

            {/* === Heading === */}
            <motion.h2
                initial={{ opacity: 0, scale: 1.05, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                className="absolute text-left font-['Press_Start_2P'] md:font-sans font-extrabold uppercase
                    text-[clamp(2.2rem,6vw,6rem)] leading-[1] tracking-tight text-white
                    drop-shadow-[0_0_20px_rgba(0,0,0,0.2)] z-[2]"
                style={{
                    top: "2.9cm",
                    left: "1.8cm",
                    transform: "rotate(-3deg)",
                }}
            >
                WHAT THE TOP 10 %<br className="hidden sm:block" />
                DO DIFFERENTLY
            </motion.h2>

            {/* === Dual Ts === */}
            <div style={{ position: "absolute", transform: "translate(12cm, 2cm)" }}>
                <TShape tiles={topTiles} delay={0.1} />
            </div>
            <div style={{ position: "absolute", transform: "translate(2cm, 10cm)" }}>
                <TShape tiles={bottomTiles} delay={0.4} />
            </div>

            {/* === YOU / WIN Button (now goes to Programs) === */}
            <motion.div
                onClick={handleGoToPrograms}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                whileHover={{
                    backgroundColor: "#fff",
                    color: "#9b26b6",
                    scale: 1.08,
                    boxShadow: "0 0 35px rgba(155,38,182,0.9)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="absolute right-[16vw] bottom-[35.5vh]
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

                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 0.6, scale: 1.4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 rounded-xl bg-[#9b26b6]/60 blur-[25px] -z-10"
                    />
                )}
            </motion.div>

            {/* === Footer Icons === */}
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
