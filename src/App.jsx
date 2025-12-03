/* =========================================
   ⭐ src/App.jsx — FIXED HEADER LOGIC
========================================= */
import React, { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";

import ScrollFog from "./components/ScrollFog";
import GlobalOverlay from "./components/GlobalOverlay";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

import StackBuilder from "./pages/StackBuilder/StackBuilder.jsx";
import LetsWin from "./pages/LetsWin";
import AboutTony from "./pages/AboutTony";
import Shop from "./pages/Shop";
import ThankYou from "./pages/ThankYou";
import Go from "./pages/Go";

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));

import { VideoModalProvider } from "./context/VideoModalContext";
import { QuizOverlayProvider } from "./context/QuizOverlayContext";
import useDeviceTier from "./hooks/useDeviceTier";
import BookTonyForm from "./pages/BookTonyForm";
import HomePage from "./pages/HomePage";

// QUIZ
import QuizIntro from "./pages/Quiz/QuizIntro.jsx";
import Quiz from "./pages/Quiz/Quiz.jsx";
import QuizResults from "./pages/Quiz/QuizResults.jsx";

// FULL UNIVERSE PAGE
import MeetTonyPage from "./pages/MeetTonyPage";

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [heroVisible, setHeroVisible] = useState(true);

    const location = useLocation();

    // Check if we are on the main landing page
    const isHome =
        location.pathname === "/" ||
        location.pathname.endsWith("/tony-thompson-spmn-vital/");

    /* ⭐ FIX: HEADER VISIBILITY LOGIC
       1. If on Home: Use the scroll observer (heroVisible).
       2. If on ANY OTHER PAGE (Shop, Quiz, etc.): FORCE VISIBLE (true).
    */
    const heroVisibleForOverlay = isHome ? heroVisible : true;

    const deviceTier = useDeviceTier();
    const isLowDevice = deviceTier === "low";

    /* ================================
       Lenis Smooth Scroll
    ================================ */
    useEffect(() => {
        if (isLowDevice) return;

        let lenis;
        let rafId;

        const enableScroll = () => {
            document.documentElement.style.overflow = "visible";
            document.body.style.overflow = "visible";
            document.documentElement.style.height = "auto";
            document.body.style.height = "auto";
        };

        const initLenis = () => {
            enableScroll();
            lenis = new Lenis({
                duration: 1.05,
                easing: (t) => 1 - Math.pow(1 - t, 3),
                smoothWheel: true,
                syncTouch: false,
                gestureOrientation: "vertical",
            });
            window.lenis = lenis;

            lenis.stop();
            setTimeout(() => lenis.start(), 1400);

            const raf = (time) => {
                lenis.raf(time);
                rafId = requestAnimationFrame(raf);
            };
            rafId = requestAnimationFrame(raf);
        };

        window.addEventListener("load", initLenis, { once: true });
        return () => cancelAnimationFrame(rafId);
    }, [isLowDevice]);

    /* ================================
       Fade Scroll (Cross-Page Nav)
    ================================ */
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const targetParam = params.get("target");
        if (!targetParam) return;

        // Prevent double-firing
        if (window.__fadeScrollRan === targetParam) return;
        window.__fadeScrollRan = targetParam;

        const cleanTarget = targetParam.replace(/^#/, "").trim();

        const doFadeScroll = async () => {
            const { smoothFadeScroll } = await import("./utils/smoothFadeScroll.js");

            // Wait for DOM content to be ready
            const waitForContent = async () => {
                let tries = 0;
                while (!document.getElementById(cleanTarget) && tries < 50) {
                    await new Promise((r) => setTimeout(r, 100));
                    tries++;
                }
            };

            await waitForContent();

            // Briefly pause Lenis to force jump
            const savedLenis = window.lenis;
            if (window.lenis) window.lenis.stop();

            await smoothFadeScroll(`#${cleanTarget}`);

            if (window.lenis) window.lenis.start();

            // Clean URL without refresh
            window.history.replaceState({}, "", "/");
            window.__fadeScrollRan = null;
        };

        setTimeout(doFadeScroll, 800);
    }, [location.pathname]);

    /* ================================
       Footer Logic
    ================================ */
    const hideFooter =
        location.pathname.includes("quiz") ||
        location.pathname.includes("stackbuilder") ||
        location.pathname.includes("book-tony") ||
        location.pathname.includes("about-tony") ||
        location.pathname.includes("shop") ||
        location.pathname.startsWith("/meet-tony");

    return (
        <VideoModalProvider>
            <QuizOverlayProvider>
                <main
                    className="bg-black text-white overflow-x-hidden relative flex flex-col"
                    style={{ minHeight: "100vh" }}
                >
                    <ScrollToTop />

                    {/* GLOBAL HEADER */}
                    <div className="fixed top-0 left-0 w-full z-[2147483646] pointer-events-auto">
                        <GlobalOverlay
                            menuOpen={menuOpen}
                            setMenuOpen={setMenuOpen}
                            heroVisible={heroVisibleForOverlay}
                        />
                    </div>

                    {!isLowDevice && <ScrollFog />}

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.55, ease: [0.25, 1, 0.3, 1] }}
                        >
                            <Suspense fallback={<div className="h-screen bg-black" />}>
                                <Routes location={location} key={location.pathname}>
                                    <Route path="/" element={<HomePage setHeroVisible={setHeroVisible} />} />
                                    <Route path="/lets-win" element={<LetsWin />} />
                                    <Route path="/about-tony" element={<AboutTony />} />
                                    <Route path="/shop" element={<Shop />} />
                                    <Route path="/thank-you" element={<ThankYou />} />
                                    <Route path="/go" element={<Go />} />
                                    <Route path="/meet-tony" element={<MeetTonyPage />} />
                                    <Route path="/terms" element={<Terms />} />
                                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                    <Route path="/stackbuilder" element={<StackBuilder />} />
                                    <Route path="/book-tony" element={<BookTonyForm />} />
                                    <Route path="/quiz-intro" element={<QuizIntro />} />
                                    <Route path="/quiz" element={<Quiz />} />
                                    <Route path="/quiz/results" element={<QuizResults />} />
                                </Routes>
                            </Suspense>
                        </motion.div>
                    </AnimatePresence>

                    {!hideFooter && <Footer />}
                </main>
            </QuizOverlayProvider>
        </VideoModalProvider>
    );
}