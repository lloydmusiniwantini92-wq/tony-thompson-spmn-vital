// ✅ src/components/GlobalOverlay.jsx — Accessibility Enhanced (no behavior changes)
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import logoFull from "../assets/images/logoFull.png";
import logoTT from "../assets/images/logoTT.png";
import useScrollSpy from "../utils/useScrollSpy";

export default function GlobalOverlay({ menuOpen, setMenuOpen, heroVisible }) {
    const navigate = useNavigate();
    const location = useLocation();
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);
    const overlayRef = useRef(null);
    const fadeRef = useRef(null);
    const [cascadeDone, setCascadeDone] = useState(false);
    const [activeSection, setActiveSection] = useState("#home");
    const lastClicked = useRef(null);

    const navItems = [
        { label: "HOME", link: "#home" },
        { label: "MEET TONY", link: "#meet-tony" },
        { label: "WIN NOW", link: "#about" },
        { label: "TESTIMONIALS", link: "#testimonials" },
        { label: "PROGRAMS", link: "#programs" },
        { label: "CONTACT", link: "#contact" },
        { label: "SHOP", link: "/shop" },
        { label: "ENQUIRIES", link: "#enquiries" },
        { label: "PODCASTS", link: "/podcasts" },
        { label: "NEWSLETTER", link: "/newsletter" },
    ];

    /* === Persist active section === */
    useEffect(() => {
        const saved = sessionStorage.getItem("activeSection");
        if (saved && !lastClicked.current) setActiveSection(saved);
    }, []);
    useEffect(() => {
        if (activeSection) sessionStorage.setItem("activeSection", activeSection);
    }, [activeSection]);

    /* === ScrollSpy + funnel mapping === */
    const selectors = [
        "#home",
        "#meet-tony",
        "#about",
        "#testimonials",
        "#programs",
        "#contact",
        "#enquiries",
    ];
    const { active, lock } = useScrollSpy(selectors, { sample: 0.45, lockMs: 1000 });

    useEffect(() => {
        const path = location.pathname;

        if (
            path.startsWith("/lets-win") ||
            path.startsWith("/quiz-intro") ||
            path.startsWith("/go") ||
            path.startsWith("/thank-you")
        ) {
            setActiveSection("#about");
            return;
        }

        if (path.startsWith("/about-tony")) {
            setActiveSection("#meet-tony");
            return;
        }
        if (path.startsWith("/shop")) {
            setActiveSection("/shop");
            return;
        }
        if (path === "/" && active) {
            setActiveSection(active);
            sessionStorage.setItem("activeSection", active);
            return;
        }
        setActiveSection("#home");
    }, [active, location.pathname]);

    /* === Cascade animation === */
    useEffect(() => {
        const menu = menuRef.current;
        const items = menu?.querySelectorAll(".menu-item");
        const hamburger = hamburgerRef.current;
        if (!menu || !items) return;

        const duration = 1100;
        const stagger = 140;
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);

        if (menuOpen) {
            hamburger.classList.add("active");
            menu.classList.add("active");
            setCascadeDone(false);
            const start = performance.now();
            const loop = (now) => {
                const elapsed = now - start;
                items.forEach((item, i) => {
                    const local = Math.min(Math.max(elapsed - i * stagger, 0), duration);
                    const p = easeOut(local / duration);
                    item.style.transform = `translateY(${60 * (1 - p)}px) scale(${0.96 + 0.04 * p})`;
                    item.style.opacity = 0.2 + 0.8 * p;
                    item.style.filter = `blur(${6 * (1 - p)}px)`;
                });
                if (elapsed < duration + items.length * stagger) requestAnimationFrame(loop);
                else {
                    items.forEach((item) => {
                        item.style.transform = "translateY(0) scale(1)";
                        item.style.opacity = 1;
                        item.style.filter = "blur(0)";
                    });
                    setCascadeDone(true);
                }
            };
            requestAnimationFrame(loop);
        } else {
            hamburger.classList.remove("active");
            menu.classList.remove("active");
            setCascadeDone(false);
            items.forEach((item) => {
                item.style.opacity = 0;
                item.style.transform = "translateY(60px)";
                item.style.filter = "blur(8px)";
            });
        }
    }, [menuOpen]);

    /* === Click-outside to close === */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuOpen &&
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                !hamburgerRef.current.contains(e.target)
            ) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside, true);
        return () => document.removeEventListener("mousedown", handleClickOutside, true);
    }, [menuOpen]);

    /* === Global cinematic fog === */
    useEffect(() => {
        const fade = fadeRef.current;
        if (!fade) return;

        window.triggerGlobalFog = (scrollAction) => {
            fade.style.transition = "opacity 0.9s ease-out";
            fade.style.opacity = 1;
            fade.style.pointerEvents = "auto";
            setTimeout(() => scrollAction?.(), 400);
            setTimeout(() => {
                fade.style.opacity = 0;
                setTimeout(() => (fade.style.pointerEvents = "none"), 900);
            }, 2500);
        };
    }, []);

    const triggerFogScrollTo = (target) => {
        if (typeof window.triggerGlobalFog !== "function") return;
        window.triggerGlobalFog(() => {
            const lenis = window.lenis;
            const el = document.querySelector(target);
            if (el && lenis) lenis.scrollTo(el, { duration: 1.4 });
            else el?.scrollIntoView({ behavior: "smooth" });
        });
    };

    const handleNavClick = (hashOrPath) => {
        lock();
        lastClicked.current = hashOrPath;
        window.triggerGlobalFog(() => {
            const lenis = window.lenis;
            if (hashOrPath.startsWith("/")) {
                navigate(hashOrPath);
                setMenuOpen(false);
                return;
            }
            if (window.location.pathname === "/") {
                const el = document.querySelector(hashOrPath);
                if (el && lenis) lenis.scrollTo(el, { duration: 1.4 });
                else el?.scrollIntoView({ behavior: "smooth" });
                setMenuOpen(false);
                return;
            }
            navigate("/");
            setMenuOpen(false);
            const waitForHero = setInterval(() => {
                const heroReady = document.querySelector("#home");
                const targetReady = document.querySelector(hashOrPath);
                const lenisReady = !!window.lenis;
                if (heroReady && targetReady && lenisReady) {
                    clearInterval(waitForHero);
                    setTimeout(() => triggerFogScrollTo(hashOrPath), 300);
                }
            }, 150);
            setTimeout(() => clearInterval(waitForHero), 8000);
        });
    };

    useEffect(() => {
        const fade = fadeRef.current;
        const buttons = document.querySelectorAll(".get-started, .win-now, .cta-win, .cta-get");
        const handleClick = (e) => {
            e.preventDefault();
            const lenis = window.lenis;
            const target =
                e.currentTarget.classList.contains("win-now") ||
                    e.currentTarget.classList.contains("cta-win")
                    ? "#programs"
                    : "#about";
            if (!fade || !window.triggerGlobalFog) return;
            window.triggerGlobalFog(() => {
                const el = document.querySelector(target);
                if (el && lenis) lenis.scrollTo(el, { duration: 1.4 });
                else el?.scrollIntoView({ behavior: "smooth" });
            });
        };
        buttons.forEach((b) => b.addEventListener("click", handleClick));
        return () => buttons.forEach((b) => b.removeEventListener("click", handleClick));
    }, []);

    /* === Hamburger button (accessible) === */
    const HamburgerButton = (
        <button
            ref={hamburgerRef}
            onClick={() => setMenuOpen(!menuOpen)}
            id="hamburger"
            aria-label="Toggle navigation menu"
            className="pointer-events-auto fixed top-[25px] right-[25px]
                 flex flex-col justify-between w-[52px] h-[34px]
                 transition-transform duration-300 z-[2147483648]"
        >
            <span className="bar top" />
            <span className="bar middle" />
            <span className="bar bottom" />
            <style>{`
        #hamburger .bar {
          display: block;
          width: 52px;
          background-color: ${menuOpen ? "#000" : "#fff"};
          border-radius: 2.5px;
          margin: 5px 0;
          transition:
            transform 0.45s cubic-bezier(0.25,1.15,0.35,1),
            opacity 0.3s ease,
            background-color 0.3s ease;
          transform-origin: center;
        }
        #hamburger .bar.top, #hamburger .bar.bottom { height: 5.5px; }
        #hamburger .bar.middle { height: 2px; opacity: 0.95; }
        #hamburger.active .bar.top { transform: rotate(43deg) translate(9px, 9px); }
        #hamburger.active .bar.middle { opacity: 0; transform: scaleX(0.6); }
        #hamburger.active .bar.bottom { transform: rotate(-43deg) translate(9px, -9px); }
        #hamburger:hover { transform: scale(1.08); }
      `}</style>
        </button>
    );

    const renderItems = (items) =>
        items.map(({ label, link }) => {
            const isActive = activeSection === link;
            const showStrike = cascadeDone && isActive;
            return (
                <button
                    key={label}
                    onClick={() => handleNavClick(link)}
                    className="menu-item relative text-left font-[900] uppercase leading-[1.05]
                     text-[clamp(2rem,3.5vw,2.8rem)] tracking-tight
                     transition-all duration-400 ease-[cubic-bezier(0.25,1,0.3,1)]
                     hover:translate-x-[10px] hover:text-white
                     hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                    style={{
                        opacity: 0,
                        transform: "translateY(60px)",
                        filter: "blur(8px)",
                        color: "white",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span
                        className="relative inline-block"
                        style={{
                            opacity: isActive ? 0.4 : 1,
                            transition: "opacity 0.6s ease-in-out",
                        }}
                    >
                        {label}
                        <span
                            className={`absolute left-0 top-1/2 -translate-y-1/2 h-[4px] bg-[#000] rounded-sm origin-left transform transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.3,1)] ${showStrike ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                                }`}
                            style={{
                                width: "115%",
                                transformOrigin: "left",
                                boxShadow: "0 0 4px rgba(0,0,0,0.3)",
                            }}
                        />
                    </span>
                </button>
            );
        });

    return (
        <>
            {/* === Logo === */}
            <div
                className="fixed flex items-center pointer-events-auto cursor-pointer"
                style={{ top: "26px", left: "28px", zIndex: 2147483647 }}
                onClick={() => navigate("/")}
            >
                <img src={logoTT} alt="Tony Thompson logo icon" style={{ width: "38px" }} />
                <div
                    style={{
                        marginLeft: "0.3cm",
                        width: "1px",
                        height: "26.2px",
                        backgroundColor: "#fff",
                        borderRadius: "1px",
                        opacity: heroVisible ? 1 : 0,
                        visibility: heroVisible ? "visible" : "hidden",
                        transform: heroVisible ? "translateY(0)" : "translateY(-12px)",
                        transition:
                            "opacity 0.9s ease-in-out 0.15s, transform 0.9s ease-in-out 0.15s",
                    }}
                />
                <img
                    src={logoFull}
                    alt="Tony Thompson full logo"
                    style={{
                        width: "68px",
                        marginLeft: "0.1cm",
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? "translateX(0)" : "translateX(24px)",
                        transition: "opacity 0.9s ease-in-out, transform 0.9s ease-in-out",
                    }}
                />
            </div>

            {/* === Menu Overlay === */}
            <div
                ref={overlayRef}
                id="global-overlay"
                role="navigation"
                className="fixed inset-0 z-[2147483646] pointer-events-none"
                style={{
                    opacity: menuOpen ? 1 : 0,
                    transition: "opacity 1.2s ease-in-out",
                }}
            >
                <div
                    ref={menuRef}
                    className={`menu-overlay fixed top-0 right-0 h-screen w-full md:w-[40%]
                      bg-gradient-to-br from-[#7d1f97] to-[#952ca8]
                      flex flex-col items-start justify-start
                      pl-[4.5cm] pr-[1cm] pt-[1cm]
                      transition-transform duration-[1500ms]
                      ease-[cubic-bezier(0.25,1,0.3,1)]
                      ${menuOpen ? "translate-x-0" : "translate-x-full"}
                      pointer-events-auto`}
                    style={{
                        overflow: "hidden",
                        backdropFilter: "blur(36px) saturate(1.3)",
                    }}
                >
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0))",
                            opacity: 0.8,
                            mixBlendMode: "soft-light",
                        }}
                    />
                    <div className="flex flex-col w-full mt-[0.5cm] relative z-10">
                        {renderItems(navItems.slice(0, 6))}
                        <div className="w-[80%] h-[1px] bg-white/30 my-6"></div>
                        {renderItems(navItems.slice(6))}
                    </div>
                    <div
                        className={`absolute bottom-[1.6rem] left-1/2 -translate-x-1/2 flex flex-col items-center ${cascadeDone ? "opacity-100" : "opacity-0"
                            } transition-all duration-[1300ms]`}
                    >
                        <div className="text-[0.75rem] text-white/80 text-center mb-3">
                            © 2025 Tony Thompson
                        </div>
                        <div className="flex justify-between w-[240px]">
                            {/* ✅ Social links now accessible */}
                            <a href="#" aria-label="Visit Tony Thompson on Facebook" className="w-[26px] h-[26px] rounded-full flex items-center justify-center
                             bg-white hover:bg-[#7d1f97] transition-all duration-500
                             shadow-[0_2px_6px_rgba(255,255,255,0.25)] hover:scale-110 active:scale-90">
                                <Facebook size={13} strokeWidth={1.75} className="text-[#7d1f97] hover:text-white" />
                            </a>
                            <a href="#" aria-label="Visit Tony Thompson on Twitter" className="w-[26px] h-[26px] rounded-full flex items-center justify-center
                             bg-white hover:bg-[#7d1f97] transition-all duration-500
                             shadow-[0_2px_6px_rgba(255,255,255,0.25)] hover:scale-110 active:scale-90">
                                <Twitter size={13} strokeWidth={1.75} className="text-[#7d1f97] hover:text-white" />
                            </a>
                            <a href="#" aria-label="Visit Tony Thompson on Instagram" className="w-[26px] h-[26px] rounded-full flex items-center justify-center
                             bg-white hover:bg-[#7d1f97] transition-all duration-500
                             shadow-[0_2px_6px_rgba(255,255,255,0.25)] hover:scale-110 active:scale-90">
                                <Instagram size={13} strokeWidth={1.75} className="text-[#7d1f97] hover:text-white" />
                            </a>
                            <a href="#" aria-label="Visit Tony Thompson on LinkedIn" className="w-[26px] h-[26px] rounded-full flex items-center justify-center
                             bg-white hover:bg-[#7d1f97] transition-all duration-500
                             shadow-[0_2px_6px_rgba(255,255,255,0.25)] hover:scale-110 active:scale-90">
                                <Linkedin size={13} strokeWidth={1.75} className="text-[#7d1f97] hover:text-white" />
                            </a>
                            <a href="#" aria-label="Visit Tony Thompson on YouTube" className="w-[26px] h-[26px] rounded-full flex items-center justify-center
                             bg-white hover:bg-[#7d1f97] transition-all duration-500
                             shadow-[0_2px_6px_rgba(255,255,255,0.25)] hover:scale-110 active:scale-90">
                                <Youtube size={13} strokeWidth={1.75} className="text-[#7d1f97] hover:text-white" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* === Purple cinematic fog === */}
            <div
                ref={fadeRef}
                className="fixed inset-0 z-[2147483645] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(125,31,151,0.3) 0%, rgba(40,0,60,0.95) 70%, rgba(0,0,0,0.98) 100%)",
                    opacity: 0,
                    transition: "opacity 1s ease-out",
                }}
            />

            {createPortal(HamburgerButton, document.body)}
        </>
    );
}
