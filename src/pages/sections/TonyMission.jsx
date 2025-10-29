import React from "react";
import { motion } from "framer-motion";
import missionBg from "../../assets/images/mission.jpg"; // ✅ Background image

export default function TonyMission() {
    return (
        <section
            id="mission"
            className="relative w-full min-h-screen flex flex-col justify-center items-center
                bg-black text-white overflow-hidden"
        >
            {/* === BACKGROUND IMAGE === */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <img
                    src={missionBg}
                    alt="Tony Thompson Mission"
                    className="w-full h-full object-cover object-center brightness-[0.9] contrast-[1.1]"
                    loading="lazy"
                />
                {/* Subtle gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
            </motion.div>

            {/* === TITLE === */}
            <motion.h2
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.3, ease: [0.25, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="text-[clamp(3rem,8vw,8rem)] font-extrabold text-white text-center mb-8
                    tracking-tight leading-[1] drop-shadow-[0_0_35px_rgba(0,0,0,0.6)] z-[2]
                    font-['Press_Start_2P'] md:font-sans"
            >
                THE MISSION CODE
            </motion.h2>

            {/* === BODY TEXT === */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
                className="max-w-3xl text-center text-base md:text-lg text-gray-300 leading-relaxed
                    px-6 font-light tracking-wide z-[2]"
            >
                To architect pathways where talent meets transformation. <br />
                Tony’s mission isn’t to create followers — it’s to develop leaders. <br />
                Every idea, system, and framework he builds amplifies human excellence.
            </motion.p>

            {/* === LIGHT FLOOR === */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[20vh]
                bg-gradient-to-t from-black/50 via-transparent to-transparent z-[1]"
            />
        </section>
    );
}
