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
                    Tony's voice across the industry
                </h1>

                <p
                    className="mt-6 text-[1.1rem] md:text-[1.25rem] leading-[1.8] max-w-3xl mx-auto 
                    text-[#444] font-medium tracking-wide"
                >
                    Tony has been recognized as a leading voice in the housing and mortgage industry —
                    featured by premier media outlets and institutions shaping the future of real estate.
                </p>
            </div>

            {/* === PARTNERS GRID SECTION === */}
            <PartnersShowcase />

            {/* === Ambient Gradient Divider === */}
            <div className="w-full mt-20 h-[1px] bg-gradient-to-r from-transparent via-[#9b26b6]/60 to-transparent" />
        </section>
    );
}
