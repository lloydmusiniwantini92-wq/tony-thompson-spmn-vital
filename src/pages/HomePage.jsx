import React, { useEffect } from "react";

import Hero from "../components/Hero";
import MeetTony from "../components/MeetTony";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import TrustSection from "../components/TrustSection";
import BookTonySection from "../components/BookTonySection";
import TierList from "../components/TierList";

export default function HomePage({ setHeroVisible }) {

    // ⭐ HARD OVERRIDE — TELEPORT TO PROGRAMS (WITH STUCK FOG FIX)
    useEffect(() => {
        if (typeof window === "undefined") return;

        const params = new URLSearchParams(window.location.search);
        const target = params.get("target");

        if (target === "programs") {
            // 1. BACKUP: Save the original function to restore later
            const originalFog = window.triggerGlobalFog;

            // 2. NEUTRALIZE: Replace with a silent pass-through
            window.triggerGlobalFog = (cb) => cb?.();

            // 3. FORCE CLEANUP: aggressively find and hide the overlay
            // We use an interval to fight any global scripts running on load
            const cleanUpInterval = setInterval(() => {
                const overlay = window.fadeOverlay || document.querySelector("#scroll-fog-overlay") || document.querySelector("[id*='fog']");
                if (overlay) {
                    overlay.style.opacity = "0";
                    overlay.style.pointerEvents = "none";
                }
            }, 50);

            // 4. JUMP: Perform the scroll
            setTimeout(() => {
                const el = document.querySelector("#programs");
                if (el) {
                    window.scrollTo({ top: el.offsetTop, behavior: "auto" });
                }
            }, 10);

            // 5. RESTORE & RESET: After 2 seconds (safely landed), restore normalcy
            setTimeout(() => {
                clearInterval(cleanUpInterval); // Stop forcing it hidden

                // Put the original function back for future scrolls
                if (originalFog) {
                    window.triggerGlobalFog = originalFog;
                }

                // IMPORTANT: Ensure the overlay is ready for next time (reset props)
                const overlay = window.fadeOverlay || document.querySelector("#scroll-fog-overlay");
                if (overlay) {
                    overlay.style.opacity = "0";
                    overlay.style.pointerEvents = "auto"; // Re-enable interaction for future fogs
                    overlay.style.transition = ""; // Restore CSS transitions
                }
            }, 2000);
        }
    }, []);

    return (
        <div className="flex flex-col w-full">
            <Hero setHeroVisible={setHeroVisible} />

            <MeetTony />

            <About />
            <Testimonials />

            <div className="h-[8vh] w-full bg-gradient-to-b from-transparent via-[#9b26b6]/20 to-black"></div>

            <TrustSection />
            <BookTonySection />
            <TierList />
        </div>
    );
}