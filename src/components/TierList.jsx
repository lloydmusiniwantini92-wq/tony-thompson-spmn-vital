import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizOverlay } from "../context/QuizOverlayContext";
import step5 from "../assets/quiz/step5.jpg";
import TetrisCountdown from "./TetrisCountdown";
import { loadStripe } from "@stripe/stripe-js";

// ✅ Stripe setup (sandbox)
const stripePromise = loadStripe(
    "pk_test_51SLRY52NRAQRhNmZ0wCRTrCoRHb3uiX2lWLh7M3zk9M5QsaPnqEK4aHwJlvIwcSeiIeRhVjshFHQPqbRAB6Cv5Gz00HvVfoNXq"
);

// === Create a checkout session for ASPIRE only ===
async function startCheckout(priceId) {
    try {
        const stripe = await stripePromise;
        const response = await fetch("http://localhost:4242/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ priceId }),
        });

        const data = await response.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            console.error("Stripe checkout error:", data.error);
            alert("Something went wrong — check console for details.");
        }
    } catch (err) {
        console.error("Checkout request failed:", err);
        alert("Checkout failed — verify your local Stripe server is running.");
    }
}

export default function TierList() {
    const { openQuiz } = useQuizOverlay();
    const [showCountdown, setShowCountdown] = useState(false);
    const [endDate, setEndDate] = useState(null);

    // === Countdown logic ===
    useEffect(() => {
        const stored = localStorage.getItem("countdownEndDate");
        let date;
        if (stored) date = new Date(stored);
        else {
            date = new Date();
            date.setDate(date.getDate() + 29);
            localStorage.setItem("countdownEndDate", date.toISOString());
        }
        setEndDate(date);
    }, []);

    useEffect(() => {
        const delayTimer = setTimeout(() => setShowCountdown(true), 2500);
        return () => clearTimeout(delayTimer);
    }, []);

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
            {/* === SECTION TITLE === */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[5]">
                <h2 className="text-5xl font-extrabold tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]">
                    Membership Programs
                </h2>
            </div>

            {/* === COUNTDOWN === */}
            <AnimatePresence>
                {showCountdown && endDate && (
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 1.1, ease: [0.25, 1, 0.3, 1] }}
                        className="
              absolute top-[calc(12vh+0.6cm)] left-[calc(14.5%+0.1cm)]
              w-[18.5%] text-center flex flex-col items-center z-[8]
              scale-[0.88] sm:scale-[0.93] md:scale-[0.97] lg:scale-100
              md:left-[calc(14.5%+0.1cm)]
              mobile-center
            "
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-white font-extrabold text-[0.48rem] md:text-[0.52rem]
                tracking-[0.15em] uppercase mb-[0.25rem] w-full mt-[0.3rem]"
                        >
                            Limited Aspire Offer Ends In
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.1, delay: 0.2 }}
                            className="inline-flex justify-center items-center w-full px-[0.3rem] pb-[0.4rem]"
                        >
                            <TetrisCountdown targetDate={endDate} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                border border-[#9b26b6]/40 shadow-[0_0_40px_rgba(155,38,182,0.25)]
                backdrop-blur-[14px] flex flex-col cursor-pointer"
                        >
                            <motion.div
                                animate={{
                                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                                }}
                                transition={{
                                    duration: 8,
                                    ease: "linear",
                                    repeat: Infinity,
                                }}
                                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(155,38,182,0.08),transparent_70%)] pointer-events-none"
                            />

                            <div className="relative border-b border-[#9b26b6]/30 py-4">
                                <h4 className="text-2xl font-extrabold text-white uppercase tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                                    {tier.name}
                                </h4>
                            </div>

                            <div className="flex flex-col flex-grow px-8 py-6 text-left">
                                <p className="text-2xl font-semibold mb-4 text-gray-200 text-center">
                                    {tier.price}
                                </p>
                                <ul className="flex-1 space-y-2 text-sm text-gray-300 mb-8">
                                    {tier.features.map((f, idx) => (
                                        <li key={idx}>✓ {f}</li>
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
                  bg-gradient-to-br from-[#9b26b6]/85 to-[#b14fc0]/70
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

            {/* === COMPARISON CHART === */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="relative z-[5] overflow-hidden
          bg-gradient-to-b from-[#9b26b6]/90 via-[#7f1aa1]/90 to-[#1a001e]/95
          border-t border-[#9b26b6]/50 pt-14 pb-24 px-4 md:px-12"
            >
                <h3 className="relative text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f2e0ff] to-white tracking-tight mb-12 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                    Compare Programs
                </h3>

                {/* DESKTOP TABLE */}
                <div className="hidden md:block">
                    <div className="relative max-w-7xl mx-auto overflow-x-auto border border-white/10 backdrop-blur-[2px]">
                        <div className="grid grid-cols-4 min-w-[900px] divide-x divide-white/20 border-t border-b border-white/15">
                            <div></div>
                            {["ASPIRE", "IGNITE", "ELEVATE"].map((tier, i) => (
                                <div
                                    key={i}
                                    className="py-6 text-[1.35rem] font-extrabold uppercase text-center tracking-widest bg-[#9b26b6]/25 text-white border-b border-white/10"
                                >
                                    {tier}
                                </div>
                            ))}
                            {comparisonData.map((row, i) => (
                                <React.Fragment key={i}>
                                    <div className="text-left text-sm md:text-base py-5 px-4 text-white/90 border-t border-white/10 bg-[#7f1aa1]/20">
                                        {row.feature}
                                    </div>
                                    {["aspire", "ignite", "elevate"].map((key) => (
                                        <div
                                            key={key}
                                            className="text-center py-5 border-t border-white/10 bg-[#9b26b6]/20"
                                        >
                                            {row[key] ? (
                                                <span className="text-white text-xl font-bold">✓</span>
                                            ) : (
                                                <span className="text-white/60 text-lg">—</span>
                                            )}
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                {/* MOBILE VERSION */}
                <div className="block md:hidden space-y-6 px-4">
                    {comparisonData.map((row, i) => (
                        <div
                            key={i}
                            className="rounded-2xl bg-[#9b26b6]/20 border border-white/10 p-4 shadow-[0_0_20px_rgba(155,38,182,0.3)]"
                        >
                            <h4 className="text-lg font-bold mb-2 text-white/90">{row.feature}</h4>
                            <div className="flex justify-around text-center text-sm font-semibold">
                                <div>
                                    <span className="block text-[#b14fc0] mb-1">Aspire</span>
                                    <span>{row.aspire ? "✓" : "—"}</span>
                                </div>
                                <div>
                                    <span className="block text-[#b14fc0] mb-1">Ignite</span>
                                    <span>{row.ignite ? "✓" : "—"}</span>
                                </div>
                                <div>
                                    <span className="block text-[#b14fc0] mb-1">Elevate</span>
                                    <span>{row.elevate ? "✓" : "—"}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* === Mobile Countdown Override Styles === */}
            <style>{`
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

// === Stripe Checkout Handlers ===
const handleAspire = () => startCheckout("price_1SLRkP2NRAQRhNmZtrOA49gW");
const handleIgnite = () =>
    window.open("https://lp.constantcontactpages.com/sl/ocTpycU", "_blank");
const handleElevate = () =>
    window.open("https://tonythompson.com/coming-soon", "_blank");

// === Tier Data ===
const tiers = [
    {
        name: "ASPIRE",
        price: "$95/mth",
        button: "WIN NOW",
        onClick: handleAspire,
        features: [
            "One tailor-made playbook per year",
            "Local realtor performance data",
            "12 month market forecast",
            "Referral partner leads",
            "Campaign ideas & scripts",
            "Content Library Access",
            "Monthly Sales Mastermind Call",
            "Live group coaching & accountability",
            "Complimentary NAMMBA Membership ($150 value)",
            "Discount to NAMMBA CONNECT",
        ],
    },
    {
        name: "IGNITE",
        price: "$295/mth",
        button: "BOOK A CALL →",
        onClick: handleIgnite,
        features: [
            "All ASPIRE benefits plus:",
            "Four quarterly playbooks per year",
            "Multicultural Marketing On Demand",
            "1,700+ social media content pieces",
            "Posting to 10+ platforms",
            "Your brand colors integration",
            "Complimentary Ticket to NAMMBA CONNECT",
        ],
    },
    {
        name: "ELEVATE",
        price: "TBD",
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

// === Comparison Data ===
const comparisonData = [
    { feature: "Personalized Playbooks", aspire: true, ignite: true, elevate: true },
    { feature: "Social Media Automation", aspire: false, ignite: true, elevate: true },
    { feature: "NAMMBA Membership", aspire: true, ignite: true, elevate: true },
    { feature: "Ticket to NAMMBA Connect", aspire: false, ignite: true, elevate: true },
    { feature: "Dedicated Project Manager", aspire: false, ignite: false, elevate: true },
    { feature: "Monthly Coaching", aspire: false, ignite: false, elevate: true },
    { feature: "Leadership Mastermind", aspire: false, ignite: false, elevate: true },
];

