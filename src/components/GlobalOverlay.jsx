import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import gsap from "gsap";
import logoFull from "../assets/images/logoFull.png";
import ttLogo from "/assets/TT Logo.svg";
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
        { label: "BOOK TONY", link: "#book-tony" },

        { label: "TAKE QUIZ", link: "#about" },   // UPDATED
        { label: "TESTIMONIALS", link: "#testimonials" },
        { label: "PROGRAMS", link: "#programs" },
        { label: "CONTACT", link: "#contact" },
        { label: "SHOP", link: "/shop" },
        { label: "INQUIRIES", link: "#enquiries" },
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

    const selectors = [
        "#home",
        "#meet-tony",
        "#about",
        "#testimonials",
        "#programs",
        "#contact",
        "#enquiries",
        "#book-tony", /* OPTIONAL: adding helps highlight active menu */
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

    /* === Purple veil + cascade animation === */
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray(".menu-item");
            const wiper = "#menu-wiper";

            if (menuOpen) {
                gsap.set(items, { y: 40, opacity: 0, filter: "blur(6px)" });
                gsap.set(wiper, { backgroundPositionY: "100%", opacity: 1 });

                const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

                tl.to(wiper, {
                    backgroundPositionY: "0%",
                    opacity: 0,
                    duration: 7.2,
                });

                tl.to(
                    items,
                    {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 1.2,
                        stagger: 0.12,
                        onComplete: () => setCascadeDone(true),
                    },
                    0.15
                );
            } else {
                setCascadeDone(false);
                gsap.set(items, { opacity: 0, y: 40, filter: "blur(6px)" });
                gsap.set("#menu-wiper", { opacity: 0, backgroundPositionY: "100%" });
            }
        }, overlayRef);
        return () => ctx.revert();
    }, [menuOpen]);

    /* === Click outside === */
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

    /* === Fog effect === */
    useEffect(() => {
        const fade = fadeRef.current;
        if (!fade) return;
        window.triggerGlobalFog = (scrollAction) => {
            fade.style.transition = "opacity 0.5s ease-out";
            fade.style.opacity = 1;
            fade.style.pointerEvents = "auto";
            setTimeout(() => scrollAction?.(), 150);
            setTimeout(() => {
                fade.style.opacity = 0;
                setTimeout(() => (fade.style.pointerEvents = "none"), 400);
            }, 2200);
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

    /* === Hamburger animation === */
    useEffect(() => {
        if (!hamburgerRef.current) return;
        if (menuOpen) hamburgerRef.current.classList.add("active");
        else hamburgerRef.current.classList.remove("active");
    }, [menuOpen]);

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
          background-color: ${menuOpen ? "#000" : "rgba(255,255,255,0.95)"};
          border-radius: 2.5px;
          margin: 5px 0;
          box-shadow: 0 0 6px rgba(0,0,0,0.4);
          transition: transform 0.45s cubic-bezier(0.25,1.15,0.35,1),
            opacity 0.3s ease, background-color 0.3s ease;
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
                    className="menu-item relative text-left uppercase
          text-[clamp(2.97rem,4.6vw,3.47rem)] font-[830]
          tracking-[0.019em] leading-[0.95]
          transition-all duration-[400ms] ease-in-out
          hover:translate-x-[6px]
          font-['Bebas_Neue',sans-serif]"
                    style={{
                        opacity: 0,
                        transform: "translateY(40px)",
                        color: "white",
                        marginTop: "-3.2px",
                        marginBottom: "-3.2px",
                        filter: "none",
                    }}
                >
                    <span
                        className={`relative inline-block transition-all duration-[500ms] ease-in-out ${isActive
                                ? "text-[rgba(220,200,255,0.45)]"
                                : "hover:text-[rgba(220,200,255,0.45)]"
                            }`}
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
            {/* === Fixed TT logo + divider + full logo === */}
            <div
                className="fixed flex items-center pointer-events-auto cursor-pointer"
                style={{ top: "26px", left: "28px", zIndex: 2147483647 }}
                onClick={() => navigate("/")}
            >
                <div className="relative flex items-start">
                    <img
                        src={ttLogo}
                        alt="Tony Thompson TT logo"
                        style={{
                            width: "46px",
                            filter: "brightness(0) invert(1)",
                        }}
                    />
                    <span
                        style={{
                            position: "absolute",
                            right: "-0.01rem",
                            top: "1.1rem",
                            fontSize: "0.4rem",
                            fontWeight: "700",
                            color: "#fff",
                            textShadow: "0 0 6px rgba(255,255,255,0.85)",
                        }}
                    >
                        ™
                    </span>
                </div>

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

            {/* === Menu overlay restored === */}
            <div
                ref={overlayRef}
                id="global-overlay"
                role="navigation"
                className="fixed inset-0 z-[2147483650] pointer-events-none"
                style={{
                    opacity: menuOpen ? 1 : 0,
                    transition: "opacity 1.2s ease-in-out",
                }}
            >
                <div
                    ref={menuRef}
                    className={`menu-overlay fixed top-0 right-0 h-screen w-[88%] md:w-[44%]
          bg-gradient-to-br from-[#7d1f97] to-[#952ca8]
          flex flex-col justify-start items-start
          pt-[4.5rem] md:pt-[1cm] pl-[1.65cm] md:pl-[4.8cm] pr-[1cm]
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
                        id="menu-wiper"
                        className="absolute top-0 left-0 w-full h-full z-[5] pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(to top, rgba(125,31,151,1) 0%, rgba(125,31,151,0.6) 40%, rgba(125,31,151,0) 100%)",
                            backgroundSize: "100% 300%",
                            backgroundPositionY: "100%",
                            opacity: 0,
                        }}
                    ></div>

                    <div className="flex flex-col w-full mt-[0.5cm] relative z-10 translate-x-[1cm]">
                        {renderItems(navItems.slice(0, 6))}
                        <div className="w-[80%] h-[1px] bg-white/30 my-4"></div>
                        {renderItems(navItems.slice(6))}
                    </div>

                    {/* Footer icons */}
                    <div
                        className={`absolute bottom-[2rem] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center ${cascadeDone ? "opacity-100" : "opacity-0"
                            } transition-opacity duration-[1300ms]`}
                    >
                        <div className="flex gap-4 mb-3">
                            {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-[30px] h-[30px] rounded-full flex items-center justify-center
                  bg-white hover:bg-[#7d1f97] transition-all duration-500
                  shadow-[0_2px_6px_rgba(255,255,255,0.25)] hover:scale-110 active:scale-90"
                                    aria-label="Social link"
                                >
                                    <Icon size={15} strokeWidth={1.75} className="text-[#7d1f97] hover:text-white" />
                                </a>
                            ))}
                        </div>
                        <div className="text-[0.8rem] tracking-wide text-white/85 font-semibold select-none">
                            © 2025 Tony Thompson<span style={{ fontSize: "0.6rem", verticalAlign: "super" }}>™</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* === Fog === */}
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
