import React from "react";
import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, className = "" }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 60 }}             // a bit deeper entrance
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.1,                         // slightly longer cinematic timing
                delay,
                ease: [0.25, 1, 0.3, 1],               // same “Tony Thompson” cubic curve
            }}
            viewport={{ once: true, amount: 0.2 }}      // trigger slightly earlier
        >
            {children}
        </motion.div>
    );
}
