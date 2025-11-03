// src/utils/fadeStyles.js

// === Dreamy Fade Overlay Styles ===
// You can swap out the export if you want different moods later (foggy, neon, etc.)

export const dreamyOverlayStyle = {
    background:
        "radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, rgba(155,38,182,0.25) 40%, rgba(0,0,0,0.9) 100%)",
    backdropFilter: "blur(14px) saturate(140%) brightness(1.1)",
    WebkitBackdropFilter: "blur(14px) saturate(140%) brightness(1.1)",
    boxShadow: "0 0 80px rgba(155,38,182,0.4) inset",
};

// === Optional looping animation for subtle shimmer ===
// Use this helper if you want a slow, breathing glow effect
export function animateDreamyPulse(overlay) {
    overlay.animate(
        [
            { filter: "blur(14px) brightness(1.05)" },
            { filter: "blur(18px) brightness(1.2)" },
            { filter: "blur(14px) brightness(1.05)" },
        ],
        {
            duration: 3000,
            iterations: Infinity,
            easing: "ease-in-out",
        }
    );
}
