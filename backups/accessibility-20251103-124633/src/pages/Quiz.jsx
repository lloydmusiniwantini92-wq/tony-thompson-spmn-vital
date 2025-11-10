// ✅ src/pages/Quiz.jsx — Final Form with Real-Time Validation + “Get Win” Buttons + Edge Handling
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import QuizFooter from "../components/QuizFooter";

import step1Img from "../assets/quiz/step1.jpg";
import step2Img from "../assets/quiz/step2.jpg";
import step3Img from "../assets/quiz/step3.jpg";
import step4Img from "../assets/quiz/step4.jpg";

async function sendPlaybookEmail(form) {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

export default function Quiz() {
    const navigate = useNavigate();
    const [stepIndex, setStepIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({ name: "", email: "", phone: "" });
    const [errors, setErrors] = useState({});
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

    // 🧠 Real-time validation
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{7,15}$/;

        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required.";
        if (!form.email.trim()) newErrors.email = "Email is required.";
        else if (!emailRegex.test(form.email)) newErrors.email = "Invalid email format.";
        if (!form.phone.trim()) newErrors.phone = "Phone is required.";
        else if (!phoneRegex.test(form.phone.replace(/\D/g, "")))
            newErrors.phone = "Enter a valid phone number.";
        setErrors(newErrors);
    }, [form]);

    const handleClaim = async () => {
        if (Object.keys(errors).length > 0) return;
        setLoading(true);
        await sendPlaybookEmail(form);
        setLoading(false);
        setSuccess(true);
    };

    const handleClose = () => {
        setShowPopup(false);
        setRedirecting(true);
        setTimeout(() => navigate("/?target=#tiers"), 1200);
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
                                <div className="flex-1 overflow-y-auto px-6 md:px-16 pt-10 pb-32 md:pb-28">
                                    {/* Progress Bar */}
                                    <div className="flex gap-6 mb-10">
                                        {Array.from({ length: stepCount }).map((_, i) => (
                                            <div key={i} className="h-[6px] w-24 rounded-full bg-gray-700 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${i <= stepIndex ? "bg-[#9b26b6]" : "bg-transparent"
                                                        }`}
                                                    style={{
                                                        width:
                                                            i < stepIndex ? "100%" : i === stepIndex ? "55%" : "0%",
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Question + Options */}
                                    <AnimatePresence mode="wait">
                                        <motion.div key={step.id} {...fade}>
                                            <p className="text-xs font-semibold tracking-[0.12em] text-gray-400 mb-3">
                                                STEP {stepIndex + 1} OF {stepCount}
                                            </p>
                                            <h1 className="text-[32px] md:text-[48px] font-black mb-8 text-white uppercase">
                                                {step.title}
                                            </h1>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {step.options.map((opt, i) => {
                                                    const active = selected === i;
                                                    return (
                                                        <button
                                                            key={opt}
                                                            onClick={() => setSelected(i)}
                                                            className={`group relative flex items-center justify-between rounded-xl border p-4 md:p-5 transition-all ${active
                                                                    ? "border-[#9b26b6] bg-[#9b26b6] text-white"
                                                                    : "border-gray-600 hover:border-[#9b26b6] hover:bg-[#1a001d]"
                                                                }`}
                                                            style={{ fontSize: "clamp(0.9rem, 1vw, 1.05rem)" }}
                                                        >
                                                            <span className="font-semibold pr-6">{opt}</span>
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

                                {/* Navigation Buttons */}
                                <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 md:px-16 z-30">
                                    <button
                                        onClick={handleBack}
                                        disabled={stepIndex === 0}
                                        className="rounded-full w-[160px] md:w-[180px] h-[54px] font-bold 
                                        bg-gradient-to-br from-[#b14fc0]/90 to-[#9b26b6]/80 
                                        text-white uppercase shadow-[0_0_25px_rgba(155,38,182,0.7)] 
                                        border border-white/20 hover:opacity-90 transition-all duration-500 
                                        disabled:opacity-40"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={selected === null}
                                        className={`rounded-full w-[160px] md:w-[180px] h-[54px] font-bold uppercase transition-all duration-500 
                                        border border-white/20 shadow-[0_0_25px_rgba(155,38,182,0.7)] 
                                        ${selected === null
                                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                                : "bg-gradient-to-br from-[#b14fc0]/90 to-[#9b26b6]/80 text-white hover:opacity-90"
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
                            {/* === FINAL FORM WITH LIVE VALIDATION === */}
                            <motion.div className="hidden md:block w-1/2 relative z-0">
                                <motion.img key={step.image} src={step.image} alt="Final Visual" className="w-full h-full object-cover" />
                            </motion.div>

                            <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center relative z-10">
                                <motion.form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (Object.keys(errors).length === 0) setShowPopup(true);
                                    }}
                                    className="grid grid-cols-1 gap-8 max-w-xl mx-auto text-white px-6 md:px-12"
                                >
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7, ease: "easeOut" }}
                                        className="text-3xl md:text-4xl font-extrabold text-[#9b26b6] drop-shadow-[0_0_25px_rgba(155,38,182,0.5)] mb-8 text-center uppercase leading-tight"
                                    >
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
                                                className={`w-full bg-transparent border-b text-white placeholder-gray-500 py-3 text-lg focus:outline-none caret-white transition-all duration-300 ${errors[field.key]
                                                        ? "border-red-500 focus:border-red-500"
                                                        : form[field.key]
                                                            ? "border-[#9b26b6]"
                                                            : "border-[#9b26b6]/40"
                                                    }`}
                                            />
                                            {errors[field.key] && (
                                                <p className="text-xs text-red-500 mt-1">{errors[field.key]}</p>
                                            )}
                                        </div>
                                    ))}

                                        <motion.button
                                            type="submit"
                                            disabled={loading}
                                            className={`mt-4 inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-bold 
        text-black bg-gradient-to-br from-[#b14fc0] to-[#9b26b6]
        border border-[#9b26b6]/80 shadow-[0_0_35px_rgba(155,38,182,0.9)] 
        hover:shadow-[0_0_50px_rgba(177,79,192,0.9)] transition-all duration-500 
        uppercase ${loading ? "opacity-60 cursor-wait" : "hover:opacity-90"}`}
                                        >
                                            {loading
                                                ? "Submitting..."
                                                : "Get Your Personalized Program → Build Your Next Level Today"}
                                        </motion.button>

                                </motion.form>
                            </div>
                        </>
                    )}
                </section>

                {/* === POPUP MODAL === */}
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
                                                Only 1 in 50 participants reaches this level — and you’re one of them.
                                            </p>
                                            <button
                                                onClick={handleClaim}
                                                disabled={Object.keys(errors).length > 0}
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
                                            Check your inbox for your next steps — welcome to the Elevate community.
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

                {/* === FADE REDIRECT === */}
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
