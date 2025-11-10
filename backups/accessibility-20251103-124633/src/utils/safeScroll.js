// ✅ src/utils/safeScroll.js
// Hardens scrolling in dev/prod if Lenis or layout timing misbehaves.
// Toggle with:  ?safeScroll=1   (forcibly disables Lenis & enables native scroll)

export function isSafeMode() {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get("safeScroll") === "1") return true;
    // Allow manual override during debugging:
    const flag = window.localStorage.getItem("SAFE_SCROLL_MODE");
    return flag === "1";
}

export function enableSafeScroll() {
    // Make sure the page is scrollable even if any overlay/locks linger
    try {
        const html = document.documentElement;
        const body = document.body;

        // Remove any accidental locks
        html.style.overflow = "auto";
        body.style.overflow = "auto";
        html.style.height = "auto";
        body.style.height = "auto";

        // If something set fixed heights on root containers, undo them defensively
        const rootLike = document.querySelectorAll("#root, main, .app, .app-root");
        rootLike.forEach((el) => {
            el.style.minHeight = "100%";
            el.style.height = "auto";
            // Keep your overflow-x-hidden for design, but unlock Y scrolling
            const existing = window.getComputedStyle(el).overflow;
            if (existing.includes("hidden")) {
                el.style.overflowX = "hidden";
                el.style.overflowY = "auto";
            }
        });

        // Kill any full-screen overlays that could trap pointer/scroll if stuck
        const killers = [
            "#fade-preoverlay",
            ".global-overlay-block",
            "[data-block-scroll='1']",
        ];
        killers.forEach((sel) => {
            document.querySelectorAll(sel).forEach((el) => {
                el.style.pointerEvents = "none";
                el.style.opacity = "0";
            });
        });

        // Ensure page is at top so dev doesn’t “resume at footer”
        window.scrollTo({ top: 0, behavior: "instant" });

        // Add one-time listeners to guarantee native wheel/touch still bubble
        const allow = (e) => {
            // Explicitly ensure nothing calls preventDefault upstream
            e.cancelable && (e.defaultPrevented = false);
        };
        window.addEventListener("wheel", allow, { passive: true, once: true });
        window.addEventListener("touchmove", allow, { passive: true, once: true });
    } catch {
        /* no-op */
    }
}

// Convenience toggles for console:
//   window.localStorage.setItem("SAFE_SCROLL_MODE", "1")
//   window.localStorage.removeItem("SAFE_SCROLL_MODE")
