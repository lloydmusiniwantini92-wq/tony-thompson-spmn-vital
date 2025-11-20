import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
    const [answers, setAnswers] = useState([]);
    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        import("../pages/StackBuilder/StackBuilder.jsx").catch(() => { });
    }, []);

    const steps = useMemo(
        () => [
            {
                id: 1,
                title: "Business Development",
                options: [
                    "I want to build predictable systems for attracting high-value clients.",
                    "I need strategies to scale partnerships and close more deals.",
                    "I want to strengthen leadership and team accountability.",
                    "I’m ready to turn my network into revenue.",
                ],
                image: step1Img,
            },
            {
                id: 2,
                title: "Marketing",
                options: [
                    "I need a marketing engine that brings in qualified leads daily.",
                    "I want to clarify my message and dominate my niche.",
                    "I’m ready to automate and scale my marketing.",
                    "I want to boost visibility and become the go-to authority.",
                ],
                image: step2Img,
            },
            {
                id: 3,
                title: "Profitability",
                options: [
                    "I want to increase revenue without burning out my team.",
                    "I need frameworks to cut waste and improve margins.",
                    "I’m ready to turn one-time sales into recurring income.",
                    "I want to make every dollar I spend return 3x.",
                ],
                image: step3Img,
            },
            {
                id: 4,
                title: "Recruiting",
                options: [
                    "I want to attract top performers who stay and grow.",
                    "I need systems to streamline hiring and onboarding.",
                    "I’m ready to build a culture that drives retention and performance.",
                    "I want my team aligned, motivated, and delivering results fast.",
                ],
                image: step4Img,
            },
            { id: 5, title: "Your Tailored Level-Up Plan", isFinal: true, image: step4Img },
        ],
        []
    );

    const stepCount = steps.length;
    const step = steps[stepIndex];

    const handleNext = () => {
        if (step.isFinal || selected === null) return;
        setAnswers((prev) => [...prev, { step: step.title, choice: selected }]);
        setSelected(null);
        setStepIndex((i) => Math.min(i + 1, stepCount - 1));
    };

    const handleBack = () => setStepIndex((i) => Math.max(i - 1, 0));

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneDigits = (form.phone || "").replace(/\D/g, "");
        const phoneRegex = /^\d{7,15}$/;
        const newErrors = {};
        if (!form.name?.trim()) newErrors.name = "Name is required.";
        if (!form.email?.trim()) newErrors.email = "Email is required.";
        else if (!emailRegex.test(form.email)) newErrors.email = "Invalid email format.";
        if (!form.phone?.trim()) newErrors.phone = "Phone is required.";
        else if (!phoneRegex.test(phoneDigits)) newErrors.phone = "Enter a valid phone number.";
        setErrors(newErrors);
        return newErrors;
    };

    const deriveProfile = (answers) => {
        const scores = { Visionary: 0, Challenger: 0, Harmonizer: 0 };
        answers.forEach((a) => {
            const i = a.choice;
            if (a.step.includes("Business")) {
                if (i <= 1) scores.Visionary++;
                else scores.Challenger++;
            } else if (a.step.includes("Marketing")) {
                if (i <= 1) scores.Visionary++;
                else scores.Harmonizer++;
            } else if (a.step.includes("Profit")) {
                if (i <= 1) scores.Challenger++;
                else scores.Harmonizer++;
            } else if (a.step.includes("Recruit")) {
                if (i <= 1) scores.Harmonizer++;
                else scores.Visionary++;
            }
        });
        const archetype = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
        const focus = answers[answers.length - 1]?.step || "Business Development";
        return { archetype, focus };
    };

    const handleClaim = async () => {
        if (Object.keys(validateForm()).length > 0) return;
        setLoading(true);
        await sendPlaybookEmail(form);
        setLoading(false);
        setSuccess(true);

        // Auto-download PDF immediately
        const link = document.createElement("a");
        link.href = "/Mortgage-Broker-Business-Growth-Blueprint.pdf";
        link.download = "Mortgage-Broker-Business-Growth-Blueprint.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const handleClose = () => setShowPopup(false);

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
                            {/* Questions */}
                            <div className="w-full md:w-1/2 min-h-screen flex flex-col relative z-10">
                                <div className="flex-1 overflow-y-auto px-6 md:px-16 pt-10 pb-32 md:pb-28">
                                    <div className="flex gap-6 mb-10">
                                        {Array.from({ length: stepCount }).map((_, i) => (
                                            <div key={i} className="h-[6px] w-24 rounded-full bg-gray-700 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${i <= stepIndex ? "bg-[#7d1f97]" : "bg-transparent"}`}
                                                    style={{
                                                        width: i < stepIndex ? "100%" : i === stepIndex ? "55%" : "0%",
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={step.id}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -16 }}
                                            transition={{ duration: 0.45, ease: "easeOut" }}
                                        >
                                            <p className="text-xs font-semibold tracking-[0.12em] text-gray-400 mb-3">
                                                STEP {stepIndex + 1} OF {stepCount}
                                            </p>
                                            <h1 className="text-[32px] md:text-[48px] font-black mb-8 text-white uppercase">
                                                {step.title}
                                            </h1>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {step.options?.map((opt, i) => {
                                                    const active = selected === i;
                                                    return (
                                                        <button
                                                            key={opt}
                                                            onClick={() => setSelected(i)}
                                                            className={`group relative flex flex-col justify-center items-center 
                                                                text-center rounded-xl border transition-all duration-500
                                                                font-semibold tracking-tight leading-snug px-6 py-8 
                                                                min-h-[150px] md:min-h-[180px] h-full 
                                                                ${active
                                                                    ? "border-[#7d1f97] bg-[#7d1f97] text-white"
                                                                    : "border-gray-600 hover:border-[#7d1f97] hover:bg-[#1a001d]"
                                                                }`}
                                                            style={{
                                                                fontSize: "clamp(1rem, 1.05vw, 1.1rem)",
                                                                lineHeight: "1.4",
                                                            }}
                                                        >
                                                            <span className="block mb-4">{opt}</span>
                                                            <span
                                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                                                                    ${active
                                                                        ? "border-white"
                                                                        : "border-gray-400 group-hover:border-[#7d1f97]"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`w-3.5 h-3.5 rounded-full ${active ? "bg-white" : "bg-transparent"}`}
                                                                />
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Nav Buttons */}
                                <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 md:px-16 z-30">
                                    <button
                                        onClick={handleBack}
                                        disabled={stepIndex === 0}
                                        className="rounded-full w-[160px] md:w-[180px] h-[54px] font-bold 
                                            bg-gradient-to-br from-[#952ca8]/90 to-[#7d1f97]/80 
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
                                                : "bg-gradient-to-br from-[#952ca8]/90 to-[#7d1f97]/80 text-white hover:opacity-90"
                                            }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>

                            {/* Image */}
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
                            {/* Final Form */}
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
                                        const errs = validateForm();
                                        if (Object.keys(errs).length === 0) setShowPopup(true);
                                    }}
                                    className="grid grid-cols-1 gap-8 max-w-xl mx-auto text-white px-6 md:px-12"
                                >
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7, ease: "easeOut" }}
                                        className="text-3xl md:text-4xl font-extrabold text-[#7d1f97] mb-8 text-center uppercase leading-tight"
                                    >
                                        Your Tailored Level-Up Plan
                                    </motion.h3>

                                    {[{ label: "Full name", key: "name", type: "text", placeholder: "Enter your full name" },
                                    { label: "Email", key: "email", type: "email", placeholder: "Enter your email address" },
                                    { label: "Phone", key: "phone", type: "tel", placeholder: "Enter your phone number" }].map((f) => (
                                        <div key={f.key}>
                                            <label className="block text-sm font-semibold mb-2 text-gray-400">{f.label}</label>
                                            <input
                                                type={f.type}
                                                value={form[f.key]}
                                                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                                                placeholder={f.placeholder}
                                                className={`w-full bg-transparent border-b text-white placeholder-gray-500 py-3 text-lg focus:outline-none caret-white ${errors[f.key]
                                                    ? "border-red-500"
                                                    : form[f.key]
                                                        ? "border-[#7d1f97]"
                                                        : "border-[#7d1f97]/40"
                                                    }`}
                                            />
                                            {errors[f.key] && <p className="text-xs text-red-500 mt-1">{errors[f.key]}</p>}
                                        </div>
                                    ))}

                                    <motion.button
                                        type="submit"
                                        disabled={loading}
                                        className={`mt-4 inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-bold 
                                            text-black bg-gradient-to-br from-[#952ca8] to-[#7d1f97]
                                            border border-[#7d1f97]/80 shadow-[0_0_35px_rgba(155,38,182,0.9)] 
                                            hover:shadow-[0_0_50px_rgba(177,79,192,0.9)] transition-all duration-500 
                                            uppercase ${loading ? "opacity-60 cursor-wait" : "hover:opacity-90"}`}
                                    >
                                        {loading ? "Submitting..." : "Get Your Personalized Program → Build Your Next Level Today"}
                                    </motion.button>
                                </motion.form>
                            </div>
                        </>
                    )}
                </section>

                {/* Popup */}
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
                                transition={{ duration: 0.5 }}
                                className="bg-white text-black rounded-2xl shadow-[0_0_40px_rgba(155,38,182,0.6)] max-w-lg w-[90%] p-10 text-center"
                            >
                                {!success ? (
                                    !loading ? (
                                        <>
                                            {/* 🔥 UPDATED TEXT — AS YOU REQUESTED */}
                                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#7d1f97] mb-6 leading-tight">
                                                You Could Be an Ideal Fit for Our Elevate Program
                                            </h2>

                                            <p className="text-lg text-gray-700 mb-4">
                                                Only 1 in 50 participants reach this level — and you’re one of them.
                                            </p>

                                            <p className="text-lg text-gray-700 mb-8">
                                                Let’s chat today and explore your next step.
                                            </p>

                                            {/* 🔥 UPDATED BUTTON */}
                                            <button
                                                onClick={handleClaim}
                                                className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-bold text-white bg-[#7d1f97] hover:bg-[#952ca8] border border-[#7d1f97]/80 shadow-[0_0_35px_rgba(155,38,182,0.8)] transition-all duration-500"
                                            >
                                                Download My Growth Blueprint →
                                            </button>
                                        </>
                                    ) : (
                                        <motion.div className="flex flex-col items-center justify-center py-10">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                                                className="w-12 h-12 border-4 border-[#7d1f97] border-t-transparent rounded-full mb-6"
                                            />
                                            <p className="text-lg text-gray-600">
                                                Preparing your growth blueprint...
                                            </p>
                                        </motion.div>
                                    )
                                ) : (
                                    <motion.div>
                                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#7d1f97] mb-6">
                                            Your Blueprint Is Ready!
                                        </h2>

                                        <p className="text-lg text-gray-700 mb-6">
                                            Your download has started automatically.
                                        </p>

                                        <button
                                            onClick={handleClose}
                                            className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-bold text-[#7d1f97] border border-[#7d1f97]/80 hover:bg-[#7d1f97]/10 transition-all duration-500"
                                        >
                                            Close
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
}
