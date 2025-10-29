import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

/**
 * ⚡ FixedLayer (GPU-Optimized)
 *
 * Mounts UI elements (e.g. overlays, fog, nav)
 * directly to <body> without causing repaint or scroll lag.
 *
 * Key principles:
 * - Uses its own GPU-composited layer (`translateZ(0)`)
 * - Avoids any triggers of layout recalculation
 * - `pointerEvents: none` ensures no hit-testing cost
 */
export default function FixedLayer({ children, className = "" }) {
    const mount = useMemo(() => {
        const el = document.createElement("div");
        el.className = `fixed-layer-root ${className}`;

        Object.assign(el.style, {
            position: "fixed",
            inset: "0",
            zIndex: "9999",                // slightly higher for overlays
            pointerEvents: "none",         // ✅ ignores mouse, boosts perf
            contain: "layout paint style", // ✅ isolates GPU layer
            backfaceVisibility: "hidden",  // ✅ avoids flickers on transform
            transform: "translateZ(0)",    // ✅ forces compositing layer
            willChange: "opacity, transform",
            isolation: "isolate",          // ✅ prevents blending conflicts
        });

        return el;
    }, [className]);

    useEffect(() => {
        document.body.appendChild(mount);
        return () => {
            if (document.body.contains(mount)) {
                document.body.removeChild(mount);
            }
        };
    }, [mount]);

    return createPortal(children, mount);
}
