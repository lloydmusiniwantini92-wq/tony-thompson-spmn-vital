// ✅ src/components/TetrisCountdown.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TetrisCountdown({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // === Core timer logic ===
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(targetDate).getTime() - now;

            if (distance <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((distance / (1000 * 60)) % 60);
                const seconds = Math.floor((distance / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    const Block = ({ label, value, pulse }) => (
        <motion.div
            animate={{
                scale: pulse ? [1, 1.08, 1] : 1,
                boxShadow: pulse
                    ? ["0 0 0px rgba(155,38,182,0)", "0 0 10px rgba(155,38,182,0.6)", "0 0 0px rgba(155,38,182,0)"]
                    : "none",
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center bg-[#111]/70 border border-[#9b26b6]/40
                       rounded-md px-[0.4rem] py-[0.3rem] min-w-[2ch]"
        >
            <span className="text-[1rem] sm:text-[1.2rem] font-semibold leading-none text-white">
                {String(value).padStart(2, "0")}
            </span>
            <span className="text-[0.5rem] uppercase tracking-widest text-[#9b26b6]/80 mt-[2px]">{label}</span>
        </motion.div>
    );

    return (
        <div className="flex items-end justify-center gap-[0.4rem] text-white font-mono">
            <Block label="D" value={timeLeft.days} />
            <span className="text-[#9b26b6] text-[1rem]">:</span>
            <Block label="H" value={timeLeft.hours} />
            <span className="text-[#9b26b6] text-[1rem]">:</span>
            <Block label="M" value={timeLeft.minutes} />
            <span className="text-[#9b26b6] text-[1rem]">:</span>

            {/* === Seconds (animated pulse) === */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={timeLeft.seconds}
                    initial={{ y: 6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -6, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.65, 0.05, 0, 1] }}
                >
                    <Block label="S" value={timeLeft.seconds} pulse />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
