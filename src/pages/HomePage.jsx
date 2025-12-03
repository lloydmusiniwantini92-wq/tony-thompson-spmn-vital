// ⭐ src/pages/HomePage.jsx — FIXED WITH PROPER TARGET IDS

import React, { useEffect } from "react";

import Hero from "../components/Hero";
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

        if (target) {
            const el = document.getElementById(target);
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
            <section id="home">
                <Hero />
            </section>

            {/* 2 — TONY STORY */}
            <section id="meet-tony">
                <TonyStory />
            </section>

            {/* 3 — ABOUT */}
            <section id="about">
                <About />
            </section>

            {/* 4 — TESTIMONIALS */}
            <section id="testimonials">
                <Testimonials />
            </section>

            <div className="h-[8vh] w-full bg-gradient-to-b from-transparent via-[#9b26b6]/20 to-black"></div>

            {/* 5 — TRUST */}
            <section id="trust">
                <TrustSection />
            </section>

            {/* 6 — BOOK TONY */}
            <section id="book-tony">
                <BookTonySection />
            </section>

            {/* 7 — PROGRAMS (TierList) */}
            <section id="programs">
                <TierList />
            </section>

            {/* 8 — CONTACT (DO YOU HAVE THIS SECTION?) */}
            <section id="contact" />
        </div>
    );
}
