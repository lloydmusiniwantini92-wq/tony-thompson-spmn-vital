// =============================================================
//  FINAL smoothFadeScroll.js — Bulletproof scrolling
//  Works locally AND on GitHub Pages AND with lazy routes
// =============================================================

export async function smoothFadeScroll(targetSelector) {
    return new Promise((resolve) => {
        console.log("🌫️ smoothFadeScroll triggered for", targetSelector);

        // --- Remove old overlays ---
        document.querySelectorAll("#fade-preoverlay, #scroll-fog-overlay").forEach(el => el.remove());

        // --- Fog Layer ---
        const fog = document.createElement("div");
        fog.id = "scroll-fog-overlay";
        Object.assign(fog.style, {
            position: "fixed",
            inset: "0",
            zIndex: "2147483645",
            pointerEvents: "none",
            opacity: "0",
            transition: "opacity .45s ease-out",
            background:
                "radial-gradient(circle at center, rgba(155,38,182,0.3) 0%, rgba(40,0,60,0.95) 70%, rgba(0,0,0,0.98) 100%)",
        });
        document.body.appendChild(fog);

        requestAnimationFrame(() => (fog.style.opacity = "1"));

        // --- Wait for target + hydration ---
        const waitForReady = async (timeout = 15000) => {
            const start = performance.now();

            return new Promise((resolve) => {
                const tick = () => {
                    const el =
                        document.getElementById(targetSelector.replace("#", "")) ||
                        document.querySelector(targetSelector);

                    // Element exists → return immediately even if Lenis isn't ready
                    if (el) return resolve(el);

                    if (performance.now() - start < timeout) {
                        requestAnimationFrame(tick);
                    } else {
                        console.warn("⚠️ Timeout waiting for:", targetSelector);
                        resolve(null);
                    }
                };
                tick();
            });
        };

        const clearFog = () => {
            fog.style.opacity = "0";
            setTimeout(() => {
                fog.remove();
                resolve();
            }, 350);
        };

        // --- Begin scroll ---
        (async () => {
            const target = await waitForReady();
            if (!target) return clearFog();

            // 🔥 KILL LENIS before scroll (this is what fixes the hero-lock)
            const lenis = window.lenis;
            if (lenis) {
                lenis.stop();
            }

            // ⭐ INSTANT manual scroll — avoids homepage Hero freeze
            const y = target.getBoundingClientRect().top + window.scrollY - 40;
            window.scrollTo({ top: y, behavior: "instant" });

            // After scroll, restore Lenis
            setTimeout(() => {
                if (lenis) lenis.start();
                clearFog();
            }, 350);
        })();
    });
}
