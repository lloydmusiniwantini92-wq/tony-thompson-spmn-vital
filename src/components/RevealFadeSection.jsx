// src/components/RevealFadeSection.jsx
import React from "react";
import { motion } from "framer-motion";
import "../styles/revealFade.css";

export default function RevealFadeSection({ children }) {
    return (
        <motion.div
            className="reveal-section relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.4,
                ease: [0.25, 1, 0.3, 1],
            }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="fade-overlay top" />
            {children}
            <div className="fade-overlay bottom" />
        </motion.div>
    );
}
