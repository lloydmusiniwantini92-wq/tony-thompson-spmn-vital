import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Linkedin,
    Instagram,
    Youtube,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

// ==============================
// COLOR CONSTANTS
// ===================================
const PURPLE = "#9b26b6";
const BRIGHT_PURPLE = "#d069f0";
const WHITE = "#ffffff";
const BLACK = "#000000";

// ==============================
// DATA
// ===================================
const enquiries = [
    { category: "BUSINESS & SPEAKING", email: "commercial@tonythompson.com" },
    { category: "PR & MEDIA BOOKINGS", email: "bookings@tonythompson.com" },
    { category: "PRESS ACCREDITATION", email: "press@tonythompson.com" },
    { category: "EVENTS & PARTNERSHIPS", email: "events@tonythompson.com" },
];

const socials = [
    { name: "INSTAGRAM", link: "https://www.instagram.com/tt5481562/", icon: Instagram, target: "Instagram" },
    { name: "TIKTOK", link: "https://www.tiktok.com/@tonythompson08?is_from_webapp=1&sender_device=pc", icon: "tiktok", target: "TikTok" },
    { name: "YOUTUBE", link: "https://www.youtube.com/@TonyThompson-b5u", icon: Youtube, target: "YouTube" },
    { name: "X", link: "https://x.com/TonyThomps7989", icon: "x", target: "X" },
    { name: "LINKEDIN", link: "https://linktr.ee/TonyT9", icon: Linkedin, target: "LinkedIn" },
];

// =================================================================
// SOCIAL ICON HELPERS
// =================================================================

const SocialIcon = ({ item }) => {
    // Custom TikTok icon
    if (item.icon === "tiktok") {
        return (
            <svg viewBox="0 0 256 256" className="w-5 h-5 fill-current">
                <path d="M161.06 0h-34.1v166.63a30.75 30.75 0 1 1-30.75-30.75 31.2 31.2 0 0 1 6.89.75V99.1a64.74 64.74 0 1 0 57.6 64.64V79.06a79.47 79.47 0 0 0 49.77 17.07V61.46a49.63 49.63 0 0 1-49.4-49.4V0Z" />
            </svg>
        );
    }

    // Custom X icon
    if (item.icon === "x") {
        return (
            <svg viewBox="0 0 300 300" className="w-4 h-4 fill-current">
                <path d="M182.1 130.4 289.2 0h-25.3l-93.3 112L101.6 0H0l112.2 162.7L0 300h25.3l99.1-118.9L198.4 300H300l-117.9-169.6ZM139.7 166l-11.5-16.4L34.4 19.5h55.7l74.1 105.4 11.5 16.4 99.7 141.1h-55.7l-79.9-116.4Z" />
            </svg>
        );
    }

    // All Lucide icons (Instagram, YouTube, LinkedIn)
    const Icon = item.icon;
    return (
        <Icon
            className="w-5 h-5 text-white group-hover:text-black transition-colors"
            strokeWidth={1.7}
        />
    );
};


// =================================================================
// CLEAN INPUT COMPONENT
// =================================================================

const InputClean = ({ name, value, onChange, placeholder, type = "text" }) => (
    <div className="flex flex-col relative">
        <label className="text-[10px] mb-2 uppercase tracking-widest font-bold text-gray-700">
            {placeholder}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-white border-b-2 border-black/30 p-2 text-black text-sm 
                        focus:outline-none focus:border-purple-600 
                        placeholder:text-gray-400 transition-colors duration-200"
        />
    </div>
);

// =================================================================
// SOCIAL CINEMATIC ICON BLOCK
// =================================================================

const CatalystSocialCinematic = ({ item }) => {
    const fractalNoiseUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

    return (
        <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="group relative w-full h-full flex flex-col items-center justify-center overflow-hidden border-r border-white/20 bg-black cursor-crosshair"
        >
            <div
                className="absolute inset-0 z-10 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
                style={{ backgroundColor: PURPLE }}
            >
                <div
                    className="absolute inset-0 opacity-100 mix-blend-hard-light"
                    style={{
                        backgroundImage: fractalNoiseUrl,
                        backgroundSize: "150px 150px",
                    }}
                />
            </div>

            {/* Icon remains visible */}
            <div className="relative z-20 text-white group-hover:text-black group-hover:scale-125 transition-all duration-500">
                <SocialIcon item={item} />
            </div>

            <span className="absolute bottom-3 text-[9px] uppercase tracking-widest text-white/60 group-hover:text-white transition-all duration-500 z-20 font-mono opacity-0 group-hover:opacity-100 hidden md:block">
                TARGET: {item.target}
            </span>
        </a>
    );
};

