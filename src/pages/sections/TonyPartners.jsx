// ✅ src/pages/sections/PartnersShowcase.jsx — Top padding = 2cm, optimized spacing
import React, { useRef } from "react";
import {
    motion,
    useInView,
    useMotionTemplate,
    useMotionValue,
} from "framer-motion";

const base = import.meta.env.BASE_URL;

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

export default function PartnersShowcase() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <section
            id="partners"
            ref={ref}
            onMouseMove={handleMouseMove}
            className="partners-section relative w-full"
        >
            <style>{`
                :root { --np: #9b26b6; }

                .partners-section {
                    background: white;
                    /* 🔥 TOP PADDING NOW EXACTLY 2CM (~75px) */
                    padding: 15px 2rem 8rem 2rem;
                    color: black;
                    text-align: center;
                    perspective: 1000px;
                    position: relative;
                }

                /* 🔥 Heading slight lift (~50px) */
                .heading-lift {
                    margin-top: -50px;
                }

                /* 🔥 Logos major lift (~200px) */
                .logos-lift {
                    margin-top: -200px;
                }

                .spotlight-overlay {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background: radial-gradient(
                        550px circle at var(--mouse-x) var(--mouse-y),
                        rgba(155,38,182,0.08),
                        transparent 65%
                    );
                    z-index: 2;
                }

                .grid-lines {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
                    background-size: 60px 60px;
                    opacity: 0.2;
                    mask-image: radial-gradient(circle at center, black 30%, transparent 85%);
                    z-index: 1;
                }

                .status-indicator {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    border: 1px solid rgba(155,38,182,0.3);
                    padding: 4px 12px;
                    background: rgba(155,38,182,0.06);
                    color: var(--np);
                    font-family: monospace;
                    letter-spacing: 2px;
                    font-size: 0.8rem;
                }

                .blink-dot {
                    width: 6px;
                    height: 6px;
                    background: var(--np);
                    border-radius: 50%;
                    animation: blink 1s infinite;
                }

                @keyframes blink { 50% { opacity: 0; } }

                .main-title {
                    font-family: 'Arial Black', sans-serif;
                    font-size: clamp(2.4rem, 6vw, 4rem);
                    margin-top: 1.5rem;
                    text-transform: uppercase;
                    letter-spacing: -2px;
                    line-height: 1;
                }

                .main-title span {
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(0,0,0,0.8);
                }
            `}</style>

            {/* Spotlight */}
            <motion.div
                className="spotlight-overlay"
                style={{
                    "--mouse-x": useMotionTemplate`${mouseX}px`,
                    "--mouse-y": useMotionTemplate`${mouseY}px`,
                }}
            />

            <div className="grid-lines" />

            {/* === HEADING (slightly lifted) === */}
            <div
                className="heading-lift relative section-header"
                style={{ zIndex: 9999 }}
            >
                <div className="status-indicator">
                    <span className="blink-dot"></span>
                    SYSTEM_TRUST_ESTABLISHED
                </div>

                <motion.h2
                    className="main-title"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    Trusted by<br />
                    <span>Industry Titans</span>
                </motion.h2>
            </div>

            {/* === LOGOS GRID (strong upward shift) === */}
            <div
                className="
                    logos-lift 
                    grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
                    gap-12 md:gap-16
                    justify-items-center
                    w-full max-w-7xl mx-auto mt-16
                    relative z-10
                "
            >
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
                        className="
                            flex items-center justify-center 
                            w-[260px] md:w-[320px]
                            h-[150px] md:h-[170px]
                            bg-white rounded-2xl 
                            shadow-[0_0_25px_rgba(0,0,0,0.05)]
                            hover:shadow-[0_0_50px_rgba(155,38,182,0.25)]
                            transition-all duration-500 overflow-hidden
                        "
                    >
                        <img
                            src={partner.logo}
                            alt={partner.name}
                            className="object-contain w-[90%] h-[90%]"
                        />
                    </motion.a>
                ))}
            </div>
        </section>
    );
}
