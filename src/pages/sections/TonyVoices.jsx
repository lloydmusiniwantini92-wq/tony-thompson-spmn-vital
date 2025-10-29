// ✅ src/pages/sections/TonyVoices.jsx — “HEAR THE VOICES” (Updated Client Copy)
import React from "react";
import PartnersShowcase from "./PartnersShowcase";

export default function TonyVoices() {
    return (
        <section
            id="tony-voices"
            className="w-full bg-white text-black flex flex-col items-center justify-center py-24 px-6"
        >
            {/* === Heading & Description === */}
            <div className="max-w-5xl text-center mb-16">
                <h1
                    className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase tracking-tight
                    bg-gradient-to-r from-[#7a1a8f] via-[#9b26b6] to-[#b14fc0]
                    text-transparent bg-clip-text drop-shadow-[0_2px_12px_rgba(155,38,182,0.25)]"
                >
                    HEAR THE VOICES
                </h1>

                <div
                    className="mt-10 text-[1.1rem] md:text-[1.25rem] leading-[1.8] max-w-3xl mx-auto 
                    text-[#444] font-medium tracking-wide space-y-8"
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

            {/* === PARTNERS GRID SECTION === */}
            <PartnersShowcase />

            {/* === Ambient Gradient Divider === */}
            <div className="w-full mt-20 h-[1px] bg-gradient-to-r from-transparent via-[#9b26b6]/60 to-transparent" />
        </section>
    );
}
