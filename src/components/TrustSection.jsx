import React from "react";
import { motion } from "framer-motion";

import house from "../assets/partners/House.png";
import inman from "../assets/partners/inman.png";
import mba from "../assets/partners/mba.png";
import mpa from "../assets/partners/mpa.jpg";
import namb from "../assets/partners/namb.png";
import nmn from "../assets/partners/nmn.png";
import realtor from "../assets/partners/Real.jpg";
import scotsman from "../assets/partners/scotsman.png";

export default function TrustSection() {
    const partners = [
        { name: "Mortgage Bankers Association (MBA)", logo: mba, link: "https://www.mba.org/" },
        { name: "National Association of REALTORS®", logo: realtor, link: "https://www.nar.realtor/" },
        { name: "Scotsman Guide", logo: scotsman, link: "https://www.scotsmanguide.com/" },
        { name: "National Mortgage News", logo: nmn, link: "https://www.nationalmortgagenews.com/" },
        { name: "Mortgage Professional America (MPA)", logo: mpa, link: "https://www.mpamag.com/" },
        { name: "National Association of Mortgage Brokers (NAMB)", logo: namb, link: "https://namb.org/" },
        { name: "Inman", logo: inman, link: "https://www.inman.com/" },
        { name: "HousingWire", logo: house, link: "https://www.housingwire.com/" },
    ];

    return (
        <section
            id="trust"
            className="relative flex flex-col items-center justify-center w-full bg-white text-[#111] py-[8rem] px-[5vw] overflow-hidden"
            style={{
                position: "relative",
                zIndex: 15,
                marginTop: "-64px", // ✅ overlap fix
            }}
        >
            {/* Smooth upward white gradient to mask overlap */}
            <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-[#fff] via-[#fff]/95 to-[#fff]/90 pointer-events-none z-[0]" />

            {/* Heading */}
            <motion.h2
                className="text-[clamp(2rem,4vw,4rem)] font-extrabold tracking-tight text-center mb-6 uppercase relative z-[1]"
                style={{ color: "#9b26b6" }} // 💜 purple brand color
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 1, 0.3, 1] }}
                viewport={{ once: true }}
            >
                Trusted by Industry Leaders
            </motion.h2>

            <motion.p
                className="text-lg md:text-xl text-[#444] text-center max-w-2xl mb-12 relative z-[1]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1 }}
                viewport={{ once: true }}
            >
                Featured and recognized by the nation’s most respected real estate and
                mortgage organizations.
            </motion.p>

            {/* Logo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-16 place-items-center w-full max-w-7xl relative z-[1]">
                {partners.map((partner, i) => (
                    <motion.a
                        key={partner.name}
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center 
                           w-[260px] md:w-[320px]
                           h-[150px] md:h-[170px]
                           bg-white rounded-2xl 
                           shadow-[0_0_30px_rgba(0,0,0,0.08)]
                           hover:shadow-[0_0_60px_rgba(155,38,182,0.25)]
                           transition-all duration-500 overflow-hidden"
                    >
                        <img
                            src={partner.logo}
                            alt={partner.name}
                            loading="lazy"
                            className={`object-contain ${partner.name.includes("NAMB")
                                ? "w-[90%] h-[90%] scale-125 -translate-y-1"
                                : "w-[75%] h-auto"
                                }`}
                        />
                    </motion.a>
                ))}
            </div>
        </section>
    );
}
