import React from "react";

export default function ScrollArrow({ target = "#meet-tony" }) {
    const scrollToTarget = () => {
        const el = document.querySelector(target);
        if (el) {
            const lenis = window.lenis;
            lenis
                ? lenis.scrollTo(el, { duration: 1.2 })
                : el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div
            onClick={scrollToTarget}
            className="group cursor-pointer flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2 select-none"
            style={{
                bottom: "-1.5rem", // stays near base of hero
                position: "absolute",
            }}
        >
            {/* === “SCROLL” Label === */}
            <span
                className="text-white font-['Press_Start_2P'] text-[0.6rem]
                tracking-[0.15em] mb-[10px]
                drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]
                select-none"
                style={{
                    transform: "scaleY(2)", // vertical stretch ×2
                    display: "inline-block",
                    transformOrigin: "center",
                }}
            >
                SCROLL
            </span>

            {/* === Single Animated Arrow (no block, no triangle) === */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[22px] h-[22px] text-[#9b26b6] animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </div>
    );
}
