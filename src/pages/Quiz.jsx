// ✅ src/pages/Quiz.jsx — Pop-Out with Animated Success Flow + Seamless TierList Redirect
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuizFooter from "../components/QuizFooter";

import step1Img from "../assets/quiz/step1.jpg";
import step2Img from "../assets/quiz/step2.jpg";
import step3Img from "../assets/quiz/step3.jpg";
import step4Img from "../assets/quiz/step4.jpg";

// Placeholder email send stub — integrate with backend or email API later
async function sendPlaybookEmail(form) {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

export default function Quiz() {
    const [stepIndex, setStepIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({ name: "", email: "", phone: "" });
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [redirecting, setRedirecting] = useState(false);

    const steps = useMemo(
        () => [
            {
                id: 1,
                title: "Which block are you ready to place first?",
                options: [
                    "Financial growth — secure your future, control your wealth.",
                    "Leadership impact — influence teams and clients with confidence.",
                    "Legacy & purpose — make your mark that lasts beyond today.",
                ],
                image: step1Img,
            },
            {
                id: 2,
                title: "Which skill do you want to unlock next?",
                options: [
                    "Personal branding & visibility — get seen and recognized.",
                    "Team leadership & performance — lead stronger, achieve more.",
                    "Mindset & confidence — overcome limits, take bold action.",
                    "Client relationship management — build loyalty and close deals.",
                ],
                image: step2Img,
            },
            {
                id: 3,
                title: "How do you want your next level to play out?",
                options: [
                    "Quick wins — immediate strategies you can implement now.",
                    "Long-term mastery — frameworks for sustained growth.",
                    "Network & connections — learn alongside top professionals.",
                ],
                image: step3Img,
            },
            {
                id: 4,
                title: "Your Tailored Level-Up Plan",
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

    const handleBack = () => setStepIndex((i) => Math.max(i - 1, 0));

    const fade = {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
        exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: "easeIn" } },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const handleClaim = async () => {
        setLoading(true);
        await sendPlaybookEmail(form); // simulate API call
        setLoading(false);
        setSuccess(true);
    };

    // ✅ Universal scrollToPrograms logic (no visible scroll)
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
        // Navigate home with target param so App.jsx listener handles fade/scroll
        window.location.href = `/?target=${encodeURIComponent(target)}`;
    };

    const handleClose = () => {
        setShowPopup(false);
        setRedirecting(true);
        setTimeout(() => {
            scrollToPrograms(); // ✅ fade + param redirect using existing app logic
        }, 1200);
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
                                            <h1 className="text-[40px] md:text-[56px] font-black mb-10 text-white uppercase">
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
                                <motion.form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setShowPopup(true);
                                    }}
                                    className="grid grid-cols-1 gap-8 max-w-xl mx-auto text-white -translate-y-[60px]"
                                >
                                    <motion.h3 className="text-3xl md:text-4xl font-extrabold text-[#9b26b6] drop-shadow-[0_0_25px_rgba(155,38,182,0.5)] mb-4 text-center uppercase">
                                        Your Tailored Level-Up Plan
                                    </motion.h3>

                                    {[
                                        { label: "Full name", type: "text", key: "name", placeholder: "Enter your full name" },
                                        { label: "Email", type: "email", key: "email", placeholder: "Enter your email address" },
                                        { label: "Phone", type: "tel", key: "phone", placeholder: "Enter your phone number" },
                                    ].map((field) => (
                                        <div key={field.key}>
                                            <label className="block text-sm font-semibold mb-2 text-gray-400">{field.label}</label>
                                            <input
                                                required
                                                type={field.type}
                                                value={form[field.key]}
                                                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                                                placeholder={field.placeholder}
                                                className="w-full bg-transparent border-b border-[#9b26b6]/40 text-white placeholder-gray-500 py-3 text-lg focus:outline-none focus:border-[#9b26b6] caret-white transition-all duration-300"
                                            />
                                        </div>
                                    ))}

                                    <motion.button
                                        type="submit"
                                        className="mt-4 inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-bold text-black bg-[#9b26b6] hover:bg-[#b14fc0] border border-[#9b26b6]/80 shadow-[0_0_35px_rgba(155,38,182,0.9)] hover:shadow-[0_0_50px_rgba(177,79,192,0.9)] transition-all duration-500"
                                    >
                                        Get Your Personalized Program → Build Your Next Level Today
                                    </motion.button>

                                    <p className="mt-12 text-center text-gray-300 px-6 leading-relaxed max-w-xl mx-auto">
                                        Take control of your career, business, and life. Receive your complimentary playbook, scorecards, and quizzes — place your first block and start leveling up immediately.
                                    </p>
                                </motion.form>
                            </div>
                        </>
                    )}
                </section>

                {/* === POP-OUT MODAL === */}
                <AnimatePresence>
                    {showPopup && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="bg-white text-black rounded-2xl shadow-[0_0_40px_rgba(155,38,182,0.6)] max-w-lg w-[90%] p-10 text-center relative"
                            >
                                {!success ? (
                                    !loading ? (
                                        <>
                                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#9b26b6] mb-6">
                                                Wow! You’re a Rare Fit for Our Elevate Program
                                            </h2>
                                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                                Only 1 in 50 participants reaches this level — and you’re one of them. Your tailored playbook is ready, and we’re excited to guide you to your next-level growth today.
                                            </p>
                                            <button
                                                onClick={handleClaim}
                                                className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-bold text-white bg-[#9b26b6] hover:bg-[#b14fc0] border border-[#9b26b6]/80 shadow-[0_0_35px_rgba(155,38,182,0.8)] hover:shadow-[0_0_50px_rgba(177,79,192,0.9)] transition-all duration-500"
                                            >
                                                Claim My Tailored Playbook
                                            </button>
                                        </>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex flex-col items-center justify-center py-10"
                                        >
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                                                className="w-12 h-12 border-4 border-[#9b26b6] border-t-transparent rounded-full mb-6"
                                            />
                                            <p className="text-lg text-gray-600">Building your personalized playbook...</p>
                                        </motion.div>
                                    )
                                ) : (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#9b26b6] mb-6">
                                            Your Playbook Is On Its Way!
                                        </h2>
                                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                            We’ve sent your personalized Level-Up Playbook to your inbox. Check your email for your next steps — and welcome to the Elevate community.
                                        </p>
                                        <button
                                            onClick={handleClose}
                                            className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-bold text-white bg-[#9b26b6] hover:bg-[#b14fc0] border border-[#9b26b6]/80 shadow-[0_0_35px_rgba(155,38,182,0.8)] hover:shadow-[0_0_50px_rgba(177,79,192,0.9)] transition-all duration-500"
                                        >
                                            Close
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* === FADE REDIRECT OVERLAY === */}
                <AnimatePresence>
                    {redirecting && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="fixed inset-0 bg-black z-[9999]"
                        />
                    )}
                </AnimatePresence>

                <section className="w-full" id="footerquiz">
                    <QuizFooter />
                </section>
            </motion.div>
        </AnimatePresence>
    );
}
