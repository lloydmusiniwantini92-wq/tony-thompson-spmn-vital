// ✅ src/pages/sections/TonyVoices.jsx — Clean Montserrat Edition (No 2P Font)
import React from "react";
import PartnersShowcase from "./PartnersShowcase";

export default function TonyVoices() {
    return (
        <section
            id="tony-voices"
            className="w-full bg-white text-black flex flex-col items-center justify-center py-24 px-6 overflow-hidden"
        >
            {/* === HEADING & DESCRIPTION === */}
            <div className="max-w-6xl text-center mb-20 flex flex-col items-center justify-center">
                <h1
                    className="text-[clamp(3rem,8vw,8rem)] font-extrabold uppercase tracking-tight
                    bg-gradient-to-r from-[#7a1a8f] via-[#9b26b6] to-[#b14fc0]
                    text-transparent bg-clip-text drop-shadow-[0_2px_15px_rgba(155,38,182,0.35)]
                    leading-[1.05] md:font-sans text-center mx-auto"
                >
                    HEAR THE VOICES
                </h1>

                <div
                    className="mt-12 text-[1.1rem] md:text-[1.25rem] leading-[1.8]
                    max-w-3xl mx-auto text-[#333] font-medium tracking-wide space-y-10 text-center"
                >
                    <p>
                        “Tony Thompson connects with his audience — every word drives action.”
                        <br />
                        <span className="block mt-2 text-[#9b26b6] font-semibold">
                            — Le Tran, AVP Mortgage Underwriting
                        </span>
                    </p>

                    <p>
                        “When Tony speaks, he doesn’t just deliver a message — he changes the game.”
                        <br />
                        <span className="block mt-2 text-[#9b26b6] font-semibold">
                            — Industry Leader
                        </span>
                    </p>

                    <p>
                        “One of the most powerful and engaging speakers in the industry.”
                        <br />
                        <span className="block mt-2 text-[#9b26b6] font-semibold">
                            — Lindsi Flynn, CMO
                        </span>
                    </p>
                </div>
            </div>

            {/* === PARTNERS GRID SHOWCASE === */}
            <PartnersShowcase />

            {/* === AMBIENT GRADIENT DIVIDER === */}
            <div className="w-full mt-24 h-[1px] bg-gradient-to-r from-transparent via-[#9b26b6]/60 to-transparent" />
        </section>
    );
}
