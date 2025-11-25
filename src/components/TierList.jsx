import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizOverlay } from "../context/QuizOverlayContext";
import step5 from "../assets/quiz/step5.jpg";
import TetrisCountdown from "./TetrisCountdown";

export default function TierList() {
    const { openQuiz } = useQuizOverlay();
    const [showCountdown, setShowCountdown] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    /* ===========================================
       COUNTDOWN DATE INITIALIZATION
    ============================================ */
    useEffect(() => {
        const stored = localStorage.getItem("countdownEndDate");
        let date;

        if (stored) {
            const parsed = Date.parse(stored);
            if (!isNaN(parsed)) {
                date = new Date(parsed);
            } else {
                date = new Date();
                date.setDate(date.getDate() + 29);
                localStorage.setItem("countdownEndDate", date.toISOString());
            }
        } else {
            date = new Date();
            date.setDate(date.getDate() + 29);
            localStorage.setItem("countdownEndDate", date.toISOString());
        }
        setEndDate(date);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setShowCountdown(true), 2500);
        return () => clearTimeout(timer);
    }, []);

    /* ===========================================
       SHOW POPUP WHEN PROGRAM SECTION IN VIEW
    ============================================ */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setShowPopup(true);
                });
            },
            { threshold: 0.35 }
        );
        const section = document.querySelector("#programs");
        if (section) observer.observe(section);
        return () => observer.disconnect();
    }, []);

    /* ===========================================
       CLOSE POPUP ON CLICK OUTSIDE
    ============================================ */
    useEffect(() => {
        const handleClick = (e) => {
            const box = document.getElementById("waitlist-popup-box");
            if (showPopup && box && !box.contains(e.target)) {
                setShowPopup(false);
            }
        };
        document.addEventListener("mousedown", handleClick, true);
        return () => document.removeEventListener("mousedown", handleClick, true);
    }, [showPopup]);

    return (
        <section
            id="programs"
            className="relative text-white text-center overflow-hidden"
            style={{
                backgroundImage: `url(${step5})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                backgroundAttachment: "fixed",
            }}
        >
            {/* === TITLE === */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[5]">
                <h2 className="text-5xl font-extrabold tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]">
                    Membership Programs
                </h2>
            </div>

            {/* === TIER CARDS === */}
            <div className="relative z-10 pt-52 pb-32 px-6 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            whileHover={{
                                y: -10,
                                scale: 1.04,
                                boxShadow:
                                    "0 0 70px rgba(155,38,182,0.45), inset 0 0 80px rgba(255,255,255,0.07)",
                            }}
                            transition={{ duration: 0.4, ease: [0.25, 1, 0.3, 1] }}
                            className="relative rounded-[2.5rem]
                                bg-gradient-to-b from-[#1a001e]/90 via-black/80 to-[#120014]/95
                                border border-[#7d1f97]/40 shadow-[0_0_40px_rgba(155,38,182,0.25)]
                                backdrop-blur-[14px] flex flex-col cursor-pointer"
                        >
                            <div className="relative border-b border-[#7d1f97]/30 py-4">
                                <h4 className="text-2xl font-extrabold text-white uppercase tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                                    {tier.name}
                                </h4>
                            </div>

                            {/* CONTENT */}
                            <div className="flex flex-col flex-grow px-8 py-6 text-left">
                                <p className="text-2xl font-semibold mb-4 text-gray-200 pl-5">
                                    {tier.price}
                                </p>

                                <ul className="flex-1 space-y-2 text-sm text-gray-300 mb-8 leading-relaxed tracking-normal">
                                    {tier.features.map((f, idx) => (
                                        <li key={idx} className="flex items-start gap-2 leading-snug">
                                            <span className="text-[#9b26b6] mt-[0.1rem]">✓</span>
                                            <span className="text-white font-medium">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <motion.button
                                onClick={tier.onClick}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.35 }}
                                className="relative mt-auto mb-0 w-full select-none cursor-pointer
                                    text-white font-['Press_Start_2P'] text-[0.85rem] uppercase tracking-wider
                                    bg-gradient-to-br from-[#7d1f97]/85 to-[#952ca8]/70
                                    rounded-b-[2.5rem] border-t border-white/20
                                    shadow-[0_-10px_40px_rgba(155,38,182,0.4),inset_0_2px_6px_rgba(255,255,255,0.3)]
                                    transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.3,1)]
                                    hover:translate-y-[-2px] hover:shadow-[0_-14px_55px_rgba(155,38,182,0.8),inset_0_2px_10px_rgba(255,255,255,0.4)]
                                    will-change-transform overflow-hidden py-6"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulseGlow rounded-b-[2.5rem]" />
                                <span className="relative z-10">{tier.button}</span>
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* === POPUP WITH COUNTDOWN === */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            id="waitlist-popup-box"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
                            className="pointer-events-auto bg-white/95 text-center px-10 py-12 rounded-[1.5rem] border border-[#7d1f97]/40 w-[90%] max-w-[480px]"
                        >
                            {/* === FIXED COUNTDOWN (NO GLITCHES) === */}
                            {showCountdown && endDate && !isNaN(endDate.getTime()) && (
                                <div className="mb-6">
                                    <p className="text-[#7d1f97] font-extrabold text-sm tracking-[0.18em] uppercase mb-2">
                                        Countdown To Launch
                                    </p>
                                    <div className="flex justify-center">
                                        <TetrisCountdown targetDate={endDate} />
                                    </div>
                                </div>
                            )}

                            <h3 className="text-2xl md:text-3xl font-extrabold text-[#7d1f97] mb-6">
                                Your Transformation Starts Here
                            </h3>

                            <p className="text-[#333] text-lg mb-8">
                                Join the Pre-Launch Waitlist now and be the first to access our new program.
                            </p>

                            <button
                                onClick={() =>
                                    window.open("https://lp.constantcontactpages.com/sl/TrUL7SX/elevate", "_blank")
                                }
                                className="relative flex justify-center items-center w-full h-[60px]
                                    text-white font-['Press_Start_2P'] text-[0.8rem] uppercase tracking-wider
                                    bg-gradient-to-br from-[#952ca8]/85 to-[#7d1f97]/70
                                    rounded-[1rem] border border-white/20
                                    shadow-[inset_0_2px_6px_rgba(255,255,255,0.3)]
                                    transition-all duration-[600ms] hover:translate-y-[-3px]"
                            >
                                Join Waitlist
                            </button>

                            <button
                                onClick={() => setShowPopup(false)}
                                className="mt-6 text-sm text-[#7d1f97] font-semibold underline hover:opacity-70"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes pulseGlow {
                    0%,100% { opacity:0.4; transform:translateX(-25%); }
                    50% { opacity:0.9; transform:translateX(25%); }
                }
                .animate-pulseGlow { animation:pulseGlow 6s ease-in-out infinite; }

                @media (max-width: 768px) {
                    .mobile-center {
                        left: 50% !important;
                        transform: translateX(-50%) !important;
                        width: 90% !important;
                    }
                }
            `}</style>
        </section>
    );
}

