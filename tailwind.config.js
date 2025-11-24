/** @type {import('tailwindcss').Config} */
export default {
    important: true,
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
               🔮 BRAND SYSTEM — TONY’S PURPLE CORE
               ========================================= */
            colors: {
                brandPurple: "#A45BE0",   // ⭐ TRUE Tony purple (master)
                brandPurpleLight: "#C88CF3",
                brandPurpleDark: "#7A35B0",

                brandBlack: "#111",
                brandGray: "#3A3A3A",
            },

            /* =========================================
               🎨 UPDATED BRAND GRADIENTS 
               (Built off Tony’s real purple #A45BE0)
               ========================================= */
            backgroundImage: {
                "brand-gradient":
                    "linear-gradient(180deg, #A45BE0 0%, #C88CF3 50%, #7A35B0 100%)",

                "brand-soft":
                    "linear-gradient(180deg, #B67DEB 0%, #A45BE0 100%)",

                "brand-darkfade":
                    "linear-gradient(180deg, #7A35B0 0%, #111 100%)",
            },

            /* =========================================
               ✒ TYPOGRAPHY
               ========================================= */
            fontFamily: {
                montserrat: ["Montserrat", "sans-serif"],
                p2: ["'Press Start 2P'", "monospace"],
                talisman: ['"PP Talisman Display"', '"PP Talisman"', "serif"],
            },

            /* =========================================
               📱 RESPONSIVE SCREENS + CONTAINER
               ========================================= */
            screens: {
                xs: "360px",
                sm: "480px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1536px",
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
                    "0%": { textShadow: "0 0 8px rgba(164,91,224,0.0)" },
                    "50%": { textShadow: "0 0 18px rgba(164,91,224,0.8)" },
                    "100%": { textShadow: "0 0 0 rgba(164,91,224,0.0)" },
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
