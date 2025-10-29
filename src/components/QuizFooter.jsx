import React from "react";

export default function QuizFooter() {
    const scrollToAbout = () => {
        const about = document.querySelector("#about");
        if (about) about.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* ====== Purple Gradient Header ====== */}
            <section className="relative text-center py-16 bg-gradient-to-br from-[#9b26b6] to-[#b14fc0] text-white overflow-hidden">
                {/* Floating Tetris Watermarks */}
                <div className="absolute top-1/2 left-[4rem] -translate-y-1/2 opacity-10 animate-[floatUpDown_6s_ease-in-out_infinite_alternate]">
                    <div className="flex space-x-1">
                        <div className="w-6 h-6 bg-gray-300/70 rounded-sm" />
                        <div className="w-6 h-6 bg-gray-300/70 rounded-sm" />
                        <div className="w-6 h-6 bg-gray-300/70 rounded-sm" />
                    </div>
                </div>
                <div className="absolute top-1/2 right-[4rem] -translate-y-1/2 opacity-10 animate-[floatUpDown_6s_ease-in-out_infinite_alternate]">
                    <div className="flex space-x-1">
                        <div className="w-6 h-6 bg-gray-300/70 rounded-sm" />
                        <div className="w-6 h-6 bg-gray-300/70 rounded-sm" />
                        <div className="w-6 h-6 bg-gray-300/70 rounded-sm" />
                    </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    LET’S KEEP CONNECTED
                </h2>
                <p className="text-gray-100 max-w-xl mx-auto px-4 text-sm md:text-base">
                    Follow Tony Thompson across platforms for insights, leadership, and inspiration.
                </p>

                <button
                    onClick={scrollToAbout}
                    className="mt-6 px-6 py-3 rounded-full font-semibold text-white bg-black border border-white hover:bg-[#9b26b6] hover:border-[#9b26b6] transition-all duration-300 shadow-[0_0_12px_rgba(155,38,182,0.6)]"
                >
                    ↑ Back to About
                </button>
            </section>

            {/* ====== Tony Bio Section (fills bottom blank space) ====== */}
            <section className="bg-[#0a0a0a] text-white py-20 px-8 md:px-24 flex flex-col md:flex-row items-center justify-between gap-12">
                {/* LEFT: Text */}
                <div className="md:w-1/2 space-y-4">
                    <h3 className="text-3xl font-bold mb-2 text-[#9b26b6]">
                        About Tony Thompson
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                        Tony Thompson is an award-winning leadership coach, speaker, and mentor
                        dedicated to empowering professionals to grow their influence, impact,
                        and income. With decades of experience across industries, Tony helps
                        clients build confidence, clarity, and communication excellence.
                    </p>
                    <p className="text-gray-400">
                        His mission is to unlock human potential through authenticity,
                        growth mindset, and the art of strategic connection.
                    </p>

                    <button
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-[#9b26b6] hover:bg-[#b14fc0] text-white px-8 py-3 font-semibold shadow-[0_0_12px_rgba(155,38,182,0.6)] transition"
                    >
                        Back to Top ↑
                    </button>
                </div>

                {/* RIGHT: Image Placeholder */}
                <div className="md:w-1/2 flex justify-center">
                    <div className="relative group">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#9b26b6]/40 to-[#b14fc0]/30 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <img
                            src="/tony-profile.png" // replace with Tony’s real image later
                            alt="Tony Thompson"
                            className="relative z-10 w-[300px] h-[300px] object-cover rounded-2xl shadow-[0_0_20px_rgba(155,38,182,0.4)]"
                        />
                    </div>
                </div>
            </section>

            {/* ====== Social Grid ====== */}
            <section className="grid grid-cols-6 bg-black border-t border-[#9b26b6]/25">
                {[
                    {
                        icon: (
                            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.464.099 2.794.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
                        ),
                    },
                    {
                        icon: (
                            <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.959-2.178-1.555-3.594-1.555-2.717 0-4.924 2.206-4.924 4.923 0 .39.045.765.127 1.124C7.69 8.094 4.066 6.13 1.64 3.161c-.427.733-.666 1.584-.666 2.49 0 1.72.873 3.235 2.202 4.123-.809-.026-1.57-.248-2.228-.616v.061c0 2.404 1.71 4.408 3.978 4.864-.417.113-.855.174-1.307.174-.32 0-.626-.03-.927-.086.627 1.956 2.444 3.377 4.6 3.414-1.68 1.318-3.808 2.105-6.115 2.105-.397 0-.788-.023-1.175-.069 2.179 1.398 4.768 2.212 7.557 2.212 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.634z" />
                        ),
                    },
                    {
                        icon: (
                            <>
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.34 3.608 1.315.975.975 1.253 2.242 1.315 3.608.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.34 2.633-1.315 3.608-.975.975-2.242 1.253-3.608 1.315-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.34-3.608-1.315-.975-.975-1.253-2.242-1.315-3.608-.058-1.266-.07-1.645-.07-4.85s.012-3.584.07-4.85c.062-1.366.34-2.633 1.315-3.608C4.517 2.503 5.784 2.225 7.15 2.163 8.416 2.105 8.796 2.093 12 2.093z" />
                                <circle cx="12" cy="12" r="3.5" />
                                <circle cx="18.406" cy="5.594" r="1.44" />
                            </>
                        ),
                    },
                    {
                        icon: (
                            <path d="M23.498 6.186a2.996 2.996 0 0 0-2.115-2.115C19.143 3.5 12 3.5 12 3.5s-7.143 0-9.383.571a2.996 2.996 0 0 0-2.115 2.115A31.99 31.99 0 0 0 0 12a31.99 31.99 0 0 0 .502 5.814 2.996 2.996 0 0 0 2.115 2.115C4.857 20.5 12 20.5 12 20.5s7.143 0 9.383-.571a2.996 2.996 0 0 0 2.115-2.115A31.99 31.99 0 0 0 24 12a31.99 31.99 0 0 0-.502-5.814zM9.546 15.568V8.432L15.818 12l-6.272 3.568z" />
                        ),
                    },
                    {
                        icon: (
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.011-1.04-.017-2.042-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.76-1.605-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.404c1.02.004 2.045.137 3 .404 2.289-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.805 5.625-5.476 5.921.43.371.815 1.102.815 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.216.694.825.576C20.565 21.796 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
                        ),
                    },
                    {
                        icon: (
                            <path d="M4.98 3.5C3.34 3.5 2 4.84 2 6.48c0 1.64 1.34 2.98 2.98 2.98s2.98-1.34 2.98-2.98c0-1.64-1.34-2.98-2.98-2.98zM2 21h5.96v-9H2v9zm7.98 0h5.96v-4.61c0-2.69-3.14-2.49-3.14 0V21h-5.96v-9h5.96v1.37c.8-1.49 3.14-1.61 3.14 1.43V21h5.96v-6.36c0-3.69-4.06-3.56-5.96-1.74V12h-5.96v9z" />
                        ),
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden h-[3cm] flex justify-center items-center group border-r border-[#9b26b6]/25"
                    >
                        <div className="absolute top-0 left-[-100%] w-full h-full bg-[#9b26b6]/80 transition-all duration-500 group-hover:left-0" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="relative z-20 h-[1.25cm] w-[1.25cm] text-white group-hover:text-black transition-all duration-300 drop-shadow-[0_0_6px_rgba(155,38,182,0.3)]"
                        >
                            {item.icon}
                        </svg>
                    </div>
                ))}
            </section>

            {/* ===== Bottom Footer Line ===== */}
            <div className="w-full border-t border-[#9b26b6]/25" />
            <div className="bg-black text-white flex justify-between items-center p-4 px-6 md:px-12 text-sm flex-wrap">
                <span>© Tony Thompson 2025</span>
                <nav className="flex-1 flex justify-evenly items-center mx-4 text-gray-300">
                    <a href="#" className="hover:text-[#9b26b6] transition-colors duration-300">
                        Terms & Conditions
                    </a>
                    <a href="#" className="hover:text-[#9b26b6] transition-colors duration-300">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:text-[#9b26b6] transition-colors duration-300">
                        Cookie Policy
                    </a>
                </nav>
                <span className="text-gray-400 hover:text-[#9b26b6] transition-colors duration-300">
                    Website by Arson Pixelz®
                </span>
            </div>
        </>
    );
}
