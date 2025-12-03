import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TetrisCountdown({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    useEffect(() => {
        if (!targetDate) return;

        // Force ensure date is valid
        const end = new Date(targetDate).getTime();
        if (isNaN(end)) return;

        const update = () => {
            const now = Date.now();
            const distance = end - now;

            if (distance <= 0) {
                setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((distance / (1000 * 60)) % 60);
            const seconds = Math.floor((distance / 1000) % 60);

            setTimeLeft({
                days: String(days).padStart(2, "0"),
                hours: String(hours).padStart(2, "0"),
                minutes: String(minutes).padStart(2, "0"),
                seconds: String(seconds).padStart(2, "0"),
            });
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    // Reusable Block Component with FIXED White/Bold Styling
    const Block = ({ label, value, pulse }) => (
        <motion.div
            animate={{
                scale: pulse ? [1, 1.05, 1] : 1,
                boxShadow: pulse
                    ? [
                        "0 0 0px rgba(155,38,182,0)",
                        "0 0 15px rgba(155,38,182,0.5)",
                        "0 0 0px rgba(155,38,182,0)",
                    ]
                    : "none",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center bg-[#111] border border-[#9b26b6]/30
                       rounded-lg px-3 py-2 min-w-[3.5rem] md:min-w-[4rem] backdrop-blur-md"
        >
            <span className="text-xl md:text-2xl font-bold text-white leading-none">
                {value}
            </span>
            {/* Hardcoded White/Bold Labels for maximum legibility */}
            <span className="text-[0.6rem] font-black uppercase tracking-widest text-white/80 mt-1">
                {label}
            </span>
        </motion.div>
    );

    return (
        <div className="flex items-center justify-center gap-2 md:gap-3">
            <Block label="DAYS" value={timeLeft.days} />
            <span className="text-[#9b26b6] text-xl font-bold pb-4">:</span>

            <Block label="HRS" value={timeLeft.hours} />
            <span className="text-[#9b26b6] text-xl font-bold pb-4">:</span>

            <Block label="MINS" value={timeLeft.minutes} />
            <span className="text-[#9b26b6] text-xl font-bold pb-4">:</span>

            {/* popLayout prevents the '5th box' glitch by removing the old element from flow immediately */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={timeLeft.seconds}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Block label="SECS" value={timeLeft.seconds} pulse />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}