import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import meetTonyImg from "../assets/images/meetTony.jpg";

export default function MeetTony() {
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.15, once: true });

    // ⭐ STATE FOR FOG INTERACTION
    const [isHovering, setIsHovering] = useState(false);

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
    };

    const keynoteAnim = {
        hidden: { opacity: 0, letterSpacing: "0.05em" },
        visible: {
            opacity: 1,
            letterSpacing: "0.15em",
            transition: { duration: 1.2, ease: "easeOut" },
        },
    };

    const scrollToJourney = () => {
        const el = document.querySelector("#tony-journey");
        if (!el) return;
        if (window.lenis) {
            window.lenis.scrollTo(el, { offset: -20, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 3) });
        } else {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="meet-tony"
            ref={ref}
            className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col"
            style={{ contain: "layout paint style" }}
        >
            {/* =========================================================
            🌊 BACKGROUND IMAGE (Logic adopted from your file)
            ========================================================= */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.img
                    src={meetTonyImg}
                    alt="Tony Thompson"
                    initial={{ scale: 1.08 }}
                    animate={{
                        scale: isHovering ? 1.04 : 1.08,
                        brightness: isHovering ? 1.08 : 1,
                        x: "4%",
                    }}
                    transition={{ duration: 0.8 }}
                    className="w-[125%] max-w-none h-full object-cover object-[85%_center] will-change-transform"
                />
            </div>

            {/* =========================================================
            ⭐ STATIC GRADIENT
            ========================================================= */}
            <div className="absolute inset-0 z-5 pointer-events-none hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent w-[40%]" />
            </div>

            {/* =========================================================
            🌊 HOVER FOG
            ========================================================= */}
            <motion.div
                className="absolute inset-0 z-10 pointer-events-none will-change-transform"
                animate={{ x: isHovering ? "-38%" : "0%" }}
                transition={{ duration: 0.8 }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#7d1f97] to-transparent w-[70%]" />
            </motion.div>

            {/* =========================================================
            🎮 INTERACTION ZONE — FIX APPLIED HERE
            ========================================================= */}
            <div
                className="absolute top-0 right-0 h-full w-[60%] z-30 hidden md:block cursor-default"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            />

            {/* =========================================================
            📱 MOBILE LAYOUT (FULL CONTENT RETAINED)
            ========================================================= */}
            <div className="relative z-20 flex md:hidden h-screen items-center justify-center text-center text-white pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-[#7d1f97]/90 via-[#000]/40 to-transparent" />

                <div className="relative z-[2] px-[6vw] max-w-[1000px] mt-[3cm] pointer-events-auto">
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="text-[clamp(1.6rem,6vw,2.5rem)] font-extrabold uppercase leading-[0.9] flex justify-center items-center gap-2"
                    >
                        <span className="text-white">MEET</span>
                        <span className="text-[#952ca8] drop-shadow-lg">TONY</span>
                    </motion.h1>

                    <div className="mt-4" />

                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        transition={{ delay: 0.1 }}
                        className="text-[clamp(1.1rem,4vw,1.4rem)] font-semibold tracking-wide text-white/90 uppercase"
                    >
                        KEYNOTE SPEAKER
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        transition={{ delay: 0.15 }}
                        className="mt-6 text-[clamp(1rem,3vw,1.15rem)] leading-[1.6] text-white/90 mx-auto max-w-[46ch]"
                    >
                        Tony Thompson, <span className="font-semibold">CMB</span>, began in HR with Fortune
                        100 companies before becoming a top mortgage originator and founding{" "}
                        <span className="font-semibold text-[#952ca8]">NAMMBA</span>.
                    </motion.p>

                    <motion.div
                        onClick={scrollToJourney}
                        variants={fadeUp}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative mt-[4cm] mx-auto w-fit cursor-pointer group select-none"
                    >
                        <JourneyButton isMobile={true} />
                    </motion.div>
                </div>
            </div>

            {/* =========================================================
            🖥️ DESKTOP LAYOUT
            ========================================================= */}
            <div className="hidden md:flex relative z-20 flex-1 pointer-events-none">
                {/* LEFT PANEL */}
                <div className="w-1/3 flex flex-col justify-center min-h-[60vh] pointer-events-auto">
                    <div className="px-[6vw] py-[6vh] flex flex-col flex-1 text-white">
                        <motion.h1
                            initial={{ opacity: 0, rotateX: 90 }}
                            animate={{
                                opacity: [0.9, 1, 0.9],
                                rotateX: [0, -15, 0, 15, 0],
                                transition: { duration: 48, repeat: Infinity, ease: "easeInOut" },
                            }}
                            style={{ transformOrigin: "center center", perspective: "900px" }}
                            className="ml-[-0.1em] text-[clamp(1.2rem,4vw,3.8rem)] font-extrabold uppercase leading-[0.9] flex items-center gap-4 select-none"
                        >
                            <span className="text-white drop-shadow-md">MEET</span>
                            <span className="text-[#ffffff] drop-shadow-[0_0_15px_rgba(155,38,182,0.6)]">TONY</span>
                        </motion.h1>

                        <div className="mt-6" />

                        <motion.h2
                            variants={keynoteAnim}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            className="text-[clamp(1.1rem,2vw,1.8rem)] font-semibold uppercase text-white/95 tracking-[0.08em] glow-keynote leading-none flex items-baseline gap-2"
                        >
                            <span>KEYNOTE</span>
                            <span>SPEAKER</span>
                        </motion.h2>

                        {/* FULL DESKTOP BIO TEXT */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            className="mt-6 max-w-[46ch] text-[clamp(0.95rem,1.1vw,1.15rem)] leading-[1.55] text-white/95 font-medium drop-shadow-sm"
                        >
                            <p className="mb-4">
                                TONY THOMPSON,{" "}
                                <span className="font-semibold text-[#ffffff] drop-shadow-[0_0_8px_rgba(177,79,192,0.8)]">
                                    CMB
                                </span>{" "}
                                began in HR with Fortune 100 companies before leveling up as a top mortgage
                                originator, helping hundreds of families achieve homeownership every year.
                            </p>

                            <p className="mb-4">
                                He founded{" "}
                                <span className="font-semibold text-[#ffffff] drop-shadow-[0_0_8px_rgba(155,38,182,0.8)]">
                                    NAMMBA
                                </span>
                                , now a national movement with 15 chapters and over 10,000 members,
                                transforming how professionals dominate the $2.9T market.
                            </p>

                            <p className="mb-4">
                                Today, Tony coaches top originators, speaks nationally, and equips leaders to
                                claim their legacy, stack their blocks, and level up their impact.
                            </p>
                        </motion.div>

                        <motion.div
                            onClick={scrollToJourney}
                            variants={fadeUp}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.35 }}
                            className="relative mt-16 md:mt-auto mb-10 w-fit mx-auto md:mx-0 select-none cursor-pointer group"
                            style={{ perspective: "900px" }}
                        >
                            <JourneyButton isMobile={false} />
                        </motion.div>
                    </div>
                </div>

                {/* RIGHT SPACER */}
                <div className="w-2/3" />
            </div>

            <style>{`
                @keyframes pulseGlow {
                    0%,100% { opacity:0.4; transform:translateX(-25%); }
                    50% { opacity:0.9; transform:translateX(25%); }
                }
                .animate-pulseGlow { animation:pulseGlow 6s ease-in-out infinite; }

                @media (min-width: 768px) {
                    .glow-keynote { position: relative; }
                    .glow-keynote::after {
                        content: "";
                        position: absolute;
                        left: 0; right: 0; bottom: -4px; height: 2px;
                        background: linear-gradient(90deg, transparent, #ffffff88, transparent);
                        animation: keynoteUnderline 3s ease-in-out infinite;
                    }
                }

                @keyframes keynoteUnderline {
                    0% { transform: translateX(-40%); opacity: 0; }
                    50% { transform: translateX(0%); opacity: 1; }
                    100% { transform: translateX(40%); opacity: 0; }
                }
            `}</style>
        </section>
    );
}

// ⭐ BUTTON COMPONENT (unchanged)
function JourneyButton({ isMobile }) {
    const desktopClasses =
        "w-[280px] h-[60px] text-[0.8rem] shadow-[0_10px_25px_rgba(155,38,182,0.7),inset_0_2px_6px_rgba(255,255,255,0.3)] hover:translate-y-[-4px] hover:shadow-[0_14px_35px_rgba(155,38,182,0.85),inset_0_2px_10px_rgba(255,255,255,0.4)]";

    const mobileClasses =
        "w-[260px] h-[56px] text-[0.75rem] shadow-[0_10px_25px_rgba(155,38,182,0.7)] hover:translate-y-[-4px]";

    return (
        <div
            className={`
                relative flex justify-center items-center text-white font-['Press_Start_2P'] uppercase tracking-wider
                bg-gradient-to-br from-[#952ca8]/85 to-[#7d1f97]/70 rounded-[1rem] border border-white/20
                transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.3,1)]
                ${isMobile ? mobileClasses : desktopClasses}
            `}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-pulseGlow rounded-[1rem]" />
            <span className="z-10 text-center">EXPLORE HIS JOURNEY</span>
        </div>
    );
}
