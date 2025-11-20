import React from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
    const navigate = useNavigate();

    return (
        <section className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">
            <div className="max-w-3xl text-center">

                {/* Heading */}
                <h1 className="text-[clamp(2.4rem,4vw,3.5rem)] font-extrabold tracking-tight leading-tight">
                    Thank You for Your Inquiry!
                </h1>

                {/* Paragraph */}
                <p className="mt-6 text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">
                    Your request to book Tony Thompson as a keynote speaker has been received.
                    <br /><br />
                    A member of our team will review your submission and contact you shortly to
                    discuss availability, event details, and next steps.
                    <br /><br />
                    We appreciate your interest in having Tony inspire and engage your audience —
                    and we look forward to connecting soon!
                    <br /><br />
                    <span className="opacity-70">— The Meet Tony Team</span>
                </p>

                {/* Back Home Button */}
                <div className="mt-14 flex justify-center">
                    <button
                        onClick={() => navigate("/")}
                        className="relative flex justify-center items-center w-[180px] h-[62px]
                        text-white font-['Press_Start_2P'] text-[0.85rem] cursor-pointer group
                        bg-gradient-to-br from-[#7d1f97]/85 to-[#952ca8]/70
                        rounded-[12px] border border-white/20
                        shadow-[0_10px_25px_rgba(155,38,182,0.7)]
                        transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.3,1)]
                        hover:translate-y-[-5px] uppercase tracking-wider"
                    >
                        <div
                            className="absolute inset-0 bg-gradient-to-r
                            from-transparent via-white/25 to-transparent
                            animate-pulseGlow rounded-[12px]"
                        />
                        <span className="transition-all duration-500 group-hover:opacity-0">
                            BACK
                        </span>
                        <span className="absolute opacity-0 transition-all duration-500 group-hover:opacity-100">
                            HOME
                        </span>
                    </button>
                </div>
            </div>

            {/* Pulse Glow Animation */}
            <style>{`
                @keyframes pulseGlow {
                    0%,100% { opacity:0.35; transform:translateX(-25%); }
                    50% { opacity:0.95; transform:translateX(25%); }
                }
                .animate-pulseGlow {
                    animation:pulseGlow 6s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
