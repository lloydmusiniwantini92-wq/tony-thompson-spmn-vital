import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, Check, User, Mail, Phone, X } from "lucide-react";

// Images (Keep these in src/assets as they are processed by Vite/Webpack)
import step1Img from "../../assets/quiz/step1.jpg";
import step2Img from "../../assets/quiz/step2.jpg";
import step3Img from "../../assets/quiz/step3.jpg";
import step4Img from "../../assets/quiz/step4.jpg";

// === STATIC CONFIGURATION ===
// PDF Path: Since the file is in 'public', we reference it from the root.
const PDF_DOWNLOAD_URL =
    `${import.meta.env.BASE_URL}Mortgage-Broker-Business-Growth-Blueprint.pdf`;

// === STATIC DATA (Moved outside component) ===
const QUIZ_STEPS = [
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
];

const FORM_FIELDS = [
    { label: "Full Name", key: "name", type: "text", icon: User },
    { label: "Email Address", key: "email", type: "email", icon: Mail },
    { label: "Phone Number", key: "phone", type: "tel", icon: Phone },
];

const NOISE_BG = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
};

// === Simulated email sending ===
async function sendPlaybookEmail(form) {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

export default function Quiz() {
    const navigate = useNavigate();

    // === Core Quiz States ===
    const [stepIndex, setStepIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({ name: "", email: "", phone: "" });
    const [, setAnswers] = useState([]);

    // === Form Validation ===
    const [errors, setErrors] = useState({});

    // === Final Popup ===
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // === Redirect Fade + Toast ===
    const [fadeOut, setFadeOut] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Preload heavy component
    useEffect(() => {
        import("../StackBuilder/StackBuilder.jsx").catch(() => { });
    }, []);

    const step = QUIZ_STEPS[stepIndex];
    const stepCount = QUIZ_STEPS.length;

    // === Navigation Handlers ===
    const handleNext = useCallback(() => {
        if (step.isFinal || selected === null) return;
        setAnswers((prev) => [...prev, { step: step.title, choice: selected }]);
        setSelected(null);
        setStepIndex((i) => Math.min(i + 1, stepCount - 1));
    }, [step, selected, stepCount]);

    const handleBack = useCallback(() => {
        setStepIndex((i) => Math.max(i - 1, 0));
    }, []);

    const handleOptionSelect = useCallback((index) => {
        setSelected(index);
    }, []);

    // === Form Handlers ===
    const handleInputChange = useCallback((key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
        setErrors(prev => {
            if (prev[key]) {
                const newErrors = { ...prev };
                delete newErrors[key];
                return newErrors;
            }
            return prev;
        });
    }, []);

    const validateForm = useCallback(() => {
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
        return Object.keys(newErrors).length === 0;
    }, [form]);

    const handleSubmitPreCheck = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setShowPopup(true);
        }
    };

    // === Final Submission Flow ===
    const handleClaim = useCallback(async () => {
        if (!validateForm()) return;

        setLoading(true);
        await sendPlaybookEmail(form);
        setLoading(false);
        setSuccess(true);

        // === DOWNLOAD LOGIC FOR PUBLIC FOLDER ===
        const link = document.createElement("a");
        link.href = PDF_DOWNLOAD_URL;
        link.download = "Mortgage-Broker-Business-Growth-Blueprint.pdf";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Toast + Scroll Lock
        setShowToast(true);
        document.body.style.overflow = "hidden";

        // Fade-out transition
        setTimeout(() => setFadeOut(true), 600);

        // Navigate → Hero (Home)
        setTimeout(() => {
            navigate("/");

            setTimeout(() => {
                const hero = document.querySelector("#home");

                if (hero) {
                    hero.scrollIntoView({ behavior: "instant", block: "start" });
                } else {
                    window.scrollTo({ top: 0, behavior: "instant" });
                }

                // Restore scroll
                document.body.style.overflowY = "auto";
            }, 120);

        }, 1500);

    }, [form, validateForm, navigate]);

    return (
        <section className="relative min-h-screen w-full bg-black text-white overflow-hidden flex">

            {/* === GLOBAL BACKGROUND GRAIN === */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
                style={NOISE_BG}
            />

            {/* === LEFT SIDE: INTERACTION === */}
            <div className="w-full md:w-1/2 min-h-screen flex flex-col relative z-10 bg-black/80 backdrop-blur-sm border-r border-white/5">

                <div className="flex-1 flex flex-col px-6 md:px-16 pt-12 pb-10 scrollbar-hide">

                    {/* HEADER / PROGRESS */}
                    {!step.isFinal && (
                        <div className="flex flex-col gap-6 mb-8 shrink-0">
                            <div className="flex items-center gap-2">
                                {Array.from({ length: stepCount }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-[4px] flex-1 rounded-full bg-white/10 overflow-hidden"
                                    >
                                        <motion.div
                                            className="h-full bg-[#9b26b6] shadow-[0_0_10px_#9b26b6]"
                                            initial={{ width: "0%" }}
                                            animate={{ width: i <= stepIndex ? "100%" : "0%" }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">
                                    Step {stepIndex + 1} / {stepCount}
                                </span>

                                {stepIndex > 0 && (
                                    <button
                                        onClick={handleBack}
                                        className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-1"
                                    >
                                        <ChevronLeft size={14} /> Back
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* CONTENT AREA */}
                    <div className="flex-1 flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {!step.isFinal ? (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                    className="w-full"
                                >
                                    <h1 className="text-[clamp(2rem,4vw,3rem)] font-['Bebas_Neue'] text-white mb-10 leading-[0.9] drop-shadow-lg">
                                        {step.title}
                                    </h1>

                                    <div className="grid grid-cols-1 gap-4">
                                        {step.options.map((opt, i) => {
                                            const active = selected === i;
                                            return (
                                                <motion.button
                                                    key={opt}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    onClick={() => handleOptionSelect(i)}
                                                    className={`
                                                        group relative flex items-center text-left
                                                        w-full p-6 rounded-2xl border transition-all duration-300
                                                        ${active
                                                            ? "bg-[#9b26b6] border-[#9b26b6] shadow-[0_0_30px_rgba(155,38,182,0.4)]"
                                                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                                                        }
                                                    `}
                                                >
                                                    <div className={`
                                                        flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-5 transition-colors
                                                        ${active ? "border-white bg-white text-[#9b26b6]" : "border-white/30 bg-transparent text-transparent"}
                                                    `}>
                                                        <Check size={14} strokeWidth={4} />
                                                    </div>
                                                    <span className={`text-sm md:text-base font-medium leading-relaxed ${active ? "text-white" : "text-white/80"}`}>
                                                        {opt}
                                                    </span>
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            ) : (
                                /* === FINAL STEP === */
                                <motion.div
                                    key="final"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                                    className="w-full max-w-md mx-auto"
                                >
                                    <div className="mb-10 text-center md:text-left">
                                        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-['Bebas_Neue'] leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e0c0ff] to-white drop-shadow-2xl mb-4">
                                            BLUEPRINT READY
                                        </h1>
                                        <p className="text-white/60 text-lg font-light leading-relaxed">
                                            Your custom strategy is locked. Enter your details below to access the secure download.
                                        </p>
                                    </div>

                                    {/* FORM */}
                                    <form onSubmit={handleSubmitPreCheck} className="space-y-5">
                                        {FORM_FIELDS.map((f, i) => (
                                            <motion.div
                                                key={f.key}
                                                className="relative group"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#9b26b6] transition-colors duration-300" />
                                                <input
                                                    type={f.type}
                                                    value={form[f.key]}
                                                    onChange={(e) => handleInputChange(f.key, e.target.value)}
                                                    placeholder={f.label}
                                                    className={`
                                                        w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30
                                                        focus:outline-none focus:border-[#9b26b6] focus:bg-white/10
                                                        focus:shadow-[0_0_20px_rgba(155,38,182,0.2)]
                                                        transition-all duration-300
                                                        ${errors[f.key] ? "border-red-500/50 bg-red-500/5" : ""}
                                                    `}
                                                />
                                                {errors[f.key] && (
                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-red-400 font-bold tracking-wider">
                                                        REQUIRED
                                                    </span>
                                                )}
                                            </motion.div>
                                        ))}

                                        {/* CTA BUTTON */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="pt-4"
                                        >
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="group relative w-full flex justify-center items-center gap-3 py-5 rounded-xl overflow-hidden bg-gradient-to-br from-[#952ca8] to-[#7d1f97] shadow-[0_10px_30px_rgba(155,38,182,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(155,38,182,0.6)]"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulseGlow" />
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] skew-x-[-15deg] group-hover:animate-sheen" />

                                                <span className="font-['Press_Start_2P'] text-[0.8rem] text-white tracking-widest uppercase relative z-10">
                                                    {loading ? "PROCESSING..." : "GET YOUR PLAYBOOK"}
                                                </span>

                                                {!loading && (
                                                    <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                )}
                                            </button>
                                        </motion.div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* === QUESTION NAVIGATION (BOTTOM BAR) === */}
                {!step.isFinal && (
                    <div className="shrink-0 p-6 md:p-10 border-t border-white/5 bg-black/40 backdrop-blur-md flex justify-end translate-x-[-1cm]">
                        <button
                            onClick={handleNext}
                            disabled={selected === null}
                            className={`
                                flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold tracking-wider uppercase transition-all duration-300
                                ${selected === null
                                    ? "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
                                    : "bg-white text-[#9b26b6] shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105"
                                }
                            `}
                        >
                            Next Step <ArrowRight size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* === RIGHT SIDE: IMAGE PANEL === */}
            <div className="hidden md:block w-1/2 relative overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step.image}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={step.image}
                            alt=""
                            className="w-full h-full object-cover opacity-60 grayscale-[20%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-[#7d1f97]/20 mix-blend-overlay" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* === SUCCESS POPUP === */}
            <AnimatePresence>
                {showPopup && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                            onClick={() => setShowPopup(false)}
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 text-center shadow-[0_0_80px_rgba(155,38,182,0.4)] overflow-hidden"
                        >
                            {/* Glow Effect */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-[#9b26b6]/30 blur-[100px]" />

                            <button
                                onClick={() => setShowPopup(false)}
                                className="absolute top-5 right-5 p-2 text-white/50 hover:text-white transition-colors z-30"
                            >
                                <X size={20} />
                            </button>

                            {!success ? (
                                <>
                                    {/* === FIX APPLIED HERE: COPY UPDATED TO MATCH BLUEPRINT REWARD === */}
                                    <h2 className="text-[2.5rem] font-['Bebas_Neue'] text-white mb-4 relative z-10 leading-none">
                                        YOUR GROWTH <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d48bf7] to-[#9b26b6]">
                                            BLUEPRINT IS READY
                                        </span>
                                    </h2>

                                    <p className="text-white/70 mb-10 relative z-10 leading-relaxed">
                                        Based on your responses, we've identified the specific frameworks you need to scale. Access your 120-day growth roadmap below.
                                    </p>

                                    <button
                                        onClick={handleClaim}
                                        className="w-full py-5 rounded-xl bg-white text-black font-bold tracking-widest uppercase hover:bg-[#e0b0ff] transition-colors relative z-10 shadow-lg"
                                    >
                                        UNLOCK MY STRATEGY
                                    </button>
                                </>
                            ) : (
                                <div className="relative z-10 flex flex-col items-center">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", damping: 12 }}
                                        className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-black shadow-[0_0_30px_rgba(74,222,128,0.5)]"
                                    >
                                        <Check size={40} strokeWidth={4} />
                                    </motion.div>

                                    <h2 className="text-4xl font-['Bebas_Neue'] text-white mb-2 tracking-wide">
                                        SUCCESS!
                                    </h2>

                                    <p className="text-white/60 mb-8">
                                        Your download has started automatically.
                                    </p>

                                    <button
                                        onClick={() => setShowPopup(false)}
                                        className="text-white/40 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold"
                                    >
                                        Close Window
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* === FADE-OUT OVERLAY === */}
            <AnimatePresence>
                {fadeOut && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-[99999]"
                        transition={{ duration: 1.1, ease: "easeInOut" }}
                    />
                )}
            </AnimatePresence>

            {/* === TOAST MESSAGE === */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-4 rounded-xl bg-[#0a0a0a]/90 border border-[#9b26b6]/40 shadow-[0_0_30px_rgba(155,38,182,0.4)] z-[99999]"
                    >
                        <p className="font-['Press_Start_2P'] text-[0.6rem] text-[#d0a0ff] tracking-widest uppercase text-center">
                            Your playbook is downloading... Returning you to your next step.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                /* === GLOBAL GLOW ANIMATIONS === */
                @keyframes pulseGlow {
                    0%, 100% { opacity: 0.2; transform: translateX(-20%); }
                    50% { opacity: 0.6; transform: translateX(20%); }
                }
                .animate-pulseGlow { animation: pulseGlow 5s ease-in-out infinite; }

                /* === SHEEN EFFECT === */
                @keyframes sheen {
                    0% { transform: translateX(-200%) skewX(-15deg); }
                    100% { transform: translateX(200%) skewX(-15deg); }
                }
                .group:hover .group-hover\\:animate-sheen {
                    animation: sheen 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                }

                /* === DOWNLOAD → NEXT STEP TOAST === */
                .toast-return {
                    font-family: 'Press_Start_2P', monospace !important;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                }

                /* === FADE-OUT FULL PAGE ANIMATION === */
                @keyframes fadeOutPage { 0% { opacity: 0; } 100% { opacity: 1; } }
                .fadeout-overlay { animation: fadeOutPage 1.1s ease-in-out forwards; }

                /* === SUCCESS CHECKMARK POP === */
                @keyframes checkPop {
                    0% { transform: scale(0) rotate(-180deg); opacity: 0; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }
                .animate-checkPop { animation: checkPop 0.6s cubic-bezier(0.19,1,0.22,1); }

                /* === SCROLLBAR HIDE === */
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

                /* === BODY SCROLL LOCK CLASS === */
                body.lock-scroll { overflow: hidden !important; height: 100vh !important; }
            `}</style>
        </section>
    );
}