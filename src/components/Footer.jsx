// ✅ src/components/Footer.jsx — authentic TikTok/X logos with unified hover behavior
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Facebook,
    Linkedin,
    Instagram,
    Youtube,
    XCircle as CloseIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
    const [formData, setFormData] = useState({
        first: "",
        last: "",
        email: "",
        phone: "",
        city: "",
        job: "",
    });
    const [status, setStatus] = useState("idle");
    const [hasReward, setHasReward] = useState(false);
    const [error, setError] = useState("");
    const successRef = useRef(null);

    useEffect(() => {
        if (localStorage.getItem("tonyRewardDownloaded") === "true") {
            setHasReward(true);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { first, last, email, phone, city, job } = formData;
        if (!first.trim() || !last.trim() || !email.trim() || !phone.trim() || !city.trim() || !job.trim()) {
            setError("Please complete all fields.");
            return;
        }

        setStatus("loading");

        const ccUrl = `https://lp.constantcontactpages.com/sl/ocTpycU?email=${encodeURIComponent(
            email
        )}&first=${encodeURIComponent(first)}&last=${encodeURIComponent(
            last
        )}&phone=${encodeURIComponent(phone)}&city=${encodeURIComponent(
            city
        )}&job=${encodeURIComponent(job)}`;
        window.open(ccUrl, "_blank");

        setTimeout(() => {
            setStatus("success");
            setFormData({
                first: "",
                last: "",
                email: "",
                phone: "",
                city: "",
                job: "",
            });
        }, 1800);
    };

    const closeModal = useCallback(() => setStatus("closed"), []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (successRef.current && !successRef.current.contains(e.target))
                closeModal();
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

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/tony-thompson-spmn-vital/assets/footerForm.pdf";
        link.download = "TonyThompson_NetworkGuide.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        localStorage.setItem("tonyRewardDownloaded", "true");
        setHasReward(true);
    };

    return (
        <footer id="contact" className="text-white font-sans bg-[#111] flex flex-col relative">
            {/* === NEWSLETTER FORM === */}
            <section className="relative text-center py-16 bg-gradient-to-r from-brandPurple to-brandAccent flex flex-col justify-center overflow-hidden">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 z-20 tracking-tight text-white">
                    JOIN TONY’S NEWSLETTER TODAY
                </h2>
                <p className="text-sm md:text-base text-white/85 max-w-xl mx-auto mb-8 z-20">
                    Get the latest insights, strategies, and opportunities directly from Tony.
                </p>

                <div className="relative max-w-2xl mx-auto w-full px-4 z-20">
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

                                <div className="flex flex-col md:flex-row gap-4 w-full">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        className="flex-1 p-3 rounded border-none bg-white text-black placeholder:text-gray-600"
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                        className="flex-1 p-3 rounded border-none bg-white text-black placeholder:text-gray-600"
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 w-full">
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="City / State"
                                        className="flex-1 p-3 rounded border-none bg-white text-black placeholder:text-gray-600"
                                    />
                                    <input
                                        type="text"
                                        name="job"
                                        value={formData.job}
                                        onChange={handleChange}
                                        placeholder="Job Title"
                                        className="flex-1 p-3 rounded border-none bg-white text-black placeholder:text-gray-600"
                                    />
                                </div>

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
                        <div className="relative z-20 w-[1.25cm] h-[1.25cm] flex justify-center items-center group-hover:scale-110 transition-all duration-300">
                            {item.icon === "tiktok" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-full h-full transition-all duration-300 group-hover:fill-black" fill="white">
                                    <path d="M161.06 0h-34.1v166.63a30.75 30.75 0 1 1-30.75-30.75 31.2 31.2 0 0 1 6.89.75V99.1a64.74 64.74 0 1 0 57.6 64.64V79.06a79.47 79.47 0 0 0 49.77 17.07V61.46a49.63 49.63 0 0 1-49.4-49.4V0Z" />
                                </svg>
                            ) : item.icon === "x" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" className="w-full h-full transition-all duration-300 group-hover:fill-black" fill="white">
                                    <path d="M182.1 130.4 289.2 0h-25.3l-93.3 112L101.6 0H0l112.2 162.7L0 300h25.3l99.1-118.9L198.4 300H300l-117.9-169.6ZM139.7 166l-11.5-16.4L34.4 19.5h55.7l74.1 105.4 11.5 16.4 99.7 141.1h-55.7l-79.9-116.4Z" />
                                </svg>
                            ) : (
                                <item.icon
                                    strokeWidth={1.5}
                                    className="h-full w-full text-white group-hover:text-black transition-all duration-300"
                                />
                            )}
                        </div>
                    </a>
                ))}
            </section>

            {/* === LEGAL FOOTER === */}
            <div className="w-full border-t border-brandPurple/20" />
            <div className="bg-[#111] text-white flex flex-wrap justify-between items-center p-4 px-6 md:px-12 text-sm">
                <span>© {new Date().getFullYear()} Tony Thompson</span>
                <nav className="flex-1 flex justify-evenly items-center mx-4">
                    <Link to="/terms" className="hover:text-brandPurple transition-colors duration-300">Terms & Conditions</Link>
                    <Link to="/privacy-policy" className="hover:text-brandPurple transition-colors duration-300">Privacy Policy</Link>
                    <a href="#" className="hover:text-brandPurple transition-colors duration-300">Cookie Policy</a>
                </nav>
                <span>Website by Arson Pixelz®</span>
            </div>
        </footer>
    );
}

// ✅ Authentic social links (final)
const socials = [
    { link: "https://www.instagram.com/tt5481562/", icon: Instagram },
    { link: "https://www.tiktok.com/@tonythompson08?is_from_webapp=1&sender_device=pc", icon: "tiktok" },
    { link: "https://www.youtube.com/@TonyThompson-b5u", icon: Youtube },
    { link: "https://x.com/TonyThomps7989", icon: "x" },
    { link: "https://linktr.ee/TonyT9", icon: Linkedin },
];
