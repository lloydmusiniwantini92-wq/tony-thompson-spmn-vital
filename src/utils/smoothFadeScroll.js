import { dreamyOverlayStyle, animateDreamyPulse } from "./fadeStyles.js";

export async function smoothFadeScroll(targetSelector, duration = 1000) {
    return new Promise((resolve) => {
        console.log("🌫️ smoothFadeScroll start for", targetSelector);

        // === 1. Create overlay ===
        const overlay = document.createElement("div");
        overlay.id = "fade-scroll-overlay";
        Object.assign(overlay.style, {
            position: "fixed",
            inset: "0",
            zIndex: "999999",
            opacity: "0",
            pointerEvents: "auto",
            transition: `opacity ${duration / 2}ms ease`,
            ...dreamyOverlayStyle,
        });
        document.body.appendChild(overlay);
        animateDreamyPulse(overlay);

        // === 2. Fade IN ===
        requestAnimationFrame(() => (overlay.style.opacity = "1"));

        // === Helper: Wait for element + Lenis + DOM settled ===
        const waitForReady = async (selector, timeout = 20000) => {
            const start = performance.now();
            return new Promise((resolve, reject) => {
                const tick = () => {
                    const el =
                        document.getElementById(selector.replace(/^#/, "")) ||
                        document.querySelector(selector);
                    const lenisReady = !!window.lenis;
                    const hero = document.querySelector("#home");
                    const heroDone =
                        hero && hero.getBoundingClientRect().bottom > 200;
                    if (el && lenisReady && heroDone) return resolve(el);
                    if (performance.now() - start < timeout)
                        return requestAnimationFrame(tick);
                    reject(new Error("Timeout waiting for ready state"));
                };
                tick();
            });
        };

        // === 3. After fade-in, start checking for readiness ===
        setTimeout(async () => {
            try {
                const el = await waitForReady(targetSelector);
                console.log("✅ Ready — scrolling to", el?.id);
                const lenis = window.lenis;

                if (lenis) {
                    // Perform scroll smoothly
                    lenis.scrollTo(el, { duration: 1.5, offset: -20 });

                    // Wait for scrollEnd before fade-out
                    const onScrollEnd = () => {
                        lenis.off("scrollEnd", onScrollEnd);
                        overlay.style.opacity = "0";
                        setTimeout(() => {
                            overlay.remove();
                            console.log("🌫️ Fog removed (after scrollEnd)");
                            resolve();
                        }, duration);
                    };
                    lenis.on("scrollEnd", onScrollEnd);
                } else {
                    console.warn("⚠️ Lenis missing, fallback scroll");
                    el.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => {
                        overlay.style.opacity = "0";
                        setTimeout(() => {
                            overlay.remove();
                            resolve();
                        }, duration / 2);
                    }, 1500);
                }
            } catch (err) {
                console.warn("⚠️ smoothFadeScroll fallback:", err);
                overlay.style.opacity = "0";
                setTimeout(() => {
                    overlay.remove();
                    resolve();
                }, duration / 2);
            }
        }, duration / 2);
    });
}
