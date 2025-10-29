import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuizFooter from "../components/QuizFooter";

import step1Img from "../assets/quiz/step1.jpg";
import step2Img from "../assets/quiz/step2.jpg";
import step3Img from "../assets/quiz/step3.jpg";
import step4Img from "../assets/quiz/step4.jpg";

export default function Quiz() {
    const [stepIndex, setStepIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({ name: "", email: "", phone: "" });
    const [showButton, setShowButton] = useState(true);

    const steps = useMemo(
        () => [
            {
                id: 1,
                title: "What best describes your current career focus?",
                options: [
                    "Building my client base and influence",
                    "Improving my leadership and communication",
                    "Expanding into mentorship or coaching",
                    "Finding better work-life balance",
                ],
                image: step1Img,
            },
            {
                id: 2,
                title: "What motivates you most right now?",
                options: [
                    "Financial growth and recognition",
                    "Creating impact in my community",
                    "Networking with other professionals",
                    "Developing long-term stability",
                ],
                image: step2Img,
            },
            {
                id: 3,
                title: "Which area do you want to strengthen most?",
                options: [
                    "Personal branding & visibility",
                    "Team leadership & performance",
                    "Mindset & confidence",
                    "Client relationship management",
                ],
                image: step3Img,
            },
            {
                id: 4,
                title: "Get your personalized program suggestion",
                isFinal: true,
                image: step4Img,
            },
        ],
        []
    );

    const stepCount = steps.length;
    const step = steps[stepIndex];

    const handleNext = () => {
        if (step.isFinal || selected === null) return;
        setSelected(null);
        setStepIndex((i) => Math.min(i + 1, stepCount - 1));
    };

    const handleBack = () => {
        setStepIndex((i) => Math.max(i - 1, 0));
    };

    // ✅ Use the same universal target mechanism as the rest of the site
    const scrollToPrograms = () => {
        const target = "#programs";
        if (window.location.pathname === "/") {
            const el = document.querySelector("#programs, #tiers, [id*='program']");
            if (el) {
                window.lenis
                    ? window.lenis.scrollTo(el, { duration: 1.4, offset: -20 })
                    : el.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            }
        }
        // Navigate home with target param so App.jsx listener scrolls reliably
        window.location.href = `/?target=${encodeURIComponent(target)}`;
    };

    useEffect(() => {
        const handleScroll = () => {
            const footerQuiz = document.querySelector("#footerquiz");
            if (footerQuiz) {
                const rect = footerQuiz.getBoundingClientRect();
                setShowButton(rect.top >= window.innerHeight * 0.8);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const fade = {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
        exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: "easeIn" } },
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="quiz"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
            >
                <section className="min-h-screen w-full bg-black text-white flex relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#000] via-[#120012] to-[#000] opacity-90" />

                    {!step.isFinal ? (
                        <>
                            {/* === QUESTIONS === */}
                            <div className="w-full md:w-1/2 min-h-screen flex flex-col relative z-10">
                                <div className="flex-1 overflow-y-auto px-6 md:px-16 pt-10 pb-24">
                                    <div className="flex gap-6 mb-10">
                                        {Array.from({ length: stepCount }).map((_, i) => (
                                            <div key={i} className="h-[6px] w-24 rounded-full bg-gray-700 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${i <= stepIndex ? "bg-[#9b26b6]" : "bg-transparent"
                                                        }`}
                                                    style={{
                                                        width:
                                                            i < stepIndex
                                                                ? "100%"
                                                                : i === stepIndex
                                                                    ? "55%"
                                                                    : "0%",
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <AnimatePresence mode="wait">
                                        <motion.div key={step.id} {...fade}>
                                            <p className="text-xs font-semibold tracking-[0.12em] text-gray-400 mb-3">
                                                STEP {stepIndex + 1} OF {stepCount}
                                            </p>
                                            <h1 className="text-[40px] md:text-[56px] font-black mb-10 text-white">
                                                {step.title}
                                            </h1>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {step.options.map((opt, i) => {
                                                    const active = selected === i;
                                                    return (
                                                        <button
                                                            key={opt}
                                                            onClick={() => setSelected(i)}
                                                            className={`group relative flex items-center justify-between rounded-xl border p-5 transition-all ${active
                                                                ? "border-[#9b26b6] bg-[#9b26b6] text-white"
                                                                : "border-gray-600 hover:border-[#9b26b6] hover:bg-[#1a001d]"
                                                                }`}
                                                        >
                                                            <span className="text-[18px] font-semibold pr-10">
                                                                {opt}
                                                            </span>
                                                            <span
                                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${active
                                                                    ? "border-white"
                                                                    : "border-gray-400 group-hover:border-[#9b26b6]"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`w-3.5 h-3.5 rounded-full ${active ? "bg-white" : "bg-transparent"
                                                                        }`}
                                                                />
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="absolute bottom-10 left-0 right-0 flex justify-between px-10">
                                    <button
                                        onClick={handleBack}
                                        disabled={stepIndex === 0}
                                        className="rounded-full px-8 py-3 font-bold bg-[#1a001d] text-white hover:bg-[#9b26b6]/30 transition disabled:opacity-40"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={selected === null}
                                        className={`rounded-full px-8 py-3 font-bold transition ${selected === null
                                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                            : "bg-[#9b26b6] text-white hover:opacity-90 shadow-[0_0_10px_rgba(155,38,182,0.4)]"
                                            }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>

                            {/* === IMAGE SIDE === */}
                            <div className="hidden md:block w-1/2 relative z-0">
                                <div className="sticky top-0 h-screen w-full overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={step.image}
                                            src={step.image}
                                            alt="Quiz visual"
                                            initial={{ opacity: 0, scale: 1.02 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.01 }}
                                            transition={{ duration: 0.6 }}
                                            className="w-full h-full object-cover"
                                        />
                                    </AnimatePresence>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* === FINAL FORM === */}
                            <motion.div className="hidden md:block w-1/2 relative z-0">
                                <motion.img
                                    key={step.image}
                                    src={step.image}
                                    alt="Final Visual"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center relative z-10">
                                <motion.form className="grid grid-cols-1 gap-8 max-w-xl mx-auto text-white -translate-y-[60px]">
                                    <motion.h3 className="text-3xl md:text-4xl font-extrabold text-[#9b26b6] drop-shadow-[0_0_25px_rgba(155,38,182,0.5)] mb-4 text-center">
                                        Your Personalized Program Suggestion
                                    </motion.h3>

                                    {[
                                        { label: "Full name", type: "text", key: "name", placeholder: "Enter your full name" },
                                        { label: "Email", type: "email", key: "email", placeholder: "Enter your email address" },
                                        { label: "Phone", type: "tel", key: "phone", placeholder: "Enter your phone number" },
                                    ].map((field) => (
                                        <div key={field.key}>
                                            <label className="block text-sm font-semibold mb-2 text-gray-400">
                                                {field.label}
                                            </label>
                                            <input
                                                required
                                                type={field.type}
                                                value={form[field.key]}
                                                onChange={(e) =>
                                                    setForm({ ...form, [field.key]: e.target.value })
                                                }
                                                placeholder={field.placeholder}
                                                className="w-full bg-transparent border-b border-[#9b26b6]/40 text-white placeholder-gray-500 py-3 text-lg focus:outline-none focus:border-[#9b26b6] caret-white transition-all duration-300"
                                            />
                                        </div>
                                    ))}
                                </motion.form>

                                <AnimatePresence>
                                    {showButton && (
                                        <motion.button
                                            key="suggestedButton"
                                            onClick={scrollToPrograms}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 30 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            className="fixed bottom-0 right-[10%] mb-6 inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-bold text-black bg-[#9b26b6] hover:bg-[#b14fc0] border border-[#9b26b6]/80 shadow-[0_0_35px_rgba(155,38,182,0.9)] hover:shadow-[0_0_50px_rgba(177,79,192,0.9)] transition-all duration-500"
                                        >
                                            View Your Suggested Program →
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    )}
                </section>

                <section className="w-full" id="footerquiz">
                    <QuizFooter />
                </section>
            </motion.div>
        </AnimatePresence>
    );
}
