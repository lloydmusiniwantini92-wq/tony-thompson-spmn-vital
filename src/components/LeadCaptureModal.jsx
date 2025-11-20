import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LeadCaptureModal = ({ show, onClose, tier, listId, onSuccess }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState("form");

    const modalRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                if (show) {
                    onClose();
                    setStatus("form");
                    onSuccess();
                }
            }
        };

        if (show) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [show, onClose, onSuccess]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // ⭐ ALWAYS the correct URL in:
            // - local netlify dev
            // - netlify production
            // - gh-pages build
            const functionUrl = "/.netlify/functions/addLead";

            const res = await fetch(functionUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    tier,
                    listId,
                }),
            });

            if (!res.ok) throw new Error(await res.text());

            setStatus("thankyou");
            setSubmitting(false);
        } catch (err) {
            console.error("Constant Contact error:", err);
            setStatus("error");
            setSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="bg-black/90 p-8 rounded-2xl border border-[#9b26b6]/40 w-[90%] max-w-[500px]"
                    >
                        {/* ================= FORM ================= */}
                        {status === "form" && (
                            <>
                                <h3 className="text-center text-2xl font-bold mb-6">
                                    Join the {tier} Program
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        name="firstName"
                                        placeholder="First Name"
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20"
                                    />

                                    <input
                                        name="lastName"
                                        placeholder="Last Name"
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20"
                                    />

                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email *"
                                        required
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20"
                                    />

                                    <button
                                        disabled={submitting}
                                        className="w-full py-4 bg-gradient-to-r from-[#9b26b6] to-[#7f1aa1] 
                                                   rounded-xl font-bold"
                                    >
                                        {submitting ? "Submitting…" : "Submit"}
                                    </button>
                                </form>

                                <button
                                    onClick={onClose}
                                    className="mt-4 mx-auto block text-sm text-[#dcb8e9]"
                                >
                                    Cancel
                                </button>
                            </>
                        )}

                        {/* ================= THANK YOU ================= */}
                        {status === "thankyou" && (
                            <motion.div
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, ease: "easeOut" }}
                                className="text-center py-10 px-4"
                            >
                                <h3 className="text-2xl font-extrabold text-[#9b26b6] mb-4 leading-snug">
                                    Thank You — You Just Took the Step That Changes Everything
                                </h3>

                                <p className="text-gray-300 text-[0.95rem] leading-relaxed mb-4">
                                    Your request is received. Our team will reach out shortly.
                                </p>

                                <p className="text-[#9b26b6] text-sm font-semibold mt-4">
                                    — The Meet Tony Team
                                </p>
                            </motion.div>
                        )}

                        {/* ================= ERROR ================= */}
                        {status === "error" && (
                            <div className="text-center py-10 text-red-400 text-lg font-semibold">
                                Error — try again.
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LeadCaptureModal;
