import React from "react";

const base = import.meta.env.BASE_URL;

export default function PartnersShowcase() {
    const partners = [
        { name: "MBA", logo: `${base}assets/partners/mba.png` },
        { name: "National Mortgage News", logo: `${base}assets/partners/nmn.png` },
        { name: "Scotsman Guide", logo: `${base}assets/partners/scotsman.png` },
        { name: "Inman", logo: `${base}assets/partners/inman.png` },
        { name: "MPA", logo: `${base}assets/partners/mpa.jpg` },
        { name: "NAMB", logo: `${base}assets/partners/namb_logo.png` }, // ✅ added back
    ];

    return (
        <section
            id="partners"
            className="w-full bg-white text-black flex flex-col items-center justify-center pt-4 pb-0"
        >
            {/* Keep original “Trusted by Industry Leaders” style */}
            <h2 className="text-xl md:text-2xl font-bold text-[#111] tracking-wider mb-1">
                Trusted by Industry Leaders
            </h2>
            <h3 className="text-[clamp(1.4rem,3.5vw,2rem)] font-extrabold text-[#7d1f97] mb-4 uppercase tracking-tight">
                As Featured In
            </h3>

            {/* Partner Logos Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-8 max-w-7xl w-full items-center justify-items-center pb-0">
                {partners.map((partner) => (
                    <div
                        key={partner.name}
                        className="relative flex items-center justify-center w-[150px] h-[70px] opacity-90 hover:opacity-100 transition-all duration-500"
                    >
                        <img
                            src={partner.logo}
                            alt={partner.name}
                            className="object-contain w-full h-full"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
