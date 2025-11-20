import React, { useEffect } from "react";

import Hero from "../components/Hero";
import MeetTony from "../components/MeetTony";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import TrustSection from "../components/TrustSection";
import BookTonySection from "../components/BookTonySection";
import TierList from "../components/TierList";

export default function HomePage({ setHeroVisible }) {

    // ⭐ THIS is where scrollToPrograms MUST live
    useEffect(() => {
        if (sessionStorage.getItem("scrollToPrograms") === "true") {
            sessionStorage.removeItem("scrollToPrograms");

            setTimeout(() =>
                window.triggerGlobalFog(() => {
                    const el = document.querySelector("#programs");
                    const lenis = window.lenis;

                    if (lenis) lenis.scrollTo(el, { duration: 1.4 });
                    else el?.scrollIntoView({ behavior: "smooth" });
                }),
                250);
        }
    }, []);

    return (
        <div className="flex flex-col w-full">
            <Hero setHeroVisible={setHeroVisible} />

            <MeetTony />

            <About />
            <Testimonials />

            <div className="h-[8vh] w-full bg-gradient-to-b from-transparent via-[#9b26b6]/20 to-black"></div>

            <TrustSection />
            <BookTonySection />
            <TierList />
        </div>
    );
}
