// ✅ src/pages/ThankYou.jsx — Brand-Aligned + Dynamic Tier Detection
import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function ThankYou() {
    // === Get ?plan query from URL ===
    const query = new URLSearchParams(useLocation().search);
    const plan = query.get("plan");

    // === Normalize the plan name ===
    const planName = plan ? plan.toUpperCase() : "OUR COMMUNITY";

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center text-center text-white bg-black overflow-hidden"
            style={{
                backgroundImage:
                    "radial-gradient(circle at 50% 20%, rgba(155,38,182,0.25), transparent 60%), linear-gradient(to bottom, #000, #0a0010 80%)",
            }}
        >
            {/* === Glowing backdrop orbs === */}
            <div className="absolute w-[700px] h-[700px] bg-[#9b26b6]/20 rounded-full blur-[160px] top-1/4 left-1/2 -translate-x-1/2 z-0" />
            <div className="absolute w-[400px] h-[400px] bg-[#9b26b6]/15 rounded-full blur-[120px] bottom-10 left-20 z-0" />
            <div className="absolute w-[400px] h-[400px] bg-[#9b26b6]/15 rounded-full blur-[120px] bottom-10 right-20 z-0" />

            {/* === Fade-in content === */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 1, 0.3, 1] }}
                className="relative z-10 px-6"
            >
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-[0_0_25px_rgba(155,38,182,0.4)]">
                    Thank You for Joining{" "}
                    <motion.span
                        className="text-[#9b26b6]"
                        animate={{ textShadow: ["0 0 10px #9b26b6", "0 0 25px #b84ed9", "0 0 10px #9b26b6"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {planName}
                    </motion.span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                    You’re officially part of Tony Thompson’s {planName} program.
                    <br />
                    Our team will reach out soon with your personalized next steps and exclusive updates.
                    We’re thrilled to have you as part of the movement.
                </p>

                <Link
                    to="/"
                    className="inline-block px-10 py-4 text-lg font-semibold rounded-full bg-[#9b26b6] hover:bg-[#b84ed9] text-white shadow-[0_0_25px_rgba(155,38,182,0.4)] transition-all duration-300"
                >
                    ← Back to Home
                </Link>
            </motion.div>

            {/* === Subtle gradient footer bar === */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#9b26b6]/10 to-transparent pointer-events-none" />
        </section>
    );
}
