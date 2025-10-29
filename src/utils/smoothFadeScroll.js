// src/utils/smoothFadeScroll.js
import { dreamyOverlayStyle, animateDreamyPulse } from "./fadeStyles.js";

export async function smoothFadeScroll(targetSelector, duration = 1000) {
    return new Promise((resolve) => {
        // === Create overlay ===
        const overlay = document.createElement("div");
        overlay.id = "fade-scroll-overlay";
        Object.assign(overlay.style, {
            position: "fixed",
            inset: "0",
            opacity: "0",
            zIndex: "999999",
            pointerEvents: "none",
            transition: `opacity ${duration / 2}ms ease`,
            ...dreamyOverlayStyle, // ✨ dreamy haze style
        });
        document.body.appendChild(overlay);

        // subtle breathing pulse
        animateDreamyPulse(overlay);

        // === Fade OUT ===
        requestAnimationFrame(() => {
            overlay.style.opacity = "1";
        });

        // === Helper to wait until section is ready ===
        const waitFor = (selector, timeout = 20000) =>
            new Promise((resolve, reject) => {
                const start = performance.now();
                const tick = () => {
                    const el =
                        document.getElementById(selector.replace(/^#/, "")) ||
                        document.querySelector(selector);
                    if (el) return resolve(el);
                    if (performance.now() - start < timeout) return requestAnimationFrame(tick);
                    reject();
                };
                tick();
            });

        // === Scroll invisibly while overlay covers everything ===
        setTimeout(async () => {
            try {
                const el = await waitFor(targetSelector, 20000);
                if (window.lenis) {
                    window.lenis.scrollTo(el, { duration: 0, immediate: true, offset: -20 });
                } else {
                    el.scrollIntoView({ behavior: "instant" });
                }
            } catch {
                console.warn(`⚠️ ${targetSelector} not found`);
            }

            // === Fade IN once scrolled ===
            setTimeout(() => {
                overlay.style.opacity = "0";
                setTimeout(() => {
                    overlay.remove();
                    resolve();
                }, duration / 2);
            }, 250);
        }, duration / 2);
    });
}
