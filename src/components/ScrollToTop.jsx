// ✅ src/components/ScrollToTop.jsx (fixed)
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const targetParam = params.get("target");

        // ❗ If doing a fade-scroll jump, DO NOT reset scroll to top
        if (targetParam) return;

        const lenis = window.lenis;

        if (lenis) {
            // instant jump to top only when actually changing pages
            lenis.scrollTo(0, { duration: 0 });
        } else {
            window.scrollTo({ top: 0, behavior: "auto" });
        }
    }, [location.pathname, location.search]);

    return null;
}
