import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useDevice } from "../../context/DeviceContext";

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
    const tier = useDevice();
    const isLowDevice = tier === "low";

    const [hovered, setHovered] = useState(false);
    const [pool, setPool] = useState([komba1, komba2, img3, img4, t1, t2, t3, img2]);
    const topTiles = pool.slice(0, 4);
    const bottomTiles = pool.slice(4, 8);

    useEffect(() => {
        if (hovered && !isLowDevice) {
            setPool((prev) => {
                const next = [...prev];
                const topIndex = Math.floor(Math.random() * 4);
                const bottomIndex = 4 + Math.floor(Math.random() * 4);
                [next[topIndex], next[bottomIndex]] = [next[bottomIndex], next[topIndex]];
                return next.map((src) => `${src}?t=${Date.now()}`);
            });
        }
    }, [hovered, isLowDevice]);

    const handleGoToPrograms = () => {
        const targetId = "programs";
        const isHome =
            window.location.pathname === "/" ||
            window.location.pathname.endsWith("/tony-thompson-spmn-vital/");
        if (isHome) {
            const el = document.getElementById(targetId);
            if (el) {
                const lenis = window.lenis;
                if (lenis && !isLowDevice) lenis.scrollTo(el, { duration: 1.3, offset: -40 });
                else el.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            const params = new URLSearchParams();
            params.set("target", targetId);
            window.location.href = `${import.meta.env.BASE_URL}?${params.toString()}`;
        }
    };

    const TShape = ({ tiles, delay = 0, size = "md" }) => {
        const base = size === "sm" ? "w-[80px] h-[80px]" : "w-[100px] h-[100px] md:w-[120px] md:h-[120px]";
        const gap = size === "sm" ? "gap-3" : "gap-5";
        const mt = size === "sm" ? "mt-2" : "mt-3";

        return (
            <div className={`grid grid-cols-3 ${gap} justify-items-center`}>
                {tiles.slice(0, 3).map((src, i) => (
                    <motion.div
                        key={`${src}-${i}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: delay + i * 0.1,
                            duration: isLowDevice ? 0.4 : 0.6,
                        }}
                        className={`${base} rounded-xl overflow-hidden shadow-[0_0_14px_rgba(0,0,0,0.3)]`}
                    >
                        <img src={src} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                ))}
                <div className={`col-span-3 flex justify-center ${mt}`}>
                    <motion.div
                        key={tiles[3]}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: delay + 0.3,
                            duration: isLowDevice ? 0.4 : 0.6,
                        }}
                        className={`${base} rounded-xl overflow-hidden shadow-[0_0_14px_rgba(0,0,0,0.3)]`}
                    >
                        <img src={tiles[3]} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                </div>
            </div>
        );
    };

    const glowBlur = isLowDevice ? "blur-[60px]" : "blur-[150px]";
    const glowOpacity = isLowDevice ? 0.2 : 0.5;

    return (
        <>
            {/* MOBILE VERSION */}
            <section
                id="cta-mobile"
                className="md:hidden relative w-full min-h-screen flex flex-col justify-between items-center bg-[#7d1f97] text-white overflow-hidden"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [glowOpacity / 2, glowOpacity, glowOpacity / 2] }}
                    transition={{
                        duration: isLowDevice ? 2 : 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={`absolute w-[600px] h-[600px] bg-[#952ca8]/30 ${glowBlur} rounded-full -z-10`}
                />

                <motion.h2
                    initial={{ opacity: 0, scale: 1.05, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: isLowDevice ? 1 : 1.4,
                        ease: "easeOut",
                    }}
                    className="text-center px-4 font-extrabold uppercase text-[clamp(1.8rem,5vw,2.6rem)] leading-tight tracking-tight drop-shadow-[0_0_20px_rgba(0,0,0,0.3)] mt-16"
                >
                    WHAT THE TOP 10% <br /> DO DIFFERENTLY
                </motion.h2>

                <div className="flex flex-col gap-10 mt-8">
                    <TShape tiles={topTiles} delay={0.1} size="sm" />
                    <TShape tiles={bottomTiles} delay={0.4} size="sm" />
                </div>

                <motion.div
                    onClick={handleGoToPrograms}
                    onMouseEnter={() => !isLowDevice && setHovered(true)}
                    onMouseLeave={() => !isLowDevice && setHovered(false)}
                    whileHover={
                        !isLowDevice
                            ? {
                                backgroundColor: "#fff",
                                color: "#7d1f97",
                                scale: 1.04,
                                boxShadow: "0 0 28px rgba(155,38,182,0.9)",
                            }
                            : {}
                    }
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="mt-10 mb-10 w-[96px] h-[96px] flex flex-col items-center justify-center rounded-xl border-2 border-white/40 text-white font-bold text-[1rem] uppercase tracking-wider cursor-pointer select-none"
                >
                    <motion.span
                        key={hovered ? "win" : "you"}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="font-extrabold text-[1.3rem]"
                    >
                        {hovered ? "WIN" : "YOU"}
                    </motion.span>
                </motion.div>

                <div className="w-full flex flex-col items-center px-6 pb-6">
                    <p className="text-white/80 text-sm mb-3">Skills. Careers. Legacy. Built.</p>
                    <div className="flex justify-center gap-4 mb-6">
                        {[Facebook, Instagram, Linkedin, Twitter, Youtube].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-[36px] h-[36px] bg-black rounded-full flex items-center justify-center opacity-85 hover:opacity-100 transition"
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <img src={logoTT} alt="Tony Thompson Logo" className="w-[120px] object-contain opacity-95" />
                    </motion.div>
                </div>
            </section>

            {/* DESKTOP VERSION */}
            <section
                id="cta"
                className="hidden md:flex relative w-full min-h-screen flex-col justify-between items-center bg-[#7d1f97] text-white overflow-hidden"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [glowOpacity / 2, glowOpacity, glowOpacity / 2] }}
                    transition={{
                        duration: isLowDevice ? 2 : 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={`absolute w-[900px] h-[900px] bg-[#952ca8]/30 ${glowBlur} rounded-full -z-10`}
                />

                <motion.h2
                    initial={{ opacity: 0, scale: 1.05, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: isLowDevice ? 1 : 1.6,
                        ease: "easeOut",
                    }}
                    className="absolute text-left font-['Press_Start_2P'] md:font-sans font-extrabold uppercase
          text-[clamp(2.2rem,6vw,6rem)] leading-[1] tracking-tight text-white
          drop-shadow-[0_0_20px_rgba(0,0,0,0.2)] z-[2]"
                    style={{ top: "2.9cm", left: "1.8cm", transform: "rotate(-3deg)" }}
                >
                    WHAT THE TOP 10 %<br className="hidden sm:block" />
                    DO DIFFERENTLY
                </motion.h2>

                <div style={{ position: "absolute", transform: "translate(13cm, 3.5cm)" }}>
                    <TShape tiles={topTiles} delay={0.1} />
                </div>
                <div style={{ position: "absolute", transform: "translate(4cm, 12.5cm)" }}>
                    <TShape tiles={bottomTiles} delay={0.4} />
                </div>

                <motion.div
                    onClick={handleGoToPrograms}
                    onMouseEnter={() => !isLowDevice && setHovered(true)}
                    onMouseLeave={() => !isLowDevice && setHovered(false)}
                    whileHover={
                        !isLowDevice
                            ? {
                                backgroundColor: "#fff",
                                color: "#7d1f97",
                                scale: 1.08,
                                boxShadow: "0 0 35px rgba(155,38,182,0.9)",
                            }
                            : {}
                    }
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="absolute right-[13.5vw] bottom-[23.9vh]
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
                                className="w-[30px] h-[30px] bg-black rounded-full flex items-center justify-center opacity-85 hover:opacity-100 transition"
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: isLowDevice ? 0.8 : 1.2, ease: "easeOut" }}
                    className="absolute bottom-[1cm] right-[1cm]"
                >
                    <img src={logoTT} alt="Tony Thompson Logo" className="w-[180px] sm:w-[80px] md:w-[80px] object-contain opacity-95" />
                </motion.div>
            </section>
        </>
    );
}
