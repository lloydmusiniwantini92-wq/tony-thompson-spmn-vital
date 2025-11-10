// ✅ src/components/MeetTony.jsx — Mobile text & button lowered by 3 cm (desktop untouched)
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import meetTonyImg from "../assets/images/meetTony.jpg";

export default function MeetTony() {
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.15, once: true });
    const navigate = useNavigate();

    useEffect(() => {
        const img = new Image();
        img.src = meetTonyImg;
    }, []);

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
    };
    const zPop = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1.1 } },
    };

    return (
        <section
            id="meet-tony"
            ref={ref}
            className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col"
            style={{ contain: "layout paint style" }}
        >
            {/* =========================================================
               📱 MOBILE — fused hero (Tony image BG + purple overlay)
               ========================================================= */}
            <div className="relative flex md:hidden h-screen items-center justify-center text-center text-white">
                {/* BG image */}
                <motion.img
                    src={meetTonyImg}
                    alt="Tony Thompson"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 1.05 }}
                    transition={{ duration: 2.0, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* soft purple overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#9b26b6]/60 via-[#000]/50 to-transparent" />

                {/* Foreground content */}
                <div className="relative z-[2] px-[6vw] max-w-[1000px] mt-[3cm]">
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="text-[clamp(3rem,10vw,5rem)] font-extrabold uppercase leading-[0.9] flex flex-wrap justify-center gap-4"
                    >
                        <span className="text-white">MEET</span>
                        <span className="text-[#b14fc0]">TONY</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        transition={{ delay: 0.15 }}
                        className="mt-6 text-[clamp(1rem,3vw,1.15rem)] leading-[1.6] text-white/90 mx-auto max-w-[46ch]"
                    >
                        Tony Thompson, <span className="font-semibold">CMB</span>, began in HR with Fortune 100
                        companies before becoming a top mortgage originator and founding{" "}
                        <span className="font-semibold text-[#b14fc0]">NAMMBA</span>, a national movement of
                        10 000 + members in a $2.9 T market.
                    </motion.p>

                    <motion.div
                        onClick={() => navigate("/about-tony")}
                        variants={fadeUp}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative mt-[4cm] mx-auto w-fit cursor-pointer group select-none"
                    >
                        <div
                            className="relative flex justify-center items-center w-[260px] h-[56px]
                                text-white font-['Press_Start_2P'] text-[0.75rem] uppercase tracking-wider
                                bg-gradient-to-br from-[#b14fc0]/85 to-[#9b26b6]/70
                                rounded-[1rem] border border-white/20
                                shadow-[0_10px_25px_rgba(155,38,182,0.7)]
                                transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.3,1)]
                                hover:translate-y-[-4px]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-pulseGlow rounded-[1rem]" />
                            <span className="z-10 text-center">STEP INTO TONY’S WORLD</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* =========================================================
               🖥️ DESKTOP — original untouched
               ========================================================= */}
            <div className="hidden md:flex relative z-10 flex-1">
                {/* LEFT COLUMN */}
                <div className="w-1/3 bg-gradient-to-b from-[#9b26b6]/85 via-[#9b26b6]/70 to-[#b14fc0]/85 flex flex-col justify-between md:justify-center min-h-[60vh]">
                    <div className="px-[6vw] py-[6vh] flex flex-col flex-1 text-white">
                        <motion.h1
                            variants={fadeUp}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            className="ml-[-0.1em] text-[clamp(2.8rem,9vw,9rem)] font-extrabold leading-[0.9] uppercase text-white"
                        >
                            MEET
                        </motion.h1>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            className="mt-6 max-w-[46ch] text-[clamp(0.95rem,1.1vw,1.15rem)] leading-[1.55] text-white/95"
                        >
                            <p className="mb-4">
                                TONY THOMPSON,{" "}
                                <span className="font-semibold text-[#ffffff] drop-shadow-[0_0_8px_rgba(177,79,192,0.8)]">
                                    CMB
                                </span>{" "}
                                began in HR with Fortune 100 companies before leveling up as a top mortgage originator,
                                helping hundreds of families achieve homeownership every year.
                            </p>
                            <p className="mb-4">
                                He founded{" "}
                                <span className="font-semibold text-[#ffffff] drop-shadow-[0_0_8px_rgba(155,38,182,0.8)]">
                                    NAMMBA
                                </span>
                                , now a national movement with 15 chapters and over 10 000 members, transforming how
                                professionals dominate the $2.9 T market.
                            </p>
                            <p className="mb-4">
                                Today, Tony coaches top originators, speaks nationally, and equips leaders to claim
                                their legacy, stack their blocks, and level up their impact.
                            </p>
                        </motion.div>

                        <motion.div
                            onClick={() => navigate("/about-tony")}
                            variants={fadeUp}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.35 }}
                            className="relative mt-16 md:mt-auto mb-10 w-fit mx-auto md:mx-0 select-none cursor-pointer group"
                            style={{ perspective: "900px", willChange: "transform" }}
                        >
                            <div
                                className="relative flex justify-center items-center w-[280px] h-[60px]
                                    text-white font-['Press_Start_2P'] text-[0.8rem] uppercase tracking-wider
                                    bg-gradient-to-br from-[#b14fc0]/85 to-[#9b26b6]/70
                                    rounded-[1rem] border border-white/20
                                    shadow-[0_10px_25px_rgba(155,38,182,0.7),inset_0_2px_6px_rgba(255,255,255,0.3)]
                                    transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.3,1)]
                                    hover:translate-y-[-4px] hover:shadow-[0_14px_35px_rgba(155,38,182,0.85),inset_0_2px_10px_rgba(255,255,255,0.4)]
                                    will-change-transform overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-pulseGlow rounded-[1rem]" />
                                <div className="relative z-10 flex items-center gap-3">
                                    <span className="transition-all duration-500 group-hover:opacity-100 text-center">
                                        STEP INTO TONY’S WORLD
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="relative w-2/3 flex items-start justify-start bg-black md:min-h-[100vh] min-h-[70vh] overflow-hidden">
                    <motion.img
                        src={meetTonyImg}
                        alt="Tony Thompson"
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{
                            opacity: inView ? 1 : 0,
                            scale: inView ? 1 : 1.04,
                        }}
                        transition={{ duration: 2.0 }}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />

                    <motion.div
                        variants={zPop}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="px-[4vw] pt-[6vh] relative z-20 text-center md:text-left md:ml-[220px]"
                    >
                        <h2
                            className="text-[clamp(2.8rem,9vw,9rem)] font-extrabold leading-[0.9]
                                tracking-[0.02em] uppercase text-white"
                        >
                            TONY
                        </h2>
                    </motion.div>
                </div>

                {/* WHITE DOTS (desktop only) */}
                <motion.div
                    animate={{ opacity: 1 }}
                    style={{ left: "calc(33.333% - 1vw)" }}
                    className="pointer-events-none select-none absolute z-20 top-[6.5vh] text-white
                        text-[clamp(2.8rem,9vw,9rem)] font-extrabold leading-[0.9]
                        hidden md:block"
                >
                    ...
                </motion.div>
            </div>

            {/* 🔁 Button Animation Styles */}
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
