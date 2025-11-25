import { useEffect } from "react";

export const useAboutHandlers = () => {
    useEffect(() => {
        let frame;
        let lastScrollY = 0;
        let handleScroll;

        const init = () => {
            const btn = document.querySelector("#knowMoreBtn");
            const modal = document.querySelector("#aboutModal");
            const closeBtn = document.querySelector("#aboutModalClose");
            const parallaxBg = document.querySelector(".about-modal-bg img");

            if (!btn || !modal || !closeBtn) {
                frame = requestAnimationFrame(init);
                return;
            }

            console.log("✅ About modal & parallax initialized");

            // === Modal Open ===
            const openModal = () => {
                modal.classList.add("active", "animate-modalEnter");
                document.body.style.overflow = "hidden";

                // Enable parallax
                window.addEventListener("scroll", handleScroll);
            };

            // === Modal Close ===
            const closeModal = () => {
                modal.classList.remove("active", "animate-modalEnter");
                document.body.style.overflow = "auto";

                // Disable parallax COMPLETELY
                window.removeEventListener("scroll", handleScroll);

                // Reset background transform (kills Chrome blur caching)
                if (parallaxBg) {
                    parallaxBg.style.transform = "translateY(0) scale(1)";
                }
            };

            // === Overlay Click to Close ===
            const handleOverlayClick = (e) => {
                if (e.target === modal) closeModal();
            };

            // === Parallax Effect (ONLY WHEN MODAL OPEN!) ===
            handleScroll = () => {
                if (!parallaxBg || !modal.classList.contains("active")) return;

                const diff = window.scrollY - lastScrollY;
                lastScrollY = window.scrollY;

                const offset = diff * 0.2;
                parallaxBg.style.transform = `translateY(${offset}px) scale(1.05)`;
            };

            // === Hover Animation ===
            const handleHoverIn = () => btn.classList.add("elongate");
            const handleHoverOut = () => btn.classList.remove("elongate");

            // Attach listeners
            btn.addEventListener("click", openModal);
            closeBtn.addEventListener("click", closeModal);
            modal.addEventListener("click", handleOverlayClick);
            btn.addEventListener("mouseenter", handleHoverIn);
            btn.addEventListener("mouseleave", handleHoverOut);

            // Cleanup
            return () => {
                cancelAnimationFrame(frame);
                btn.removeEventListener("click", openModal);
                closeBtn.removeEventListener("click", closeModal);
                modal.removeEventListener("click", handleOverlayClick);
                btn.removeEventListener("mouseenter", handleHoverIn);
                btn.removeEventListener("mouseleave", handleHoverOut);
                window.removeEventListener("scroll", handleScroll);
                console.log("🧹 About handlers cleaned up");
            };
        };

        frame = requestAnimationFrame(init);
        return () => cancelAnimationFrame(frame);
    }, []);
};
