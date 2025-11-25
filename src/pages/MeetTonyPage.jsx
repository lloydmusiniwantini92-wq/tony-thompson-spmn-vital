import React, { useEffect } from "react";

import MeetTony from "../components/MeetTony";
import TonyJourney from "./sections/TonyJourney";
import TonyImpact from "./sections/TonyImpact";
import TonyMission from "./sections/TonyMission";
import TonyVoices from "./sections/TonyVoices";
import TonyCTA from "./sections/TonyCTA";

export default function MeetTonyPage() {

    // ⭐ FORCE PAGE TO START AT THE TOP
    useEffect(() => {
        // Reset native scroll
        window.scrollTo(0, 0);

        // Reset Lenis scroll (if active)
        if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
        }
    }, []);

    return (
        <main className="w-full bg-black text-white overflow-x-hidden overflow-y-auto">
            <MeetTony />
            <TonyJourney />   {/* ⭐ RESTORED — this fixes the missing page */}
            <TonyImpact />
            <TonyMission />
            <TonyVoices />
            <TonyCTA />
        </main>
    );
}
