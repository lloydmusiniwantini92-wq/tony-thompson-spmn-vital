// src/hooks/useSmoothNavigate.js
import { useState, useEffect } from "react";

export default function useSmoothNavigate() {
    const [isFading, setIsFading] = useState(false);
    const [target, setTarget] = useState(null);

    const scrollToTarget = (id) => {
        setTarget(id);
        setIsFading(true);
    };

    useEffect(() => {
        if (isFading && target) {
            const fadeOutTimeout = setTimeout(() => {
                const element = document.getElementById(target);
                if (element) {
                    // Scroll instantly without animation
                    element.scrollIntoView({ behavior: "instant", block: "start" });
                }
                // Fade in after reposition
                const fadeInTimeout = setTimeout(() => setIsFading(false), 300);
                return () => clearTimeout(fadeInTimeout);
            }, 300);
            return () => clearTimeout(fadeOutTimeout);
        }
    }, [isFading, target]);

    return { isFading, scrollToTarget };
}
