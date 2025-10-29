import React from "react";
import { motion } from "framer-motion";

/**
 * SectionFade
 * Creates a smooth dark–to–light alternating fade between funnel sections.
 * Usage: Wrap each major section in <SectionFade index={n}>...</SectionFade>
 */
export default function SectionFade({ children, index }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.3, 1] }}
        >
            {/* === Cinematic background wash === */}
            <div
                className={`absolute inset-0 pointer-events-none transition-all duration-[1500ms]
          ${isEven
                        ? "bg-gradient-to-b from-[#000]/80 via-[#100010]/60 to-[#9b26b6]/15"
                        : "bg-gradient-to-b from-[#9b26b6]/20 via-[#100010]/60 to-black/90"}
        `}
            />
            <div className="relative z-10 w-full">{children}</div>
        </motion.div>
    );
}