/* ======================================================
   EXTERNAL LINKS
====================================================== */
const handleAspire = () =>
    window.open("https://lp.constantcontactpages.com/sl/QFIBwKF/aspire", "_blank");

const handleIgnite = () =>
    window.open("https://lp.constantcontactpages.com/sl/RaXnRmj/ignite", "_blank");

const handleElevate = () =>
    window.open("https://lp.constantcontactpages.com/sl/TrUL7SX/elevate", "_blank");

/* ======================================================
   TIER DATA — DYNAMIC PRICE RENDER
====================================================== */
const tiers = [
    {
        name: "ASPIRE",
        price: "Coming Soon",
        button: "WIN NOW →",
        onClick: handleAspire,
        features: [
            "Complimentary NAMMBA Membership ($150 value)",
            "Discount to NAMMBA CONNECT",
            "One tailor-made playbook per year",
            "Local realtor performance data",
            "12 month market forecast",
            "Referral partner leads",
            "Campaign ideas & scripts",
            "Content Library Access",
            "Monthly Sales Mastermind Call",
            "Live group coaching & accountability",
        ],
    },
    {
        name: "IGNITE",
        price: "Coming Soon",
        button: "BOOK A CALL →",
        onClick: handleIgnite,
        features: [
            "All ASPIRE benefits plus:",
            "Complimentary NAMMBA Membership ($150 value)",
            "Discount to NAMMBA CONNECT",
            "Complimentary Ticket to NAMMBA CONNECT",
            "Four quarterly playbooks per year",
            "Multicultural Marketing On Demand",
            "1,700+ social media content pieces",
            "Posting to 10+ platforms",
            "Your brand colors integration",
        ],
    },
    {
        name: "ELEVATE",
        price: "By Invite Only",
        button: "BOOK A CALL →",
        onClick: handleElevate,
        features: [
            "All IGNITE benefits plus:",
            "Monthly coaching with Tony Thompson",
            "Dedicated Project Manager",
            "Industry publication features",
            "Quarterly CEO Leadership Calls",
            "Annual Mastermind Access",
            "Growth CRM for realtor outreach",
        ],
    },
];

const comparisonData = [
    { feature: "Personalized Playbooks", aspire: true, ignite: true, elevate: true },
    { feature: "NAMMBA CONNECT Membership", aspire: true, ignite: true, elevate: true },
    { feature: "Ticket to NAMMBA CONNECT", aspire: false, ignite: true, elevate: true },
    { feature: "Social Media Marketing", aspire: false, ignite: true, elevate: true },
    { feature: "Dedicated Project Manager", aspire: false, ignite: false, elevate: true },
    { feature: "Monthly Coaching", aspire: false, ignite: false, elevate: true },
    { feature: "Leadership Mastermind", aspire: false, ignite: false, elevate: true },
];
