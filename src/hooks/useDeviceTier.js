import { useEffect, useState } from "react";

/**
 * Determines whether the device is low / mid / high tier
 * based on memory, cores, and screen size.
 */
export default function useDeviceTier() {
    const [tier, setTier] = useState("mid");

    useEffect(() => {
        try {
            const mem = navigator.deviceMemory || 4;      // typical desktop default
            const cores = navigator.hardwareConcurrency || 4;
            const ratio = window.devicePixelRatio || 1;
            const width = window.innerWidth;

            let result = "mid";

            // simple thresholds tuned for web perf
            if (mem <= 2 || cores <= 4 || ratio > 3 || width < 380) result = "low";
            if (mem >= 6 && cores >= 6 && width > 1280) result = "high";

            setTier(result);
        } catch {
            setTier("mid");
        }
    }, []);

    return tier;
}
