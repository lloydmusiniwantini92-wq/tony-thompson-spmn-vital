import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TestimonialPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const stories = {
        horizon: {
            title: "Transforming Horizon Group’s Multicultural Strategy",
            img: "https://i.imgur.com/f6x7bQE.jpeg",
            date: "June 2025",
            content: [
                "Horizon Group partnered with Tony to redefine their multicultural outreach strategy — integrating empathy, innovation, and leadership from top to bottom.",
                "Within six months, they achieved a 60% increase in community engagement, and built new brand partnerships grounded in cultural authenticity.",
                "Tony led executive workshops focusing on inclusive leadership and long-term vision execution, transforming culture from the inside out.",
            ],
        },
        diversegrowth: {
            title: "Mentorship and Momentum at DiverseGrowth Initiative",
            img: "https://i.imgur.com/HYDzwHv.png",
            date: "April 2025",
            content: [
                "Under Tony’s mentorship, DiverseGrowth Initiative gained a new rhythm — stronger communication, accountability, and resilience.",
                "Strategic clarity sessions and practical frameworks helped the leadership team align on goals and growth metrics.",
                "Their mentorship program now serves as a model across several professional networks nationwide.",
            ],
        },
        maven: {
            title: "Creative Leadership with Maven Studios",
            img: "https://i.imgur.com/cbXaR5e.jpeg",
            date: "January 2025",
            content: [
                "Tony helped Maven Studios align creativity with purpose, anchoring their brand storytelling in cultural relevance and authenticity.",
                "The new leadership model sparked creative confidence across departments — resulting in an award-winning campaign within months.",
            ],
        },
    };

    const story = stories[id];

    // 🔥 Smooth scroll back to testimonials
    const handleBack = () => {
        navigate("/#testimonials"); // updates URL
        setTimeout(() => {
            const section = document.querySelector("#testimonials");
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            } else {
                // fallback if on a new page
                window.location.href = "/#testimonials";
            }
        }, 100);
    };

    if (!story) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center bg-white text-black">
                <p>Story not found.</p>
                <button
                    onClick={handleBack}
                    className="mt-4 underline text-[#9b26b6]"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-gradient-to-b from-[#9b26b6] via-[#4b125e] to-[#111] text-white flex flex-col"
        >
            {/* === Hero Image === */}
            <div
                className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: `url(${story.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
                    >
                        {story.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-gray-300 text-sm uppercase tracking-[2px]"
                    >
                        {story.date}
                    </motion.p>
                </div>

                {/* Top-left back button */}
                <button
                    onClick={handleBack}
                    className="absolute top-6 left-6 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-5 py-2 rounded-full text-sm tracking-wide backdrop-blur-sm transition-all duration-300"
                >
                    ← Back
                </button>
            </div>

            {/* === Story Content === */}
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.9 }}
                className="flex-grow px-6 md:px-32 py-16 max-w-5xl mx-auto"
            >
                <div className="space-y-6 text-lg leading-relaxed text-gray-100">
                    {story.content.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>

                {/* Divider */}
                <div className="w-24 h-[3px] bg-white/30 rounded-full my-12"></div>

                {/* Bottom back button */}
                <div className="text-center">
                    <button
                        onClick={handleBack}
                        className="inline-block border-2 border-white/70 text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#9b26b6] transition-all duration-300 font-semibold"
                    >
                        ← Back to All Testimonials
                    </button>
                </div>
            </motion.div>
        </motion.section>
    );
}
