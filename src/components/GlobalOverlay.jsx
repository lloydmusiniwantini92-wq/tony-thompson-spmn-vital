import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, ArrowRight } from "lucide-react";
import gsap from "gsap";
import logoFull from "../assets/images/logoFull.png";
import ttLogo from "../assets/images/logoTT.png";
import useScrollSpy from "../utils/useScrollSpy";

// === MAGNETIC PHYSICS ===
const useMagnetic = (ref, active) => {
    useEffect(() => {
        if (!active || !ref.current) return;
        const el = ref.current;

        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            gsap.to(el, { x: x * 0.08, y: y * 0.08, duration: 0.8, ease: "power3.out" });
            gsap.to(el.querySelector(".text-content"), { x: x * 0.04, y: y * 0.04, duration: 0.8, ease: "power3.out" });
        };

        const handleMouseLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1, 0.3)" });
            gsap.to(el.querySelector(".text-content"), { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1, 0.3)" });
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [active]);
};

export default function GlobalOverlay({ menuOpen, setMenuOpen, heroVisible }) {
    const navigate = useNavigate();
    const location = useLocation();

    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);
    const overlayRef = useRef(null);
    const fadeRef = useRef(null);

    const [cascadeDone, setCascadeDone] = useState(false);
    const [activeSection, setActiveSection] = useState("#home");
    const [hoveredLink, setHoveredLink] = useState(null);

    const lastClicked = useRef(null);

    // === NAV ITEMS ===
    const navItems = [
        { label: "HOME", link: "#home", variant: "anchor" },
        { label: "MEET TONY", link: "#meet-tony", variant: "identity" },
        { label: "MISSING PIECE", link: "#about", variant: "hook" },
        { label: "TESTIMONIALS", link: "#testimonials", variant: "logic" },
        { label: "TRUSTED BY", link: "#trust", variant: "logic" },
        { label: "PROGRAMS", link: "#programs", variant: "logic" },
        { label: "BOOK TONY", link: "#book-tony", variant: "cta" },

        // Secondary links
        { label: "SHOP", link: "/shop", variant: "secondary" },
        { label: "PODCASTS", link: "/podcasts", variant: "secondary" },
        { label: "NEWSLETTER", link: "/newsletter", variant: "secondary" },
        { label: "CONTACT", link: "#contact", variant: "secondary" },
    ];

    // === SCROLL SPY ===
    const selectors = [
        "#home",
        "#meet-tony",
        "#about",
        "#testimonials",
        "#trust",
        "#programs",
        "#contact",
        "#book-tony",
    ];

    const { active, lock } = useScrollSpy(selectors, { sample: 0.45, lockMs: 1000 });

    /* Restore last active section */
    useEffect(() => {
        const saved = sessionStorage.getItem("activeSection");
        if (saved && !lastClicked.current) setActiveSection(saved);
    }, []);

    useEffect(() => {
        if (activeSection) sessionStorage.setItem("activeSection", activeSection);
    }, [activeSection]);

    /* Handle React Router paths */
    useEffect(() => {
        const path = location.pathname;

        if (path.startsWith("/lets-win") || path.startsWith("/quiz-intro")) {
            setActiveSection("#about");
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

    // === MENU OPEN/CLOSE ANIMATIONS ===
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray(".menu-item-container");
            const wiper = "#menu-wiper";

            if (menuOpen) {
                gsap.set(items, { y: 150, skewY: 10, opacity: 0, filter: "blur(12px)" });
                gsap.set(wiper, { backgroundPositionY: "100%", opacity: 1 });

                const tl = gsap.timeline();
                tl.to(wiper, {
                    backgroundPositionY: "0%",
                    opacity: 0,
                    duration: 1.2,
                    ease: "power2.inOut",
                });
                tl.to(
                    items,
                    {
                        y: 0,
                        skewY: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 1.8,
                        stagger: 0.06,
                        ease: "power4.out",
                        onComplete: () => setCascadeDone(true),
                    },
                    0.15
                );
            } else {
                setCascadeDone(false);
                setHoveredLink(null);
                gsap.to(items, {
                    opacity: 0,
                    y: 50,
                    skewY: -5,
                    filter: "blur(10px)",
                    duration: 0.5,
                    ease: "power2.in",
                });

                gsap.set("#menu-wiper", { opacity: 0, backgroundPositionY: "100%" });
            }
        }, overlayRef);

        return () => ctx.revert();
    }, [menuOpen]);

    // === FOG LAYER ===
    useEffect(() => {
        const fade = fadeRef.current;
        if (!fade) return;

        window.triggerGlobalFog = (scrollAction) => {

            if (window.__tt_jumpOverride) {
                scrollAction?.();
                return;
            }

            fade.style.transition = "opacity 0.6s ease-out";
            fade.style.opacity = 1;
            fade.style.pointerEvents = "auto";

            setTimeout(() => scrollAction?.(), 150);

            setTimeout(() => {
                fade.style.opacity = 0;
                setTimeout(() => (fade.style.pointerEvents = "none"), 400);
            }, 2200);
        };
    }, []);

    // === FOG-SCROLL TO TARGET ===
    const triggerFogScrollTo = (target) => {
        if (typeof window.triggerGlobalFog !== "function") return;

        window.triggerGlobalFog(() => {
            const lenis = window.lenis;
            const el = document.querySelector(target);

            if (window.__tt_jumpOverride) return;

            if (el && lenis) {
                lenis.scrollTo(el, {
                    duration: 1.4,
                    ease: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                });
            } else {
                el?.scrollIntoView({ behavior: "smooth" });
            }
        });
    };

    const handleNavClick = (hashOrPath) => {
        lock();
        lastClicked.current = hashOrPath;
        setHoveredLink(hashOrPath);

        window.triggerGlobalFog(() => {
            const lenis = window.lenis;

            if (hashOrPath.startsWith("/")) {
                navigate(hashOrPath);
                setMenuOpen(false);
                return;
            }

            if (window.location.pathname === "/") {
                const el = document.querySelector(hashOrPath);

                if (!window.__tt_jumpOverride) {
                    if (el && lenis) {
                        lenis.scrollTo(el, { duration: 1.4 });
                    } else {
                        el?.scrollIntoView({ behavior: "smooth" });
                    }
                }

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

    /* === HAMBURGER STATE === */
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
            className="pointer-events-auto fixed top-[25px] right-[25px] flex flex-col justify-between w-[52px] h-[34px] transition-transform duration-300 z-[2147483648]"
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
                                opacity 0.3s ease,
                                background-color 0.3s ease;
                    transform-origin: center;
                }
                #hamburger .bar.top, #hamburger .bar.bottom { height: 5.5px; }
                #hamburger .bar.middle { height: 2px; opacity: 0.95; }
                #hamburger.active .bar.top    { transform: rotate(43deg) translate(9px, 9px); }
                #hamburger.active .bar.middle { opacity: 0; transform: scaleX(0.6); }
                #hamburger.active .bar.bottom { transform: rotate(-43deg) translate(9px, -9px); }
                #hamburger:hover { transform: scale(1.08); }
            `}</style>
        </button>
    );

    // === CLICK OUTSIDE MENU ===
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

    /* === MENU ITEM COMPONENT === */
    const MagneticMenuItem = ({ item, onClick, isActive, showStrike, hoveredLink, setHoveredLink }) => {
        const { label, variant, link } = item;
        const itemRef = useRef(null);

        useMagnetic(itemRef, true);

        const isHovered = hoveredLink === link;
        const isDimmed = hoveredLink && !isHovered;

        const isIdentity = variant === "identity";
        const isLogic = variant === "logic";
        const isCTA = variant === "cta";
        const isSecondary = variant === "secondary";

        let fontSizeClass = isSecondary
            ? "text-[clamp(1.1rem,1.6vw,1.3rem)] font-[600]"
            : isLogic
                ? "text-[clamp(2.6rem,4.2vw,3.1rem)]"
                : "text-[clamp(2.97rem,4.6vw,3.47rem)]";

        let weight = variant === "hook" ? "font-[900]" : isLogic ? "font-[700]" : "font-[830]";
        let tracking = isIdentity ? "tracking-[0.035em]" : "tracking-[0.019em]";
        let marginClass = isSecondary ? "my-[2px]" : "my-[4px]";
        let transitionClass = "transition-all duration-[600ms] ease-[cubic-bezier(0.33,1,0.68,1)]";

        let styles = "";
        if (isDimmed) styles = "opacity-40 blur-[1px] scale-[0.98]";
        else if (isHovered) styles = "opacity-100 scale-[1.02] translate-x-[4px]";
        else styles = "opacity-100";

        let textColor = "text-white";
        if (isCTA) textColor = "text-white";
        if (isSecondary) textColor = "text-white/50 hover:text-white";

        return (
            <div ref={itemRef} className={`menu-item-container relative ${marginClass} perspective-[1000px]`}>
                <button
                    onClick={onClick}
                    onMouseEnter={() => setHoveredLink(link)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={`text-content relative text-left uppercase ${fontSizeClass} ${weight} ${tracking} ${textColor} ${styles} ${transitionClass} leading-[0.95] subpixel-antialiased font-['Bebas_Neue'] group`}
                >
                    {!isSecondary && !isDimmed && (
                        <span
                            className="absolute inset-0 text-[#a855f7] opacity-0 
                                       group-hover:opacity-30 group-hover:translate-x-[2px] 
                                       group-hover:-translate-y-[1px] 
                                       transition-all duration-500 ease-out pointer-events-none"
                        >
                            {label}
                        </span>
                    )}

                    <span className={`relative z-10 inline-block ${isActive ? "text-[rgba(220,200,255,0.45)]" : ""}`}>
                        {label}
                        <span
                            className={`absolute left-0 top-1/2 -translate-y-1/2 h-[4px] bg-[#000] rounded-sm origin-left 
                                        transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.3,1)] 
                                        ${showStrike ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
                            style={{ width: "115%", boxShadow: "0 0 4px rgba(0,0,0,0.3)" }}
                        />
                    </span>

                    {isCTA && (
                        <ArrowRight
                            className="inline-block ml-4 text-white w-[clamp(1.8rem,2.8vw,2.3rem)] 
                                       h-[clamp(1.8rem,2.8vw,2.3rem)] drop-shadow-[0_0_8px_rgba(155,38,182,0.8)]"
                            strokeWidth={3}
                        />
                    )}
                </button>
            </div>
        );
    };

    return (
        <>
            {/* FIXED LOGOS */}
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
                            filter: "brightness(0) invert(1) drop-shadow(0 0 2px rgba(255,255,255,0.45)) !important",
                        }}

                    />
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

            {/* OVERLAY */}
            <div
                ref={overlayRef}
                id="global-overlay"
                role="navigation"
                className="fixed inset-0 z-[2147483650] pointer-events-none"
                style={{ opacity: menuOpen ? 1 : 0, transition: "opacity 1.2s ease-in-out" }}
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
                    style={{ overflow: "hidden", backdropFilter: "blur(36px) saturate(1.3)" }}
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
                        {/* Primary Items */}
                        <div className="flex flex-col">
                            {navItems.slice(0, 7).map((item) => (
                                <MagneticMenuItem
                                    key={item.label}
                                    item={item}
                                    onClick={() => handleNavClick(item.link)}
                                    isActive={activeSection === item.link}
                                    showStrike={cascadeDone && activeSection === item.link}
                                    hoveredLink={hoveredLink}
                                    setHoveredLink={setHoveredLink}
                                />
                            ))}
                        </div>

                        {/* Divider */}
                        <div
                            className={`w-[60%] h-[1px] bg-white/20 mt-10 mb-6 ml-1 relative overflow-hidden transition-opacity duration-700 ${hoveredLink ? "opacity-30" : "opacity-100"
                                }`}
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent ${menuOpen ? "animate-[shimmer_3s_infinite]" : ""
                                    }`}
                            />
                        </div>

                        {/* Secondary Items */}
                        <div className="flex flex-col gap-0 opacity-90">
                            {navItems.slice(7).map((item) => (
                                <MagneticMenuItem
                                    key={item.label}
                                    item={item}
                                    onClick={() => handleNavClick(item.link)}
                                    isActive={activeSection === item.link}
                                    showStrike={cascadeDone && activeSection === item.link}
                                    hoveredLink={hoveredLink}
                                    setHoveredLink={setHoveredLink}
                                />
                            ))}
                        </div>
                    </div>

                    {/* OVERLAY FOOTER */}
                    <div
                        className={`absolute bottom-[2rem] left-1/2 -translate-x-1/2 z-20 
                            flex flex-col items-center ${cascadeDone ? "opacity-100" : "opacity-0"
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
                                    <Icon
                                        size={15}
                                        strokeWidth={1.75}
                                        className="text-[#7d1f97] hover:text-white"
                                    />
                                </a>
                            ))}
                        </div>

                        <div className="text-[0.8rem] tracking-wide text-white/85 font-semibold select-none">
                            © 2025 Tony Thompson
                            <span style={{ fontSize: "0.6rem", verticalAlign: "super" }}>™</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOG LAYER */}
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

            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </>
    );
}
