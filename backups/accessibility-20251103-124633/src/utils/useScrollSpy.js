// src/utils/useScrollSpy.js
// Ultra-stable scroll spy that works with Lenis and doesn't rely on IntersectionObserver.
// Picks the section whose bounding box crosses the viewport midpoint (or closest to it).

import { useEffect, useRef, useState } from "react";

export default function useScrollSpy(selectors = [], opts = {}) {
    const {
        /** fraction of viewport height to sample, 0 (top) .. 1 (bottom). Default center 0.5 */
        sample = 0.5,
        /** px hysteresis to avoid flicker near boundaries */
        hysteresis = 12,
        /** minimum ms between updates */
        throttleMs = 80,
        /** allow external override (e.g., after menu click) for N ms */
        lockMs = 800,
    } = opts;

    const [active, setActive] = useState(null);
    const lockedUntil = useRef(0);
    const lastEmit = useRef(0);
    const rafId = useRef(null);
    const sectionsRef = useRef([]);
    const lastScrollY = useRef(-1);

    // public API to lock the spy briefly (e.g., after clicking a menu item)
    const lock = (ms = lockMs) => {
        lockedUntil.current = performance.now() + ms;
    };

    useEffect(() => {
        // resolve live elements list
        const resolveSections = () =>
            selectors
                .map((sel) => document.querySelector(sel))
                .filter(Boolean);

        sectionsRef.current = resolveSections();

        let lenis = null;
        const samplePoint = () => window.innerHeight * sample;

        const computeActive = () => {
            const now = performance.now();

            // Throttle updates
            if (now - lastEmit.current < throttleMs) return;

            // If caller locked the spy (e.g., after navigation), skip updates
            if (now < lockedUntil.current) return;

            const pointY = samplePoint();
            let bestId = null;
            let bestDist = Infinity;

            for (const el of sectionsRef.current) {
                const rect = el.getBoundingClientRect();
                // If midpoint lies within section (with hysteresis), it wins
                if (rect.top - hysteresis <= pointY && rect.bottom + hysteresis >= pointY) {
                    bestId = `#${el.id}`;
                    bestDist = 0;
                    break;
                }
                // Otherwise, pick the closest edge to midpoint
                const dist =
                    pointY < rect.top ? rect.top - pointY :
                        pointY > rect.bottom ? pointY - rect.bottom : 0;
                if (dist < bestDist) {
                    bestDist = dist;
                    bestId = `#${el.id}`;
                }
            }

            if (bestId && bestId !== active) {
                setActive(bestId);
                lastEmit.current = now;
            }
        };

        const onLenisScroll = () => {
            // Lenis emits often; only recompute if scrollY really changed
            const y = window.scrollY || document.documentElement.scrollTop || 0;
            if (y !== lastScrollY.current) {
                lastScrollY.current = y;
                computeActive();
            }
        };

        const loop = () => {
            computeActive();
            rafId.current = requestAnimationFrame(loop);
        };

        // Hook Lenis if present, else fallback to RAF + scroll/resize
        const bind = () => {
            if (window.lenis && typeof window.lenis.on === "function") {
                lenis = window.lenis;
                lenis.on("scroll", onLenisScroll);
                // run once immediately
                computeActive();
            } else {
                // start RAF loop as a stable fallback
                rafId.current = requestAnimationFrame(loop);
                window.addEventListener("scroll", computeActive, { passive: true });
            }
            window.addEventListener("resize", computeActive);
            // Mutation observer to refresh section nodes (e.g., route chunks mount)
            const mo = new MutationObserver(() => {
                sectionsRef.current = resolveSections();
                // minor delay to allow layout settle
                setTimeout(computeActive, 50);
            });
            mo.observe(document.body, { childList: true, subtree: true });
            // store on ref for cleanup
            sectionsRef.current.__mo = mo;
        };

        const unbind = () => {
            if (lenis && typeof lenis.off === "function") {
                lenis.off("scroll", onLenisScroll);
            }
            if (rafId.current) cancelAnimationFrame(rafId.current);
            window.removeEventListener("scroll", computeActive);
            window.removeEventListener("resize", computeActive);
            if (sectionsRef.current.__mo) {
                sectionsRef.current.__mo.disconnect();
                delete sectionsRef.current.__mo;
            }
        };

        bind();
        // initial compute after a short delay to ensure first layout complete
        const initTimer = setTimeout(() => {
            sectionsRef.current = resolveSections();
            computeActive();
        }, 120);

        return () => {
            clearTimeout(initTimer);
            unbind();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectors.join("|")]); // only if the selector list itself changes

    return { active, setActive, lock };
}
