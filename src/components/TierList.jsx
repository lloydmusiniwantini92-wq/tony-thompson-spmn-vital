import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizOverlay } from "../context/QuizOverlayContext";
import step5 from "../assets/quiz/step5.jpg";
import TetrisCountdown from "./TetrisCountdown";
import { CheckCircle2, Trophy, Zap, Crown, X, ArrowRight, ShieldAlert } from "lucide-react";

/* ======================================================
    EXTERNAL LINKS & DATA
====================================================== */
const handleAspire = () =>
    window.open("https://lp.constantcontactpages.com/sl/QFIBwKF/aspire", "_blank");
const handleIgnite = () =>
    window.open("https://lp.constantcontactpages.com/sl/RaXnRmj/ignite", "_blank");
const handleElevate = () =>
    window.open("https://lp.constantcontactpages.com/sl/TrUL7SX/elevate", "_blank");

const tiers = [
    {
        name: "ASPIRE",
        key: "aspire",
        price: "Coming Soon",
        button: "WIN NOW",
        icon: Trophy,
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
        key: "ignite",
        price: "Coming Soon",
        button: "BOOK A CALL",
        icon: Zap,
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
        key: "elevate",
        price: "By Invite Only",
        button: "BOOK A CALL",
        icon: Crown,
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

/* ======================================================
   BUTTON VARIANTS
====================================================== */
const buttonVariants = {
    rest: {
        scale: 1,
        boxShadow: "0px 0px 0px rgba(155,38,182,0)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        transition: { duration: 0.2, ease: "easeOut" },
    },
    hover: {
        scale: [1, 1.02, 1],
        boxShadow: [
            "0px 0px 0px rgba(155,38,182,0)",
            "0px 0px 20px rgba(155,38,182,0.6)",
            "0px 0px 0px rgba(155,38,182,0)",
        ],
        backgroundColor: "#9b26b6",
        transition: {
            backgroundColor: { duration: 0.3 },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        },
    },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
};

export default function TierList() {
    const { openQuiz } = useQuizOverlay();
    const [showCountdown, setShowCountdown] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [hoveredTier, setHoveredTier] = useState(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // =========================================================
    // 📅 DATE SET: JANUARY 1, 2026
    // =========================================================
    useEffect(() => {
        const targetDate = new Date("2026-01-01T00:00:00");
        setEndDate(targetDate);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setShowCountdown(true), 2500);
        return () => clearTimeout(timer);
    }, []);

    /* ======================================================
        SCROLL TRIGGER FOR POPUP
    ======================================================= */
    useEffect(() => {
        const el = document.querySelector("#programs");
        if (!el) return;

        const handle = () => {
            const rect = el.getBoundingClientRect();
            const windowH = window.innerHeight;

            if (rect.top < windowH * 0.65 && rect.bottom > windowH * 0.35) {
                setShowPopup(true);
                window.removeEventListener("scroll", handle);
                if (window.lenis) window.lenis.off("scroll", handle);
            }
        };

        window.addEventListener("scroll", handle, { passive: true });
        if (window.lenis) window.lenis.on("scroll", handle);

        handle();

        return () => {
            window.removeEventListener("scroll", handle);
            if (window.lenis) window.lenis.off("scroll", handle);
        };
    }, []);

    const getIconClass = (tierKey, isCheck) => {
        const isHovered = hoveredTier === tierKey;
        const baseClass = isCheck
            ? "w-4 h-4 md:w-6 md:h-6 mx-auto transition-all duration-300"
            : "w-2 h-2 rounded-full bg-white/40 mx-auto transition-all duration-300";

        let colorClass;
        let glowClass = "";

        if (isCheck) {
            colorClass = "text-white";
            if (isHovered) {
                glowClass = "drop-shadow-[0_0_20px_rgba(255,255,255,1)] scale-125";
            } else if (tierKey === "elevate") {
                glowClass = "drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]";
            }
        }

        if (isHovered) {
            if (!isCheck) {
                colorClass = "bg-[#d8b4fe] scale-150";
                glowClass = "shadow-[0_0_15px_rgba(255,255,255,0.7)]";
            }
        } else if (!isCheck && !isHovered) {
            colorClass = "bg-white/40";
        }

        return `${baseClass} ${colorClass} ${glowClass}`;
    };

    return (
        <>
            <section
                id="programs"
                className="relative text-white text-center overflow-hidden font-sans bg-[#050505]"
                style={{
                    backgroundImage: isMobile ? "none" : `url(${step5})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    backgroundAttachment: isMobile ? "scroll" : "fixed",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="pt-12 md:pt-24 pb-16 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto"
                >
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.3em] text-[#9b26b6] mb-4 backdrop-blur-md">
                            DEPLOYMENT CHANNELS
                        </span>

                        <h3 className="text-3xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                            GROWTH PROGRAMS
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-visible">
                        {tiers.map((tier, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="relative group"
                            >
                                <motion.div
                                    whileHover={{
                                        y: -8,
                                        scale: 1.02,
                                        zIndex: 50,
                                        backgroundColor: "#000000",
                                        boxShadow: "0 0 0 1px rgba(155, 38, 182, 1), 0 20px 60px -10px rgba(0,0,0,0.95)",
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="
                                        relative h-full flex flex-col 
                                        rounded-[2rem] 
                                        bg-[#0c0c0c] 
                                        border border-white/5 
                                        overflow-hidden
                                        transition-colors duration-300
                                    "
                                >
                                    <div className="absolute inset-x-0 top-0 h-[300px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#9b26b6]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />

                                    <div className="flex-grow p-8 pb-4 flex flex-col relative z-10">
                                        <div className="relative text-left border-b border-white/5 pb-6 mb-8">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[#9b26b6] group-hover:bg-[#9b26b6] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(155,38,182,0.4)] transition-all duration-300">
                                                    <tier.icon size={24} />
                                                </div>
                                                {i === 2 && (
                                                    <span className="py-1.5 px-3 rounded-full bg-[#9b26b6]/10 border border-[#9b26b6]/30 text-[10px] font-bold tracking-widest uppercase text-[#d8b4fe] shadow-[0_0_10px_rgba(155,38,182,0.2)]">
                                                        Exclusive
                                                    </span>
                                                )}
                                            </div>
                                            <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                                                {tier.name}
                                            </h4>
                                            <p className="text-white/40 text-sm font-mono tracking-wide uppercase">
                                                {tier.price}
                                            </p>
                                        </div>
                                        <ul className="space-y-4 text-sm text-gray-500 mb-8 leading-relaxed text-left">
                                            {tier.features.map((f, idx) => (
                                                <li key={idx} className="flex items-start gap-3 group/item">
                                                    <CheckCircle2 size={16} className="text-[#9b26b6] shrink-0 mt-[3px] group-hover/item:text-[#d8b4fe] transition-colors" />
                                                    <span className="text-white/60 group-hover/item:text-white/90 transition-colors duration-300">
                                                        {f}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="relative z-20 mt-auto">
                                        <motion.button
                                            onClick={tier.onClick}
                                            variants={buttonVariants}
                                            initial="rest"
                                            whileHover="hover"
                                            whileTap="tap"
                                            className="w-full relative overflow-hidden group/btn font-['Press_Start_2P'] text-[0.85rem] uppercase tracking-[0.15em] text-white border-t border-white/10 py-6 md:py-7 rounded-none rounded-b-[2rem]"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                {tier.button} <ArrowRight size={16} />
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                            <div className="absolute inset-0 -translate-x-[100%] group-hover/btn:translate-x-[100%] bg-gradient-to-r from-transparent via-[#9b26b6]/40 to-transparent transition-transform duration-700 ease-in-out" />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <hr className="w-1/2 border-t border-[#9b26b6]/30 mx-auto mt-[-2rem] mb-8 md:mt-[-4rem] md:mb-16 transition-colors duration-500 relative z-10" />

                <div className="relative z-20 w-full min-h-auto md:min-h-screen px-4 md:px-12 flex flex-col justify-center items-center py-12 md:py-24 bg-gradient-to-b from-[#050505] via-[#9b26b6]/20 to-[#9b26b6]/30">
                    <div className="relative z-10 w-full max-w-[1400px]">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-6 md:mb-16"
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.3em] text-[#9b26b6] mb-4 backdrop-blur-md">
                                SYSTEM ANALYSIS
                            </span>
                            <h3 className="text-3xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                                PROGRAM CAPABILITIES
                            </h3>
                        </motion.div>

                        <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-[#9b26b6] shadow-[0_0_80px_rgba(155,38,182,0.4)] relative">
                            <table className="w-full text-left border-collapse table-fixed">
                                <thead>
                                    <tr className="bg-[#7a1d8f] border-b border-white/10">
                                        <th className="w-[40%] py-6 md:py-8 px-4 md:px-12 text-white font-bold text-[0.6rem] md:text-base tracking-[0.2em] uppercase">Core Modules</th>
                                        {/* Aspire */}
                                        <th
                                            className={`w-[20%] py-6 md:py-8 px-2 md:px-8 text-center font-bold cursor-pointer transition-all duration-300 ${hoveredTier === "aspire" ? "bg-[#9b26b6] text-white" : "text-white"}`}
                                            onMouseEnter={() => setHoveredTier("aspire")}
                                            onMouseLeave={() => setHoveredTier(null)}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <Trophy size={isMobile ? 14 : 20} className={hoveredTier === "aspire" ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" : "text-white"} />
                                                <span className="text-[0.55rem] md:text-xl tracking-widest">ASPIRE</span>
                                            </div>
                                        </th>
                                        {/* Ignite */}
                                        <th
                                            className={`w-[20%] py-6 md:py-8 px-2 md:px-8 text-center font-bold cursor-pointer transition-all duration-300 ${hoveredTier === "ignite" ? "bg-[#9b26b6] text-white" : "text-white"}`}
                                            onMouseEnter={() => setHoveredTier("ignite")}
                                            onMouseLeave={() => setHoveredTier(null)}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <Zap size={isMobile ? 14 : 20} className={hoveredTier === "ignite" ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" : "text-white"} />
                                                <span className="text-[0.55rem] md:text-xl tracking-widest">IGNITE</span>
                                            </div>
                                        </th>
                                        {/* Elevate */}
                                        <th
                                            className={`w-[20%] py-6 md:py-8 px-2 md:px-8 text-center font-bold cursor-pointer transition-all duration-300 ${hoveredTier === "elevate" ? "bg-[#9b26b6] text-white" : "text-white"}`}
                                            onMouseEnter={() => setHoveredTier("elevate")}
                                            onMouseLeave={() => setHoveredTier(null)}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <Crown size={isMobile ? 14 : 20} className={hoveredTier === "elevate" ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" : "text-white"} />
                                                <span className="text-[0.55rem] md:text-xl tracking-widest">ELEVATE</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonData.map((row, idx) => (
                                        <tr key={idx} className="border-b border-white/10 bg-[#9b26b6]">
                                            <td className="w-[40%] py-4 md:py-6 px-4 md:px-12 text-white text-[0.7rem] md:text-lg leading-tight">{row.feature}</td>
                                            <td className="w-[20%] py-4 md:py-6 px-2 md:px-8 text-center">
                                                {row.aspire ? <CheckCircle2 className={getIconClass("aspire", true)} /> : <div className={getIconClass("aspire", false)}></div>}
                                            </td>
                                            <td className="w-[20%] py-4 md:py-6 px-2 md:px-8 text-center">
                                                {row.ignite ? <CheckCircle2 className={getIconClass("ignite", true)} /> : <div className={getIconClass("ignite", false)}></div>}
                                            </td>
                                            <td className="w-[20%] py-4 md:py-6 px-2 md:px-8 text-center">
                                                {row.elevate ? <CheckCircle2 className={getIconClass("elevate", true)} /> : <div className={getIconClass("elevate", false)}></div>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {typeof document !== "undefined" &&
                    createPortal(
                        <AnimatePresence>
                            {showPopup && (
                                <motion.div
                                    className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/80 backdrop-blur-sm px-0 md:px-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="absolute inset-0" onClick={() => setShowPopup(false)} />

                                    {!isMobile ? (
                                        <motion.div
                                            id="waitlist-popup-box"
                                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                                            animate={{ scale: 1, y: 0, opacity: 1 }}
                                            exit={{ scale: 0.9, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            className="relative bg-[#0f0f0f] text-center px-12 py-12 rounded-[2rem] border border-[#9b26b6]/40 shadow-[0_0_60px_rgba(155,38,182,0.3)] w-[90%] max-w-[500px] overflow-hidden z-20"
                                        >
                                            <div className="absolute top-[-50%] left-[-50%] w-full h-full bg-[#9b26b6] blur-[100px] opacity-10 pointer-events-none" />
                                            <button onClick={() => setShowPopup(false)} className="absolute top-5 right-5 p-2 text-white/50 hover:text-white transition-colors z-30"><X size={28} /></button>

                                            {showCountdown && endDate && !isNaN(endDate.getTime()) && (
                                                <div className="mb-8 relative z-10">
                                                    <p className="text-[#9b26b6] font-bold text-xs tracking-[0.25em] uppercase mb-4 animate-pulse">Launch Sequence Initiated</p>
                                                    <div className="flex justify-center scale-100">
                                                        <TetrisCountdown targetDate={endDate} />
                                                    </div>
                                                </div>
                                            )}

                                            <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight relative z-10">
                                                OFFICIAL LAUNCH <br />
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b26b6] to-purple-400">01.01.2026</span>
                                            </h3>
                                            <p className="text-white/60 text-lg mb-8 leading-relaxed relative z-10">Secure your priority position. Join the waitlist to receive the first transmission from Tony Thompson upon deployment.</p>
                                            <motion.button
                                                onClick={() => window.open("https://lp.constantcontactpages.com/sl/TrUL7SX/elevate", "_blank")}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-full py-4 bg-[#9b26b6] text-white font-['Press_Start_2P'] text-[0.75rem] uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(155,38,182,0.4)] border-t border-white/20"
                                            >
                                                JOIN THE WAITLIST
                                            </motion.button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            id="waitlist-popup-box-mobile"
                                            initial={{ y: "100%", opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: "100%", opacity: 0 }}
                                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                            className="relative z-20 w-[94vw] bg-[#090909]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_-10px_40px_rgba(155,38,182,0.2)] flex flex-col items-center overflow-hidden pb-8"
                                        >
                                            <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#9b26b6] to-transparent mb-6 opacity-70" />
                                            <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 p-3 bg-white/5 rounded-full text-white/60 hover:text-white border border-white/5 z-30"><X size={20} /></button>

                                            <div className="w-full px-4 mb-6">
                                                <div className="w-full bg-black/60 rounded-2xl border border-[#9b26b6]/20 p-5 flex flex-col items-center relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,19,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,6px_100%] opacity-20" />
                                                    <div className="flex justify-center mb-3 relative z-10">
                                                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9b26b6] text-center">Launch Sequence Active</span>
                                                    </div>
                                                    <div className="flex justify-center w-full relative z-10 scale-[0.85] origin-center">
                                                        <TetrisCountdown targetDate={endDate} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="px-6 text-center w-full">
                                                <div className="flex justify-center mb-3"><ShieldAlert className="text-[#9b26b6]" size={32} /></div>
                                                <h3 className="text-2xl font-black text-white leading-tight mb-3">OFFICIAL LAUNCH<br /><span className="text-[#9b26b6]">01.01.2026</span></h3>
                                                <p className="text-white/70 text-sm leading-relaxed mb-6 font-medium">Secure your priority position. Join the waitlist to receive the first transmission from Tony Thompson upon deployment.</p>
                                                <motion.button
                                                    onClick={() => window.open("https://lp.constantcontactpages.com/sl/TrUL7SX/elevate", "_blank")}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-full py-4 bg-[#9b26b6] text-white font-['Press_Start_2P'] text-[0.7rem] uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(155,38,182,0.4)] border-t border-white/20"
                                                >
                                                    JOIN WAITLIST
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>,
                        document.body
                    )}
            </section>
        </>
    );
}