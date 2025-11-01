// ✅ src/components/Footer.jsx — Updated CTA: “Join Tony’s Newsletter Today”
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Youtube,
    X as CloseIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
    const [formData, setFormData] = useState({ first: "", last: "", email: "" });
    const [status, setStatus] = useState("idle"); // idle | loading | success | closed
    const [hasReward, setHasReward] = useState(false);
    const [error, setError] = useState("");
    const successRef = useRef(null);

    // === Load reward flag on mount ===
    useEffect(() => {
        if (localStorage.getItem("tonyRewardDownloaded") === "true") {
            setHasReward(true);
        }
    }, []);

    // === Change handler ===
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    // === Form submit handler ===
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.first.trim() || !formData.last.trim() || !formData.email.trim()) {
            setError("Please complete all fields.");
            return;
        }

        setStatus("loading");

        const ccUrl = `https://lp.constantcontactpages.com/sl/ocTpycU?email=${encodeURIComponent(
            formData.email
        )}&first=${encodeURIComponent(formData.first)}&last=${encodeURIComponent(
            formData.last
        )}`;
        window.open(ccUrl, "_blank");

        setTimeout(() => {
            setStatus("success");
            setFormData({ first: "", last: "", email: "" });
        }, 1800);
    };

    // === Close modal ===
    const closeModal = useCallback(() => setStatus("closed"), []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (successRef.current && !successRef.current.contains(e.target)) closeModal();
        };
        const handleEsc = (e) => {
            if (e.key === "Escape") closeModal();
        };

        if (status === "success") {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEsc);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [status, closeModal]);

    // === Reward download ===
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/assets/footerFormPDF.pdf";
        link.download = "TonyThompson_NetworkGuide.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        localStorage.setItem("tonyRewardDownloaded", "true");
        setHasReward(true);
    };

    return (
        <footer id="contact" className="text-white font-sans bg-[#111] flex flex-col relative">
            {/* === NEWSLETTER FORM AREA === */}
            <section className="relative text-center py-16 bg-gradient-to-r from-brandPurple to-brandAccent flex flex-col justify-center overflow-hidden">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 z-20 tracking-tight text-white">
                    JOIN TONY’S NEWSLETTER TODAY
                </h2>
                <p className="text-sm md:text-base text-white/85 max-w-xl mx-auto mb-8 z-20">
                    Get the latest insights, strategies, and opportunities directly from Tony.
                </p>

                <div className="relative max-w-xl mx-auto w-full px-4 z-20">
                    <AnimatePresence mode="wait">
                        {status !== "success" && (
                            <motion.form
                                key="form"
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className="flex flex-col md:flex-row gap-4 w-full">
                                    <input
                                        type="text"
                                        name="first"
                                        value={formData.first}
                                        onChange={handleChange}
                                        placeholder="First Name"
                                        className="flex-1 p-3 rounded border-none bg-white text-black placeholder:text-gray-600"
                                    />
                                    <input
                                        type="text"
                                        name="last"
                                        value={formData.last}
                                        onChange={handleChange}
                                        placeholder="Last Name"
                                        className="flex-1 p-3 rounded border-none bg-white text-black placeholder:text-gray-600"
                                    />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className="p-3 rounded border-none w-full bg-white text-black placeholder:text-gray-600"
                                />
                                {error && <p className="text-red-200 text-sm mt-1">{error}</p>}

                                <motion.button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className={`px-10 py-3 mt-2 rounded-full border-2 border-black font-bold text-black ${status === "loading"
                                        ? "bg-brandAccent/50 cursor-wait animate-pulse"
                                        : "bg-white text-brandPurple hover:bg-black hover:text-white transition-all duration-300"
                                        }`}
                                >
                                    {status === "loading" ? "Sending..." : "Subscribe"}
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {hasReward && status !== "success" && (
                        <div className="mt-6 text-sm text-white/80">
                            Already subscribed?{" "}
                            <button
                                onClick={handleDownload}
                                className="underline text-white hover:text-brandLight transition-colors duration-300"
                            >
                                Download your guide again →
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* === SUCCESS MODAL === */}
            <AnimatePresence>
                {status === "success" && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            ref={successRef}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.45, ease: [0.25, 1, 0.3, 1] }}
                            className="bg-[#111] border border-brandPurple/40 rounded-2xl p-8 text-center max-w-md mx-auto relative"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-3 text-white/60 hover:text-white transition-all duration-300"
                                aria-label="Close"
                            >
                                <CloseIcon size={22} strokeWidth={2.2} />
                            </button>

                            <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                                Subscription successful!
                            </h3>
                            <p className="text-white/70 mb-6 text-sm">
                                Your personalized PDF is ready for you.
                            </p>
                            <button
                                onClick={handleDownload}
                                className="px-8 py-3 rounded-full bg-brandPurple text-white font-semibold hover:bg-brandAccent transition-all duration-300"
                            >
                                Download PDF
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* === SOCIAL ICONS SECTION === */}
            <section className="grid grid-cols-5 w-full bg-[#111] border-t border-brandPurple/30 relative z-20">
                {socials.map((item, i) => (
                    <a
                        key={i}
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="relative overflow-hidden h-[3cm] flex justify-center items-center group border-r border-brandPurple/20"
                    >
                        <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-brandPurple to-brandAccent opacity-90 transition-all duration-500 group-hover:left-0"></div>
                        <item.icon
                            className="relative z-20 h-[1.25cm] w-[1.25cm] text-white group-hover:text-black group-hover:scale-110 transition-all duration-300"
                            strokeWidth={1.5}
                        />
                    </a>
                ))}
            </section>

            {/* === LEGAL FOOTER (WITH ROUTER LINKS) === */}
            <div className="w-full border-t border-brandPurple/20" />
            <div className="bg-[#111] text-white flex flex-wrap justify-between items-center p-4 px-6 md:px-12 text-sm">
                <span>© {new Date().getFullYear()} Tony Thompson</span>

                <nav className="flex-1 flex justify-evenly items-center mx-4">
                    <Link to="/terms" className="hover:text-brandPurple transition-colors duration-300">
                        Terms & Conditions
                    </Link>
                    <Link to="/privacy-policy" className="hover:text-brandPurple transition-colors duration-300">
                        Privacy Policy
                    </Link>
                    <a href="#" className="hover:text-brandPurple transition-colors duration-300">
                        Cookie Policy
                    </a>
                </nav>

                <span>Website by Arson Pixelz®</span>
            </div>
        </footer>
    );
}

// === Social Icons ===
const socials = [
    { link: "#", icon: Facebook },
    { link: "#", icon: Twitter },
    { link: "#", icon: Linkedin },
    { link: "#", icon: Instagram },
    { link: "#", icon: Youtube },
];
