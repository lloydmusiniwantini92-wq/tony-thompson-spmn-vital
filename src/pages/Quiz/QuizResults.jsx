import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function QuizResults() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const archetype = state?.profile?.archetype || "Visionary";
    const focus = state?.profile?.focus || "Business Development";

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10"
        >
            <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-5xl font-extrabold text-[#9b26b6] mb-10"
            >
                Your Strategic Identity: {archetype}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="text-2xl text-white/80 max-w-[800px] text-center mb-10"
            >
                Your biggest growth opportunity is in: <span className="text-white">{focus}</span>
            </motion.p>

            <motion.button
                onClick={() => navigate("/programs")}
                whileHover={{ scale: 1.05 }}
                className="px-10 py-4 rounded-full text-black font-bold 
                bg-gradient-to-br from-[#952ca8] to-[#7d1f97]"
            >
                See Programs
            </motion.button>
        </motion.section>
    );
}
