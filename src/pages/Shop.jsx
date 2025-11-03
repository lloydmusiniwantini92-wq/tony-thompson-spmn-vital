// ✅ src/pages/Shop.jsx — SHOP heading visibly moved 2 cm down
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import tonyCap from "../assets/images/tonyCap.jpg";

export default function Shop() {
    const navigate = useNavigate();
    const [isFading, setIsFading] = useState(false);

    const fadeVariants = {
        hidden: { opacity: 0, scale: 1.02 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1.6, ease: [0.25, 1, 0.3, 1] },
        },
    };

    const handleGoToTestimonials = () => {
        if (isFading) return;
        setIsFading(true);
        setTimeout(() => {
            navigate("/?target=#testimonials", { replace: true });
        }, 600);
        setTimeout(() => setIsFading(false), 1800);
    };

    // 1 cm ≈ 37.8 px → 1.5 cm ≈ 56.7 px → 2 cm ≈ 75.6 px
    const imgOffset = 37.8 * 1.5; // still move the picture 1.5 cm up/left
    const headingOffset = 37.8 * 2; // move heading 2 cm down

    return (
        <main className="relative w-full h-screen overflow-hidden bg-black text-white">
            {/* === Background Image (moved 1.5 cm left & up) === */}
            <motion.img
                src={tonyCap}
                alt="Tony Cap Background"
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
                style={{
                    filter: "brightness(1.05) contrast(1.05)",
                    transform: `scale(1.1) translate(${-imgOffset}px, ${-imgOffset}px)`,
                    transition: "transform 1s ease-in-out",
                }}
            />

            {/* === Overlay Gradient === */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* === Fade Overlay for Transition === */}
            <AnimatePresence>
                {isFading && (
                    <motion.div
                        key="fade"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
                        className="fixed inset-0 bg-black z-[9999] pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* === Center Content === */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1.4,
                    ease: [0.25, 1, 0.3, 1],
                    delay: 0.8,
                }}
                className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-8"
            >
                {/* 🟣 SHOP Heading — now actually moved 2 cm down */}
                <motion.h1
                    animate={{ y: headingOffset }}
                    transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
                    className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold text-[#9b26b6]
                     tracking-tight drop-shadow-[0_0_18px_rgba(155,38,182,0.7)]"
                >
                    SHOP
                </motion.h1>

                <button
                    onClick={handleGoToTestimonials}
                    className="px-6 py-3 bg-[#9b26b6] text-white font-semibold rounded-xl
                     hover:scale-105 transition-transform duration-300
                     shadow-[0_0_20px_rgba(155,38,182,0.5)]"
                >
                    YOU WIN!
                </button>
            </motion.div>
        </main>
    );
}
