// ✅ src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        const lenis = window.lenis;
        // Reset scroll position instantly before render
        if (lenis) {
            lenis.scrollTo(0, { duration: 0 });
        } else {
            window.scrollTo({ top: 0, behavior: "auto" });
        }
    }, [location.pathname]);

    return null;
}
