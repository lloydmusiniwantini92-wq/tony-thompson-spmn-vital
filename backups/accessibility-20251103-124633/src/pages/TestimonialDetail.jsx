import React from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

import t1 from "../assets/testimonials/testimonial1.png";
import t2 from "../assets/testimonials/testimonial2.png";
import t3 from "../assets/testimonials/testimonial3.png";
import t4 from "../assets/testimonials/testimonial4.png";

export default function TestimonialDetail() {
    const { id } = useParams();

    const testimonials = [
        {
            id: "horizon",
            img: t1,
            quote:
                "Working with Tony redefined how we connect with multicultural audiences. His insight reshaped our strategy from the inside out.",
            name: "Jane Smith",
            role: "VP of Marketing, Horizon Group",
            details:
                "Under Tony's guidance, Horizon Group revolutionized its outreach, resulting in higher resonance and trust among multicultural segments. Tony’s deep empathy and data-driven creativity allowed our brand to finally speak with authenticity.",
        },
        {
            id: "diversegrowth",
            img: t2,
            quote:
                "Tony’s mentorship built confidence and drive across our leadership team. His clarity is second to none.",
            name: "Mark Lee",
            role: "Founder, DiverseGrowth Initiative",
            details:
                "Tony completely restructured our leadership philosophy — replacing doubt with direction. Our organization saw record participation and cultural transformation through his inclusive frameworks.",
        },
        {
            id: "maven",
            img: t3,
            quote:
                "Every session with Tony is transformational — equal parts strategy and soul.",
            name: "Sophie K.",
            role: "Brand Director, Maven Studios",
            details:
                "Tony’s hybrid approach bridged creative instinct with hard metrics, guiding Maven Studios toward its most successful year in storytelling and identity growth.",
        },
        {
            id: "stellar",
            img: t4,
            quote:
                "Tony brings a rare combination of business precision and human insight — the results were phenomenal.",
            name: "Lucas Howard",
            role: "Head of Operations, Stellar Co.",
            details:
                "From culture audits to process design, Tony infused empathy into every aspect of our business model. The transformation wasn’t just operational — it was deeply human.",
        },
    ];

    const current = testimonials.find((t) => t.id === id);
    if (!current)
        return (
            <div className="text-center mt-20 text-white">
                Testimonial not found.{" "}
                <Link to="/#testimonials" className="text-[#9b26b6] underline">
                    Go back
                </Link>
            </div>
        );

    return (
        <motion.section
            className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            {/* === Background with slow breathing zoom === */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${current.img})` }}
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{
                    duration: 18,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />

            {/* === Gentle vignette for contrast === */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/70" />

            {/* === Floating text content === */}
            <motion.div
                className="relative z-10 text-center max-w-3xl px-6 md:px-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 1, 0.3, 1] }}
            >
                <h2 className="text-2xl md:text-4xl font-semibold mb-6 leading-snug">
                    “{current.quote}”
                </h2>
                <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-6">
                    {current.details}
                </p>
                <div className="text-sm md:text-base text-gray-300">
                    <span className="text-[#9b26b6] font-semibold">{current.name}</span> —{" "}
                    {current.role}
                </div>
            </motion.div>

            {/* === Centered bottom button === */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
                <Link
                    to="/#testimonials"
                    className="inline-block px-8 py-3 rounded-full bg-[#9b26b6] hover:bg-[#b14fc0] text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
                >
                    ← Back to Testimonials
                </Link>
            </motion.div>

            {/* === Brand glow === */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,38,182,0.15),transparent_70%)] pointer-events-none" />
        </motion.section>
    );
}
