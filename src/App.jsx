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

const MeetTony = lazy(() => import("./components/MeetTony"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));

import QuizIntro from "./components/QuizIntro";

import { VideoModalProvider } from "./context/VideoModalContext";
import { QuizOverlayProvider } from "./context/QuizOverlayContext";
import { dreamyOverlayStyle, animateDreamyPulse } from "./utils/fadeStyles.js";

import useDeviceTier from "./hooks/useDeviceTier";
import BookTonyForm from "./pages/BookTonyForm";

// ⭐ NEW — your extracted home page
import HomePage from "./pages/HomePage";

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
    animateDreamyPulse(overlay);
}

if (import.meta.env.MODE === "development" && !window.__FAST_DEBUG) {
    window.__FAST_DEBUG = true;
    const log = (...a) =>
        console.log(
            `%c[DEBUG ${new Date().toISOString().split("T")[1].split(".")[0]}]`,
            "color:#7d1f97;font-weight:bold",
            ...a
        );
    log("🚀 Fast Debug Mode Ready");
}

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [heroVisible, setHeroVisible] = useState(true);
    const location = useLocation();

    const isHome =
        location.pathname === "/" ||
        location.pathname.endsWith("/tony-thompson-spmn-vital/");

    const deviceTier = useDeviceTier();
    const isLowDevice = deviceTier === "low";

    useEffect(() => {
        if (isLowDevice) {
            console.log("⚡️ Low-end device detected: skipping Lenis smooth scroll");
            return;
        }

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

            const raf = (time) => {
                lenis.raf(time);
                rafId = requestAnimationFrame(raf);
            };
            rafId = requestAnimationFrame(raf);
        };

        window.addEventListener("load", initLenis, { once: true });
        return () => cancelAnimationFrame(rafId);
    }, [isLowDevice]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const targetParam = params.get("target");
        if (!targetParam) return;

        const cleanTarget = targetParam.replace(/^#/, "").trim();

        const doFadeScroll = async () => {
            const { smoothFadeScroll } = await import("./utils/smoothFadeScroll.js");
            preMountFade();

            const waitForLenis = async () => {
                let tries = 0;
                while (
                    (!window.lenis || !document.getElementById(cleanTarget)) &&
                    tries < 40
                ) {
                    await new Promise((r) => setTimeout(r, 200));
                    tries++;
                }
            };

            await waitForLenis();
            await smoothFadeScroll(`#${cleanTarget}`);
            window.history.replaceState({}, "", "/");
        };

        setTimeout(doFadeScroll, 900);
    }, [location.pathname]);

    const heroVisibleForOverlay = isHome ? heroVisible : false;

    const hideFooter =
        location.pathname.includes("quiz") ||
        location.pathname.includes("stackbuilder") ||
        location.pathname.includes("book-tony") ||
        location.pathname.includes("about-tony");

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
                        className="bg-black text-white overflow-x-hidden relative flex flex-col"
                        style={{ minHeight: "100vh" }}
                    >
                        <ScrollToTop />

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
                                transition={{ duration: 0.6, ease: [0.25, 1, 0.3, 1] }}
                            >
                                <Suspense fallback={<div className="h-screen bg-black" />}>
                                    <Routes location={location} key={location.pathname}>

                                        {/* Standalone MeetTony route */}
                                        <Route
                                            path="/meet-tony"
                                            element={
                                                <Suspense fallback={<div className="h-screen bg-black" />}>
                                                    <MeetTony />
                                                </Suspense>
                                            }
                                        />

                                        {/* ⭐ HOME ROUTE — NOW USING HOMEPAGE.JSX */}
                                        <Route
                                            path="/"
                                            element={
                                                <HomePage setHeroVisible={setHeroVisible} />
                                            }
                                        />

                                        {/* Other routes */}
                                        <Route path="/lets-win" element={<LetsWin />} />
                                        <Route path="/about-tony" element={<AboutTony />} />
                                        <Route path="/shop" element={<Shop />} />
                                        <Route path="/thank-you" element={<ThankYou />} />
                                        <Route path="/go" element={<Go />} />
                                        <Route path="/quiz-intro" element={<QuizIntro />} />
                                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                        <Route path="/terms" element={<Terms />} />
                                        <Route path="/stackbuilder" element={<StackBuilder />} />
                                        <Route path="/book-tony" element={<BookTonyForm />} />

                                    </Routes>
                                </Suspense>
                            </motion.div>
                        </AnimatePresence>

                        {!hideFooter && <Footer />}
                    </motion.main>
                </AnimatePresence>
            </QuizOverlayProvider>
        </VideoModalProvider>
    );
}
