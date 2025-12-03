import React from "react";
import { motion } from "framer-motion";

const base = import.meta.env.BASE_URL;

export default function TrustSection() {
    const partners = [
        { name: "Mortgage Bankers Association (MBA)", logo: `${base}assets/partners/mba.png`, link: "https://www.mba.org/" },
        { name: "National Association of REALTORS®", logo: `${base}assets/partners/Real.jpg`, link: "https://www.nar.realtor/" },
        { name: "Scotsman Guide", logo: `${base}assets/partners/scotsman.png`, link: "https://www.scotsmanguide.com/" },
        { name: "National Mortgage News", logo: `${base}assets/partners/nmn.png`, link: "https://www.nationalmortgagenews.com/" },
        { name: "Mortgage Professional America (MPA)", logo: `${base}assets/partners/mpa.jpg`, link: "https://www.mpamag.com/" },
        { name: "National Association of Mortgage Brokers (NAMB)", logo: `${base}assets/partners/namb_logo.png`, link: "https://namb.org/" },
        { name: "Inman", logo: `${base}assets/partners/inman.png`, link: "https://www.inman.com/" },
        { name: "HousingWire", logo: `${base}assets/partners/House.png`, link: "https://www.housingwire.com/" },
    ];

    return (
        <section
            id="trust"
            // ⭐ OPTIMIZATION: Reduced padding on mobile (py-20) vs Desktop (py-[8rem])
            className="relative flex flex-col items-center justify-center w-full bg-white text-[#111] py-20 md:py-[8rem] px-[5vw] overflow-hidden"
            style={{
                position: "relative",
                zIndex: 15,
                marginTop: "-64px",
            }}
        >
            <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-[#fff] via-[#fff]/95 to-[#fff]/90 pointer-events-none z-[0]" />

            <motion.h2
                className="text-[clamp(1.8rem,4vw,4rem)] font-extrabold tracking-tight text-center mb-6 uppercase relative z-[1]"
                style={{ color: "#9b26b6" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 1, 0.3, 1] }}
                viewport={{ once: true }}
            >
                Trusted by Industry Leaders
            </motion.h2>

            <motion.p
                className="text-base md:text-xl text-[#444] text-center max-w-2xl mb-12 md:mb-12 relative z-[1] px-4 md:px-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1 }}
                viewport={{ once: true }}
            >
                Featured and recognized by the nation’s most respected real estate and
                mortgage organizations.
            </motion.p>

            {/* ⭐ OPTIMIZATION: 
                - grid-cols-1 on Mobile (prevents overflow/squashing)
                - sm:grid-cols-2 (Tablets)
                - lg:grid-cols-4 (Desktop - Original)
                - gap-6 on mobile, gap-16 on desktop
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-16 place-items-center w-full max-w-7xl relative z-[1]">
                {partners.map((partner, i) => (
                    <motion.a
                        key={partner.name}
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }} // Added for mobile responsiveness feel
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        viewport={{ once: true }}
                        // ⭐ OPTIMIZATION:
                        // Mobile: w-full max-w-[300px] (Fluid but constrained), h-[130px] (Compact)
                        // Desktop: w-[320px], h-[170px] (Strictly Original)
                        className="flex items-center justify-center 
                           w-full max-w-[300px] md:max-w-none md:w-[320px]
                           h-[130px] md:h-[170px]
                           bg-white rounded-2xl 
                           shadow-[0_0_20px_rgba(0,0,0,0.06)] md:shadow-[0_0_30px_rgba(0,0,0,0.08)]
                           hover:shadow-[0_0_60px_rgba(155,38,182,0.25)]
                           transition-all duration-500 overflow-hidden"
                    >
                        <img
                            src={partner.logo}
                            alt={partner.name}
                            loading="lazy"
                            className={`object-contain ${partner.name.includes("NAMB")
                                ? "w-[70%] md:w-[80%] h-auto scale-100 translate-y-0"
                                : "w-[65%] md:w-[75%] h-auto"
                                }`}
                        />
                    </motion.a>
                ))}
            </div>
        </section>
    );
}