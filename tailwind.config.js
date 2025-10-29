/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    safelist: [
        "active",
        "translate-x-0",
        "translate-x-full",
    ],
    theme: {
        extend: {
            /* =========================================
               🔮 BRAND SYSTEM
               ========================================= */
            colors: {
                brandPurple: "#9b26b6",
                brandLight: "#b84fd4",
                brandDark: "#6d1a8c",
                brandAccent: "#b14fc0",
                brandBlack: "#111",
            },

            backgroundImage: {
                "brand-gradient":
                    "linear-gradient(180deg, #9b26b6 0%, #b84fd4 50%, #6d1a8c 100%)",
                "brand-soft":
                    "linear-gradient(180deg, #a94ad0 0%, #9b26b6 100%)",
                "brand-darkfade":
                    "linear-gradient(180deg, #6d1a8c 0%, #111 100%)",
            },

            fontFamily: {
                montserrat: ["Montserrat", "sans-serif"],
                p2: ["'Press Start 2P'", "monospace"],
                talisman: ['"PP Talisman Display"', '"PP Talisman"', "serif"],
            },

            /* =========================================
               📱 RESPONSIVE SCREENS + CONTAINER
               ========================================= */
            screens: {
                xs: "360px",     // very small phones
                sm: "480px",     // small phones
                md: "768px",     // tablets
                lg: "1024px",    // small laptops
                xl: "1280px",    // desktops
                "2xl": "1536px", // large screens
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                    sm: "1.25rem",
                    md: "1.5rem",
                    lg: "2rem",
                    xl: "3rem",
                },
            },

            /* =========================================
               ✨ ANIMATIONS
               ========================================= */
            keyframes: {
                glitchFadeIn: {
                    "0%": { opacity: "0", transform: "translateY(-10px)", filter: "blur(3px)" },
                    "30%": { opacity: "0.4", filter: "blur(2px)" },
                    "60%": { opacity: "1", transform: "translateY(2px)", filter: "blur(0.5px)" },
                    "80%": { opacity: "0.85" },
                    "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
                },
                hazeGlow: {
                    "0%": { textShadow: "0 0 8px rgba(155,38,182,0.0)" },
                    "50%": { textShadow: "0 0 18px rgba(155,38,182,0.8)" },
                    "100%": { textShadow: "0 0 0 rgba(155,38,182,0.0)" },
                },
                pulseGlow: {
                    "0%,100%": { opacity: "0.4", transform: "translateX(-25%)" },
                    "50%": { opacity: "0.9", transform: "translateX(25%)" },
                },
            },
            animation: {
                glitchFadeIn: "glitchFadeIn 0.8s ease forwards",
                hazeGlow: "hazeGlow 1.2s ease-in-out forwards",
                pulseGlow: "pulseGlow 6s ease-in-out infinite",
            },

            /* =========================================
               📏 MOBILE-SAFE UTILITIES
               ========================================= */
            spacing: {
                "safe-top": "env(safe-area-inset-top)",
                "safe-bottom": "env(safe-area-inset-bottom)",
            },
            maxWidth: {
                "screen-xs": "360px",
                "screen-sm": "480px",
            },
        },
    },
    plugins: [],
};
