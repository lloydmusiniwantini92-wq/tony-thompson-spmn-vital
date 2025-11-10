import React from "react";
import { motion } from "framer-motion";

export default function LetsWin() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-800 to-purple-950 text-white text-center">
            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-6xl md:text-7xl font-bold tracking-wide mb-6"
            >
                LET’S WIN
            </motion.h1>

            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
                This space will soon showcase Tony’s exclusive methods, achievements,
                and next-level success systems.
            </p>
        </section>
    );
}
