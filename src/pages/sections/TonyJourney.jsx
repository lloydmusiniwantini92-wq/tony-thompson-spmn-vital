import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import mzhandu1 from "../../assets/images/mzhandu1.jpg";
import mzhandu2 from "../../assets/images/mzhandu2.jpg";
import mzhandu3 from "../../assets/images/mzhandu3.png";
import komba1 from "../../assets/images/komba1.jpg";
import komba2 from "../../assets/images/komba2.jpg";
import komba3 from "../../assets/images/komba3.jpg";
import komba4 from "../../assets/images/komba4.jpg";

export default function TonyJourney() {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { threshold: 0.3 });

    const [activeImage, setActiveImage] = useState(0);

    const images = [mzhandu1, mzhandu2, mzhandu3, komba1, komba2, komba3, komba4];

    // ✅ Preload all images for smooth transitions
    useEffect(() => {
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    // ✅ Crossfade logic
    useEffect(() => {
        if (!inView) return;
        const interval = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % images.length);
        }, 4000); // 4s per image (matches previous fade rhythm)
        return () => clearInterval(interval);
    }, [inView, images.length]);

    return (
        <section
            ref={sectionRef}
            id="tony-journey"
            className="relative w-full min-h-screen flex items-center justify-between overflow-hidden bg-black text-white"
        >
            {/* === Background gradients === */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-[#180017]/95 to-[#9b26b6]/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,rgba(155,38,182,0.25),transparent_70%)] mix-blend-soft-light" />

            {/* === Right-side crossfading image sequence === */}
            <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
                {images.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`Tony Journey Phase ${i + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-[cubic-bezier(0.25,1,0.3,1)] ${i === activeImage ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}
            </div>

            {/* === Left-side text === */}
            <motion.div
                initial={{ opacity: 0, x: -80 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative z-10 flex flex-col justify-center pl-[6vw] max-w-[45%] space-y-6"
            >
                <h2 className="text-[clamp(2.2rem,4.5vw,4rem)] font-bold leading-tight">
                    The <span className="text-[#9b26b6]">Journey</span> to Mastery
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                    Every ascent begins with awareness. Tony’s journey is one of evolving systems —
                    transforming human potential into structured brilliance.
                </p>
                <p className="text-gray-400 text-base leading-relaxed">
                    Through decades of impact, he’s refined a principle: progress without alignment is chaos.
                    Leadership, therefore, must be both science and spirit — logic with empathy, vision with precision.
                </p>
            </motion.div>
        </section>
    );
}
