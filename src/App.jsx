import React, { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";

import Hero from "./components/Hero";
const MeetTony = lazy(() => import("./components/MeetTony"));
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import TierList from "./components/TierList";
import ScrollFog from "./components/ScrollFog";
import GlobalOverlay from "./components/GlobalOverlay";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

import LetsWin from "./pages/LetsWin";
import AboutTony from "./pages/AboutTony";
import Shop from "./pages/Shop";
import ThankYou from "./pages/ThankYou";
import Go from "./pages/Go";

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
import QuizIntro from "./components/QuizIntro";

import { VideoModalProvider } from "./context/VideoModalContext";
import { QuizOverlayProvider } from "./context/QuizOverlayContext";

// ✨ dreamy fade imports
import { dreamyOverlayStyle, animateDreamyPulse } from "./utils/fadeStyles.js";

/* === PRE-MOUNT OVERLAY to block Hero flash + dreamy haze === */
function preMountFade() {
    if (document.getElementById("fade-preoverlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "fade-preoverlay";
    Object.assign(overlay.style, {
        position: "fixed",
        inset: "0",
        zIndex: "999999",
        opacity: "1",
        pointerEvents: "none",
        transition: "opacity 0.6s ease",
        ...dreamyOverlayStyle,
    });
    document.body.appendChild(overlay);
    animateDreamyPulse(overlay); // shimmer breathing effect
}

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [heroVisible, setHeroVisible] = useState(true);
    const location = useLocation();
    const isHome = location.pathname === "/";

    /* === LENIS Smooth Scroll === */
    useEffect(() => {
        let lenis;
        let rafId;
        const startLenis = () => {
            lenis = new Lenis({
                duration: 1.05,
                easing: (t) => 1 - Math.pow(1 - t, 3),
                smoothWheel: true,
                syncTouch: false,
                gestureOrientation: "vertical",
            });
            window.lenis = lenis;

            const raf = (time) => {
                lenis.raf(time);
                rafId = requestAnimationFrame(raf);
            };
            rafId = requestAnimationFrame(raf);
            lenis.scrollTo(0, { immediate: true });
        };

        startLenis();
        return () => {
            cancelAnimationFrame(rafId);
            if (lenis) lenis.destroy();
        };
    }, []);

    /* === UNIVERSAL ?target= SCROLL LISTENER — FADE OVER SCROLL (NO HERO FLASH + dreamy) === */
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const targetParam = params.get("target");
        if (!targetParam) return;

        const cleanTarget = targetParam.replace(/^#/, "").trim();

        const doFadeScroll = async () => {
            // 1️⃣ Instantly cover Hero with dreamy haze
            preMountFade();

            const { smoothFadeScroll } = await import("./utils/smoothFadeScroll.js");

            const el =
                document.getElementById(cleanTarget) ||
                document.querySelector(`.${cleanTarget}`);

            const removePreOverlay = () => {
                const pre = document.getElementById("fade-preoverlay");
                if (pre) {
                    pre.style.opacity = "0";
                    setTimeout(() => pre.remove(), 700);
                }
            };

            if (!el) {
                let tries = 0;
                const interval = setInterval(() => {
                    const found =
                        document.getElementById(cleanTarget) ||
                        document.querySelector(`.${cleanTarget}`);
                    if (found || tries > 40) {
                        clearInterval(interval);
                        smoothFadeScroll(`#${cleanTarget}`).then(removePreOverlay);
                        window.history.replaceState({}, "", "/");
                    }
                    tries++;
                }, 200);
            } else {
                smoothFadeScroll(`#${cleanTarget}`).then(removePreOverlay);
                window.history.replaceState({}, "", "/");
            }
        };

        setTimeout(doFadeScroll, 500);
    }, [location.pathname]);

    const heroVisibleForOverlay = isHome ? heroVisible : false;

    return (
        <VideoModalProvider>
            <QuizOverlayProvider>
                <AnimatePresence mode="wait">
                    <motion.main
                        key={location.pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
                        className="bg-black text-white overflow-x-hidden relative min-h-screen flex flex-col"
                    >
                        <ScrollToTop />

                        {/* === Global Overlay === */}
                        <div className="fixed top-0 left-0 w-full z-[2147483646] pointer-events-auto">
                            <GlobalOverlay
                                menuOpen={menuOpen}
                                setMenuOpen={setMenuOpen}
                                heroVisible={heroVisibleForOverlay}
                            />
                        </div>

                        <ScrollFog />

                        {/* === PAGE ROUTES + TRANSITIONS === */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
                            >
                                <Suspense fallback={<div className="h-screen bg-black" />}>
                                    <Routes location={location} key={location.pathname}>
                                        {/* === HOME === */}
                                        <Route
                                            path="/"
                                            element={
                                                <div className="flex flex-col w-full">
                                                    <Hero setHeroVisible={setHeroVisible} />
                                                    <Suspense fallback={<div className="h-screen bg-black" />}>
                                                        <MeetTony />
                                                    </Suspense>
                                                    <About />
                                                    <Testimonials />
                                                    <TierList />
                                                </div>
                                            }
                                        />

                                        {/* === OTHER ROUTES === */}
                                        <Route path="/lets-win" element={<LetsWin />} />
                                        <Route path="/about-tony" element={<AboutTony />} />
                                        <Route path="/shop" element={<Shop />} />
                                        <Route path="/thank-you" element={<ThankYou />} />
                                        <Route path="/go" element={<Go />} />
                                        <Route path="/quiz-intro" element={<QuizIntro />} />

                                        {/* === Legal Pages === */}
                                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                        <Route path="/terms" element={<Terms />} />
                                    </Routes>
                                </Suspense>
                            </motion.div>
                        </AnimatePresence>

                        {/* === Global Footer === */}
                        <Footer />
                    </motion.main>
                </AnimatePresence>
            </QuizOverlayProvider>
        </VideoModalProvider>
    );
}
