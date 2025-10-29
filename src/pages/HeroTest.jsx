import React from "react";
import { motion } from "framer-motion";

export default function HeroTest() {
    return (
        <section
            id="hero"
            className="h-screen flex items-center justify-center bg-black text-white text-6xl font-extrabold"
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
            >
                HERO TEST
            </motion.div>
        </section>
    );
}