// =================================================================
// MAIN FOOTER COMPONENT
// =================================================================

export default function Footer() {

    const [formData, setFormData] = useState({
        first: "",
        last: "",
        email: "",
        enquiry: "",
    });

    const [status, setStatus] = useState("idle");
    const [error, setError] = useState("");

    const successRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.first.trim() || !formData.email.trim()) {
            setError("MISSING_DATA: Name and Email are required.");
            return;
        }

        setStatus("loading");

        try {
            // NOTE: Ensure 'submit_form.php' exists in your public/root folder
            const response = await fetch("submit_form.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ first: "", last: "", email: "", enquiry: "" });
            } else {
                setError("SERVER_ERROR: Transmission failed.");
                setStatus("idle");
            }
        } catch (err) {
            setError("NETWORK_ERROR: Check connection.");
            setStatus("idle");
        }
    };

    const closeModal = useCallback(() => setStatus("closed"), []);

    useEffect(() => {
        if (status === "success") {
            const handleClickOutside = (e) => {
                if (successRef.current && !successRef.current.contains(e.target)) {
                    closeModal();
                }
            };

            const handleEsc = (e) => e.key === "Escape" && closeModal();

            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEsc);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.removeEventListener("keydown", handleEsc);
            };
        }
    }, [status, closeModal]);


    return (
        <footer
            id="contact"
            className="relative w-full text-black overflow-hidden font-sans"
            style={{ background: WHITE }}
        >
            {/* ======================================================================================
                HAZE BACKGROUND
            ====================================================================================== */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: `linear-gradient(to top, rgba(155, 38, 182, 0.05), rgba(255,255,255,0.8), white)`
                }}
            >
                <div
                    className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
                    style={{
                        backgroundImage:
                            `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
            </div>


            {/* ======================================================================================
                CONTACT BLOCK
            ====================================================================================== */}
            <div className="relative z-10 flex flex-col items-center pt-12 md:pt-24 pb-20 px-6 max-w-[1200px] mx-auto">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto mb-16"
                >
                    {/* === "COMMUNICATION UPLINK" HEADER PILL === */}
                    <span className="inline-block py-1 px-3 rounded-full bg-[#9b26b6]/5 border border-[#9b26b6]/20 text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#9b26b6] mb-6 backdrop-blur-md">
                        COMMUNICATION UPLINK
                    </span>

                    <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-3 text-black">
                        CONTACT TONY
                    </h2>

                    <h3 className="text-lg md:text-xl font-medium tracking-[0.3em] text-black/70 uppercase">
                        JOIN THE CHASING EXCELLENCE COMMUNITY
                    </h3>

                    <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base font-mono leading-relaxed border-t border-black/10 pt-6 mt-4">
                        The ultimate upgrade begins with a simple connection.
                    </p>
                </motion.div>


                {/* ======================================================================================
                    FORM + DIRECT ENQUIRIES LAYOUT
                ====================================================================================== */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

                    {/* LEFT: FORM */}
                    <div className="md:col-span-2 relative group flex flex-col">
                        <div className="relative p-8 md:p-10 rounded-lg flex-grow border border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] bg-white">

                            <AnimatePresence mode="wait">
                                {status !== "success" ? (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex flex-col gap-10"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                                            <InputClean name="first" value={formData.first} onChange={handleChange} placeholder="FIRST NAME*" />
                                            <InputClean name="last" value={formData.last} onChange={handleChange} placeholder="LAST NAME (OPTIONAL)" />

                                            <div className="md:col-span-2">
                                                <InputClean name="email" value={formData.email} onChange={handleChange} placeholder="EMAIL ADDRESS*" type="email" />
                                            </div>

                                            <div className="md:col-span-2 mt-4">
                                                <label className="block mb-2 text-[10px] uppercase tracking-widest font-bold text-gray-700">
                                                    YOUR ENQUIRY / MESSAGE (OPTIONAL)
                                                </label>
                                                <textarea
                                                    name="enquiry"
                                                    value={formData.enquiry}
                                                    onChange={handleChange}
                                                    className="w-full h-24 bg-white border-2 border-black/30 p-3 text-black text-sm 
                                                               focus:outline-none focus:border-purple-600 
                                                               placeholder:text-gray-400 transition-colors duration-200 resize-none"
                                                />
                                            </div>
                                        </div>

                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-[#cc0000] font-mono text-xs uppercase tracking-widest text-center border border-[#cc0000] p-3 bg-[#cc0000]/10 mt-6"
                                            >
                                                ⚠ {error}
                                            </motion.div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="w-full md:w-60 py-4 font-bold uppercase text-xs tracking-[0.2em] text-white rounded-md transition-all duration-300 mx-auto 
                                                       border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.9)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]"
                                            style={{
                                                backgroundImage: `linear-gradient(to right, ${PURPLE}, ${BRIGHT_PURPLE})`,
                                            }}
                                        >
                                            {status === "loading" ? "PROCESSING..." : "SUBMIT ACCESS"}
                                            <ArrowRight size={14} className="inline ml-3" />
                                        </button>

                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="form-success"
                                        className="h-full min-h-[300px] flex flex-col items-center justify-center text-black"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <CheckCircle2 className="w-12 h-12 text-[#9b26b6] mx-auto mb-4" />
                                        <h3 className="text-3xl font-black mb-2">TRANSMISSION COMPLETE.</h3>
                                        <p className="text-xs uppercase tracking-widest text-gray-700 mt-2">
                                            We will be in touch shortly.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    </div>


                    {/* RIGHT COLUMN: DIRECT ENQUIRIES */}
                    <div
                        className="md:col-span-1 p-8 md:p-10 text-white rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.8)] space-y-4"
                        style={{
                            background: `linear-gradient(to bottom, ${PURPLE}, ${BRIGHT_PURPLE})`,
                            border: `2px solid ${BLACK}`,
                        }}
                    >
                        {/* === "PRIORITY CHANNELS" HEADER PILL === */}
                        <div className="mb-4">
                            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-[9px] font-bold tracking-[0.25em] text-white backdrop-blur-md">
                                PRIORITY CHANNELS
                            </span>
                        </div>

                        <h3 className="text-xl font-extrabold uppercase mb-6 tracking-wide border-b border-white/50 pb-2 text-white">
                            DIRECT ENQUIRIES
                        </h3>

                        <div className="space-y-6">
                            {enquiries.map((item, index) => (
                                <div key={index} className="py-2 border-b border-white/30 last:border-b-0">
                                    <h4 className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-black/80 mb-1">
                                        {item.category}
                                    </h4>

                                    <a
                                        href={`mailto:${item.email}`}
                                        className="text-sm font-mono text-white/90 hover:text-black transition-colors block break-words"
                                    >
                                        {item.email}
                                    </a>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </div>


            {/* ======================================================================================
                SOCIALS
            ====================================================================================== */}
            <div className="relative z-20 w-full bg-black border-t border-white/20 grid grid-cols-5 h-[80px] md:h-[110px] overflow-hidden">
                {socials.map((item, i) => (
                    <CatalystSocialCinematic key={i} item={item} />
                ))}
            </div>


            {/* ======================================================================================
                COPYRIGHT
            ====================================================================================== */}
            <div className="relative z-10 w-full bg-black border-t border-white/30 py-6 px-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/60 uppercase tracking-[0.2em] font-mono gap-4 md:gap-0">
                {/* LEFT GROUP: COPYRIGHT + LINKS */}
                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-8 w-full md:w-auto text-center md:text-left">
                    <span>© {new Date().getFullYear()} TONY THOMPSON. SYS_ACTIVE.</span>

                    <nav className="flex gap-6 text-white/80">
                        <Link to="/cookie-policy" className="hover:text-[#d069f0]">Cookie Policy</Link>
                        <Link to="/terms" className="hover:text-[#d069f0]">Terms of Service</Link>
                        <Link to="/privacy-policy" className="hover:text-[#d069f0]">Privacy Policy</Link>
                    </nav>
                </div>

                {/* RIGHT GROUP: ENGINEERED BY */}
                <span className="text-[#d069f0] hover:text-white/80 transition-colors text-center md:text-right w-full md:w-auto">
                    ENGINEERED BY ARSON PIXELZ®
                </span>
            </div>


            {/* ======================================================================================
                SUCCESS MODAL
            ====================================================================================== */}
            <AnimatePresence>
                {status === "success" && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            ref={successRef}
                            className="text-center p-12 border border-[#9b26b6]/50 bg-white max-w-md mx-6 relative rounded-2xl text-black"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                        >
                            <CheckCircle2 className="w-16 h-16 text-[#9b26b6] mx-auto mb-6 drop-shadow-[0_0_20px_rgba(155,38,182,0.4)]" />

                            <h2 className="text-4xl font-black mb-2">ACCESS GRANTED.</h2>

                            <p className="text-[#9b26b6] mb-6 font-mono text-sm uppercase tracking-wider">
                                We will be in touch shortly.
                            </p>

                            <button
                                onClick={closeModal}
                                className="px-10 py-4 bg-[#9b26b6] text-white font-bold uppercase text-xs hover:bg-black hover:text-white transition-all shadow-[0_0_15px_rgba(155,38,182,0.6)]"
                            >
                                CLOSE
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


        </footer>
    );
}