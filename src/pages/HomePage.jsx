// ⭐ src/pages/HomePage.jsx — UPDATED TO USE TonyStory INSTEAD OF MeetTony

import React, { useEffect } from "react";

import Hero from "../components/Hero";

// ❌ REMOVED MeetTony
// import MeetTony from "../components/MeetTony";

// ✅ CINEMATIC UNIVERSE ENTRY
import TonyStory from "./sections/TonyStory";

import About from "../components/About";
import Testimonials from "../components/Testimonials";
import TrustSection from "../components/TrustSection";
import BookTonySection from "../components/BookTonySection";
import TierList from "../components/TierList";

export default function HomePage({ setHeroVisible }) {

    /* ================================
       HERO VISIBILITY LOGIC
    =================================*/
    useEffect(() => {
        const heroEl = document.querySelector("#home");
        if (!heroEl) return;

        const observer = new IntersectionObserver(
            ([entry]) => setHeroVisible(entry.isIntersecting),
            { threshold: 0.35 }
        );

        observer.observe(heroEl);
        return () => observer.disconnect();
    }, [setHeroVisible]);

    /* ================================
       CTA Jump “?target=programs”
    =================================*/
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const target = params.get("target");

        if (target === "programs") {
            const el = document.querySelector("#programs");
            setTimeout(() => {
                if (el) {
                    window.scrollTo({
                        top: el.offsetTop,
                        behavior: "auto",
                    });
                }
            }, 20);
        }
    }, []);

    /* ================================
       PAGE STRUCTURE
    =================================*/
    return (
        <div className="flex flex-col w-full">

            {/* 1 — HERO */}
            <Hero id="home" />

            {/* 2 — TONY STORY (cinematic universe preview) */}
            <TonyStory />

            {/* 3 — ABOUT / QUIZ INTRO */}
            <About />

            {/* 4 — TESTIMONIALS */}
            <Testimonials />

            <div className="h-[8vh] w-full bg-gradient-to-b from-transparent via-[#9b26b6]/20 to-black"></div>

            {/* 5 — TRUST */}
            <TrustSection />

            {/* 6 — BOOK TONY */}
            <BookTonySection />

            {/* 7 — PROGRAMS (TierList) */}
            <TierList />

        </div>
    );
}
