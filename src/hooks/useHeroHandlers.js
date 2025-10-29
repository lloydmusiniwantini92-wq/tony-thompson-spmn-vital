import { useEffect } from "react";

export default function useHeroHandlers() {
    useEffect(() => {
        const hamburger = document.getElementById("hamburger");
        const overlay = document.getElementById("menuOverlay");
        if (!hamburger || !overlay) return;

        const toggleMenu = () => {
            hamburger.classList.toggle("active");
            overlay.classList.toggle("active");
        };

        hamburger.addEventListener("click", toggleMenu);
        return () => hamburger.removeEventListener("click", toggleMenu);
    }, []);
}
