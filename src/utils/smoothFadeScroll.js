// ✅ src/utils/smoothFadeScroll.js — Same hamburger fog, now fades out faster
export async function smoothFadeScroll(targetSelector, duration = 1000) {
    return new Promise((resolve) => {
        console.log("🌫️ smoothFadeScroll triggered for", targetSelector);

        // Clean up any leftover fog overlays
        document.querySelectorAll("#fade-preoverlay, #scroll-fog-overlay").forEach((el) => el.remove());

        // Create fog identical to hamburger overlay
        const fog = document.createElement("div");
        fog.id = "scroll-fog-overlay";
        Object.assign(fog.style, {
            position: "fixed",
            inset: "0",
            zIndex: "2147483645",
            pointerEvents: "auto",
            opacity: "0",
            transition: "opacity 0.9s ease-out",
            background:
                "radial-gradient(circle at center, rgba(155,38,182,0.3) 0%, rgba(40,0,60,0.95) 70%, rgba(0,0,0,0.98) 100%)",
        });
        document.body.appendChild(fog);

        // Fade in immediately
        requestAnimationFrame(() => (fog.style.opacity = "1"));

        // Helper: wait until Lenis + target ready
        const waitForReady = async (selector, timeout = 20000) => {
            const start = performance.now();
            return new Promise((resolve) => {
                const tick = () => {
                    const el =
                        document.getElementById(selector.replace(/^#/, "")) ||
                        document.querySelector(selector);
                    const lenisReady = !!window.lenis;
                    const domReady = document.readyState === "complete";
                    if (el && lenisReady && domReady) return resolve(el);
                    if (performance.now() - start < timeout)
                        return requestAnimationFrame(tick);
                    console.warn("⚠️ Timeout waiting for target:", selector);
                    resolve(null);
                };
                tick();
            });
        };

        // Fog clear helper
        const clearFog = () => {
            fog.style.opacity = "0";
            setTimeout(() => {
                fog.remove();
                console.log("🌫️ Fog cleared ✅");
                resolve();
            }, 600); // faster fade-out (was 900)
        };

        // Start after slight delay
        setTimeout(async () => {
            const el = await waitForReady(targetSelector);
            if (!el) return clearFog();

            const lenis = window.lenis;
            let cleared = false;

            if (lenis) {
                console.log("🌀 Lenis scrollTo", targetSelector);

                const handleScrollEnd = () => {
                    if (cleared) return;
                    cleared = true;
                    clearFog();
                    lenis.off("scrollEnd", handleScrollEnd);
                };

                lenis.on("scrollEnd", handleScrollEnd);

                // Start scroll after hero stable
                setTimeout(() => {
                    lenis.scrollTo(el, { duration: 2.2, offset: -40 });
                }, 800);

                // 🕓 Shorter safety timeout (was 7000 → now 3000)
                setTimeout(() => {
                    if (!cleared) clearFog();
                }, 3000);
            } else {
                // fallback smooth scroll
                el.scrollIntoView({ behavior: "smooth" });
                setTimeout(clearFog, 1800);
            }
        }, duration / 2);
    });
}
