/* ====================================================
   ⭐ src/components/GlobalOverlay.jsx — ELEMENT POSITION FIX
==================================================== */
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Youtube, ArrowRight } from "lucide-react";
import gsap from "gsap";
import logoFull from "../assets/images/logoFull.png";
import ttLogo from "../assets/images/logoTT.png";
import useScrollSpy from "../utils/useScrollSpy";

// === 1. SPOTLIGHT LOGIC ===
const useSpotlight = (ref) => {
    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            el.style.setProperty("--mouse-x", `${x}px`);
            el.style.setProperty("--mouse-y", `${y}px`);
        };
        el.addEventListener("mousemove", handleMouseMove);
        return () => el.removeEventListener("mousemove", handleMouseMove);
    }, []);
};

// === 2. MAGNETIC PHYSICS ===
const useMagnetic = (ref, active) => {
    useEffect(() => {
        if (!active || !ref.current) return;
        const el = ref.current;
        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            gsap.to(el, { x: x * 0.08, y: y * 0.08, duration: 2, ease: "power2.out" });
            gsap.to(el.querySelector(".text-content"), {
                x: x * 0.04,
                y: y * 0.04,
                duration: 2,
                ease: "power2.out",
            });
        };
        const handleMouseLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 2, ease: "power2.out" });
            gsap.to(el.querySelector(".text-content"), {
                x: 0,
                y: 0,
                duration: 2,
                ease: "power2.out",
            });
        };
        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [active]);
};

export default function GlobalOverlay({ menuOpen, setMenuOpen }) {
    const navigate = useNavigate();
    const location = useLocation();

    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);
    const overlayRef = useRef(null);
    const fadeRef = useRef(null);

    const [cascadeDone, setCascadeDone] = useState(false);
    const [activeSection, setActiveSection] = useState("#home");
    const [hoveredLink, setHoveredLink] = useState(null);

    // === SCROLL STATES ===
    const [isAtTop, setIsAtTop] = useState(true);
    const [contactIsVisible, setContactIsVisible] = useState(false);

    const lastClicked = useRef(null);

    useSpotlight(menuRef);

    // === NAV ITEMS ===
    const navItems = [
        { label: "HOME", link: "#home", variant: "anchor" },
        { label: "MEET TONY", link: "#meet-tony", variant: "identity" },
        { label: "MISSING PIECE", link: "#about", variant: "hook" },
        { label: "TESTIMONIALS", link: "#testimonials", variant: "logic" },
        { label: "TRUSTED BY", link: "#trust", variant: "logic" },
        { label: "BOOK TONY", link: "#book-tony", variant: "cta" },
        { label: "PROGRAMS", link: "#programs", variant: "logic" },
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
        "#book-tony",
        "#programs",
        "#contact",
    ];
    const { active, lock } = useScrollSpy(selectors, {
        sample: 0.45,
        lockMs: 1000,
    });

    // === GLOBAL SCROLL LISTENER ===
    useEffect(() => {
        const handleScroll = () => {
            const topThreshold = window.innerHeight * 0.8;
            setIsAtTop(window.scrollY < topThreshold);

            if (location.pathname === "/") {
                const contactEl = document.getElementById("contact");
                if (contactEl) {
                    const rect = contactEl.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight - 50;
                    setContactIsVisible(isVisible);
                } else {
                    setContactIsVisible(false);
                }
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    useEffect(() => {
        const saved = sessionStorage.getItem("activeSection");
        if (saved && !lastClicked.current) setActiveSection(saved);
    }, []);

    useEffect(() => {
        if (activeSection) sessionStorage.setItem("activeSection", activeSection);
    }, [activeSection]);

    // === ACTIVE SECTION LOGIC (THE FIX) ===
    useEffect(() => {
        const path = location.pathname;

        if (path === "/meet-tony") {
            setActiveSection("#meet-tony");
            return;
        }
        if (path.startsWith("/lets-win") || path.startsWith("/quiz-intro")) {
            setActiveSection("#about");
            return;
        }
        if (path.startsWith("/shop")) {
            setActiveSection("/shop");
            return;
        }

        if (path === "/") {
            if (contactIsVisible) {
                setActiveSection("#contact");
            } else if (active) {
                setActiveSection(active);
            } else {
                if (!activeSection) setActiveSection("#home");
            }
            return;
        }

        setActiveSection("#home");
    }, [active, contactIsVisible, location.pathname]);

    // === CINEMATIC ENTRANCE ===
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray(".menu-item-container");
            const socialIcons = gsap.utils.toArray(".social-icon-btn");
            const divider = "#nav-divider";
            const copyright = "#nav-copyright";

            if (menuOpen) {
                gsap.set(items, {
                    x: 60,
                    opacity: 0,
                    filter: "blur(12px)",
                });
                gsap.set(socialIcons, {
                    scale: 0.5,
                    opacity: 0,
                    x: -10,
                });
                gsap.set(divider, {
                    scaleX: 0,
                    opacity: 0,
                });
                gsap.set(copyright, {
                    opacity: 0,
                    y: 10,
                });

                const tl = gsap.timeline();
                tl.to(
                    items,
                    {
                        x: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 1.8,
                        stagger: 0.05,
                        ease: "power4.out",
                        onComplete: () => setCascadeDone(true),
                    },
                    "+=0.3"
                );
                tl.to(
                    divider,
                    {
                        scaleX: 1,
                        opacity: 1,
                        duration: 1.5,
                        ease: "power3.inOut",
                    },
                    "-=1.5"
                );
                tl.to(
                    socialIcons,
                    {
                        scale: 1,
                        opacity: 1,
                        x: 0,
                        duration: 1.2,
                        stagger: 0.06,
                        ease: "back.out(1.2)",
                    },
                    "-=1.2"
                );
                tl.to(
                    copyright,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.0,
                    },
                    "-=1.0"
                );
            } else {
                setCascadeDone(false);
                setHoveredLink(null);
                const tl = gsap.timeline();
                tl.to(items, {
                    opacity: 0,
                    x: 20,
                    filter: "blur(5px)",
                    duration: 0.5,
                    stagger: 0.02,
                    ease: "power2.in",
                });
                tl.to(
                    [socialIcons, divider, copyright],
                    {
                        opacity: 0,
                        duration: 0.3,
                    },
                    "<"
                );
            }
        }, overlayRef);
        return () => ctx.revert();
    }, [menuOpen]);

    // === FOG LOGIC ===
    useEffect(() => {
        const fade = fadeRef.current;
        if (!fade) return;

        window.triggerGlobalFog = (callback) => {
            fade.style.transition = "opacity 0.6s ease-out";
            fade.style.opacity = 1;
            fade.style.pointerEvents = "auto";

            setTimeout(() => {
                if (callback) callback();
            }, 150);

            setTimeout(() => {
                fade.style.opacity = 0;
                setTimeout(() => (fade.style.pointerEvents = "none"), 400);
            }, 2200);
        };
    }, []);

    // === NAV CLICK HANDLING ===
    const handleNavClick = (hashOrPath) => {
        if (lock) lock();
        lastClicked.current = hashOrPath;
        setHoveredLink(hashOrPath);

        window.triggerGlobalFog(() => {
            setMenuOpen(false);

            const isHomePage = location.pathname === "/";

            if (hashOrPath.startsWith("/") && !hashOrPath.includes("#")) {
                navigate(hashOrPath);
                return;
            }

            if (hashOrPath === "#home" || hashOrPath === "/#home") {
                if (!isHomePage) {
                    navigate("/");
                } else {
                    if (window.lenis)
                        window.lenis.scrollTo(0, { duration: 1.4 });
                    else window.scrollTo({ top: 0, behavior: "smooth" });
                }
                return;
            }

            const cleanTarget = hashOrPath
                .replace(/^#/, "")
                .replace(/^\//, "")
                .replace(/^#/, "");

            if (isHomePage) {
                const el = document.getElementById(cleanTarget);
                if (window.lenis && el) {
                    window.lenis.scrollTo(el, { duration: 1.4 });
                } else {
                    el?.scrollIntoView({ behavior: "smooth" });
                }
            } else {
                navigate(`/?target=${cleanTarget}`);
            }
        });
    };

    // === HAMBURGER BUTTON ===
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
            className="pointer-events-auto fixed top-[25px] right-[25px] flex flex-col justify-between w-[52px] h-[34px] transition-transform duration-300 z-[2147483648] group"
        >
            <span className="bar top" />
            <span className="bar middle" />
            <span className="bar bottom" />
            <style>{`
                #hamburger .bar {
                    display: block;
                    width: 52px;
                    background-color: rgba(255,255,255,0.95);
                    border-radius: 2.5px;
                    margin: 5px 0;
                    box-shadow: 0 0 6px rgba(0,0,0,0.4);
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                                opacity 0.4s ease,
                                background-color 0.3s ease;
                    transform-origin: center;
                }
                #hamburger .bar.top,
                #hamburger .bar.bottom {
                    height: 5.5px;
                }
                #hamburger .bar.middle {
                    height: 2px;
                    opacity: 0.95;
                }

                /* ACTIVE STATE */
                #hamburger.active .bar.top {
                    transform: rotate(45deg) translate(9px, 9px);
                }
                #hamburger.active .bar.middle {
                    opacity: 0;
                    transform: translateX(-20px);
                    transition: opacity 0.2s ease,
                                transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                #hamburger.active .bar.bottom {
                    transform: rotate(-45deg) translate(9px, -9px);
                }

                /* HOVER STATE */
                #hamburger:not(.active):hover .bar.top {
                    transform: translateY(-2px);
                }
                #hamburger:not(.active):hover .bar.bottom {
                    transform: translateY(2px);
                }

                #hamburger.active:hover {
                    transform: scale(1.05);
                }
            `}</style>
        </button>
    );

    // CLOSE MENU WHEN CLICKING OUTSIDE
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
        return () =>
            document.removeEventListener("mousedown", handleClickOutside, true);
    }, [menuOpen]);

    const MagneticMenuItem = ({
        item,
        onClick,
        isActive,
        showStrike,
        hoveredLink,
        setHoveredLink,
    }) => {
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

        let weight =
            variant === "hook"
                ? "font-[900]"
                : isLogic
                    ? "font-[700]"
                    : "font-[830]";

        let tracking = isIdentity
            ? "tracking-[0.035em]"
            : "tracking-[0.019em]";

        let marginClass = isSecondary ? "my-[2px]" : "my-[4px]";
        let styles = isDimmed ? "opacity-85" : "opacity-100";
        let textClass = isDimmed ? "text-white/90" : "text-white";

        if (isHovered)
            styles +=
                " translate-x-[6px] drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]";

        if (isSecondary) textClass = "text-white/60 hover:text-white";

        return (
            <div
                ref={itemRef}
                className={`menu-item-container relative ${marginClass} perspective-[1000px] will-change-transform`}
            >
                <button
                    onClick={onClick}
                    onMouseEnter={() => setHoveredLink(link)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={`text-content relative text-left uppercase ${fontSizeClass} ${weight} ${tracking} ${textClass} ${styles}
                                transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                                leading-[0.95] subpixel-antialiased font-['Bebas_Neue'] group
                                pointer-events-auto cursor-pointer`}
                >
                    <span className={`relative z-10 inline-block pointer-events-none`}>
                        {label}
                        <span
                            className={`absolute left-0 top-1/2 -translate-y-1/2 h-[3px] rounded-sm origin-left bg-gradient-to-r from-white via-[#9B26B6] to-transparent transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                                ${showStrike ? "scale-x-105 opacity-100" : "scale-x-0 opacity-0"}`}
                            style={{
                                width: "115%",
                                boxShadow:
                                    "0 0 12px rgba(155,38,182,0.5)",
                            }}
                        />
                    </span>
                    {isCTA && (
                        <ArrowRight
                            className={`inline-block ml-4 text-white w-[clamp(1.8rem,2.8vw,2.3rem)] h-[clamp(1.8rem,2.8vw,2.3rem)]
                                transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                                ${isHovered ? "translate-x-3" : ""}`}
                            strokeWidth={3}
                        />
                    )}
                </button>
            </div>
        );
    };

    // LOGO VISIBILITY CONDITION:
    const showFullBranding =
        isAtTop && location.pathname === "/";

    return (
        <>
            {/* LOGO & BRANDING */}
            <div
                className="fixed flex items-center pointer-events-auto cursor-pointer"
                style={{
                    top: "26px",
                    left: "28px",
                    zIndex: 2147483647,
                }}
                onClick={() => navigate("/")}
            >
                <div className="relative flex items-start">
                    <img
                        id="tt-mini-logo"
                        src={ttLogo}
                        alt="Tony Thompson TT logo"
                        style={{
                            width: "46px",
                            filter:
                                "brightness(0) invert(1) drop-shadow(0 0 2px rgba(255,255,255,0.45)) !important",
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
                        opacity: showFullBranding ? 1 : 0,
                        visibility: showFullBranding
                            ? "visible"
                            : "hidden",
                        transform: showFullBranding
                            ? "translateY(0)"
                            : "translateY(-12px)",
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
                        opacity: showFullBranding ? 1 : 0,
                        transform: showFullBranding
                            ? "translateX(0)"
                            : "translateX(24px)",
                        transition:
                            "opacity 0.9s ease-in-out, transform 0.9s ease-in-out",
                    }}
                />
            </div>

            {/* OVERLAY */}
            <div
                ref={overlayRef}
                id="global-overlay"
                role="navigation"
                className="fixed inset-0 z-[2147483650] pointer-events-none"
                style={{
                    opacity: menuOpen ? 1 : 0,
                    transition: "opacity 1s ease-in-out",
                }}
            >
                <div
                    ref={menuRef}
                    className={`menu-overlay fixed top-0 right-0 h-screen w-[90%] md:w-[48%] lg:w-[42%] xl:w-[38%]
                                flex flex-col justify-start items-start pt-[4.5rem] md:pt-[1cm] pl-[1.65cm] md:pl-[4.8cm] pr-[1cm]
                                transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                                ${menuOpen ? "translate-x-0" : "translate-x-full"}
                                pointer-events-auto border-l border-white/10 shadow-[-100px_0_150px_rgba(0,0,0,0.8)]`}
                    style={{
                        overflow: "hidden",
                        background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(155, 38, 182, 0.15), transparent 40%),
                            linear-gradient(145deg, rgba(155,38,182,0.98) 0%, rgba(70,10,85,0.99) 50%, rgba(45,5,60,1) 100%)`,
                        backdropFilter: "blur(60px)",
                    }}
                >
                    <div
                        className="absolute inset-0 opacity-[0.35] pointer-events-none mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    <div className="flex flex-col w-full mt-[0.5cm] relative z-10 translate-x-[0.5cm]">
                        <div className="flex flex-col">
                            {navItems.slice(0, 7).map((item) => (
                                <MagneticMenuItem
                                    key={item.label}
                                    item={item}
                                    onClick={() => handleNavClick(item.link)}
                                    isActive={
                                        activeSection === item.link
                                    }
                                    showStrike={
                                        cascadeDone &&
                                        activeSection === item.link
                                    }
                                    hoveredLink={hoveredLink}
                                    setHoveredLink={setHoveredLink}
                                />
                            ))}
                        </div>

                        <div
                            id="nav-divider"
                            className={`w-[70%] h-[1px] bg-gradient-to-r from-white/10 via-white/40 to-transparent mt-10 mb-6 ml-1 relative origin-left`}
                        ></div>

                        <div className="flex flex-col gap-0 opacity-90">
                            {navItems.slice(7).map((item) => (
                                <MagneticMenuItem
                                    key={item.label}
                                    item={item}
                                    onClick={() => handleNavClick(item.link)}
                                    isActive={
                                        activeSection === item.link
                                    }
                                    showStrike={
                                        cascadeDone &&
                                        activeSection === item.link
                                    }
                                    hoveredLink={hoveredLink}
                                    setHoveredLink={setHoveredLink}
                                />
                            ))}
                        </div>
                    </div>

                    <div
                        id="nav-footer"
                        className="absolute bottom-[2.5rem] z-20 flex flex-col items-start left-[calc(1.65cm+0.5cm)] md:left-[calc(4.8cm+0.5cm)]"
                    >
                        <div className="flex gap-3 mb-4">
                            <a
                                href="https://www.instagram.com/tt5481562/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-btn w-[28px] h-[28px] rounded-full flex items-center justify-center bg-white/5 hover:bg-white border border-white/20 hover:border-transparent transition-all duration-300 backdrop-blur-md group shadow-[0_5px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(155,38,182,0.8)]"
                            >
                                <Instagram
                                    size={14}
                                    strokeWidth={1.5}
                                    className="text-white group-hover:text-[#9B26B6] transition-colors duration-300"
                                />
                            </a>

                            <a
                                href="https://www.tiktok.com/@tonythompson08?is_from_webapp=1&sender_device=pc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-btn w-[28px] h-[28px] rounded-full flex items-center justify-center bg-white/5 hover:bg-white border border-white/20 hover:border-transparent transition-all duration-300 backdrop-blur-md group shadow-[0_5px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(155,38,182,0.8)]"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 256 256"
                                    className="w-[14px] h-[14px] fill-white group-hover:fill-[#9B26B6] transition-all duration-300"
                                >
                                    <path d="M161.06 0h-34.1v166.63a30.75 30.75 0 1 1-30.75-30.75 31.2 31.2 0 0 1 6.89.75V99.1a64.74 64.74 0 1 0 57.6 64.64V79.06a79.47 79.47 0 0 0 49.77 17.07V61.46a49.63 49.63 0 0 1-49.4-49.4V0Z" />
                                </svg>
                            </a>

                            <a
                                href="https://www.youtube.com/@TonyThompson-b5u"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-btn w-[28px] h-[28px] rounded-full flex items-center justify-center bg-white/5 hover:bg-white border border-white/20 hover:border-transparent transition-all duration-300 backdrop-blur-md group shadow-[0_5px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(155,38,182,0.8)]"
                            >
                                <Youtube
                                    size={14}
                                    strokeWidth={1.5}
                                    className="text-white group-hover:text-[#9B26B6] transition-colors duration-300"
                                />
                            </a>

                            <a
                                href="https://x.com/TonyThomps7989"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-btn w-[28px] h-[28px] rounded-full flex items-center justify-center bg-white/5 hover:bg-white border border-white/20 hover:border-transparent transition-all duration-300 backdrop-blur-md group shadow-[0_5px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(155,38,182,0.8)]"
                            >
                                <Twitter
                                    size={14}
                                    strokeWidth={1.5}
                                    className="text-white group-hover:text-[#9B26B6] transition-colors duration-300"
                                />
                            </a>

                            <a
                                href="https://linktr.ee/TonyT9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-btn w-[28px] h-[28px] rounded-full flex items-center justify-center bg-white/5 hover:bg-white border border-white/20 hover:border-transparent transition-all duration-300 backdrop-blur-md group shadow-[0_5px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(155,38,182,0.8)]"
                            >
                                <Linkedin
                                    size={14}
                                    strokeWidth={1.5}
                                    className="text-white group-hover:text-[#9B26B6] transition-colors duration-300"
                                />
                            </a>
                        </div>

                        <div
                            id="nav-copyright"
                            className="text-[0.65rem] tracking-[0.25em] text-white/40 font-bold uppercase select-none"
                        >
                            © 2025 Tony Thompson
                        </div>
                    </div>
                </div>
            </div>

            {/* GLOBAL FOG */}
            <div
                ref={fadeRef}
                className="fixed inset-0 z-[2147483645] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at 50% 50%, rgba(155,38,182,0.2) 0%, rgba(20,5,30,0.9) 60%, rgba(0,0,0,1) 100%)",
                    opacity: 0,
                    transition: "opacity 1s ease-out",
                }}
            />

            {/* PORTALED HAMBURGER BUTTON */}
            {createPortal(HamburgerButton, document.body)}

            {/* ============================================================
                 ⭐ WHITE-SECTION VISIBILITY DETECTION (Hamburger + TT Logo)
               ============================================================ */}
            <WhiteScrollDetector />
        </>
    );
}

/* ================================================================
   ⭐ COMPONENT: WHITE SECTION OBSERVER (SELF-CONTAINED)
================================================================ */
function WhiteScrollDetector() {
    useEffect(() => {
        const bars = document.querySelectorAll("#hamburger .bar");
        const ttLogoEl = document.querySelector("#tt-mini-logo");

        if (!bars.length || !ttLogoEl) return;

        const whiteSections = document.querySelectorAll(".white-section");
        if (!whiteSections.length) return;

        let isWhite = false;

        const observer = new IntersectionObserver(
            (entries) => {
                let visible = false;

                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.05) {
                        visible = true;
                    }
                });

                if (visible !== isWhite) {
                    isWhite = visible;

                    if (visible) {
                        bars.forEach((b) => {
                            b.style.backgroundColor = "#9B26B6";        // <-- SOLID PURPLE
                            b.style.boxShadow = "0 0 12px #9B26B6";     // <-- GLOW SO YOU CAN'T MISS IT
                        });

                        ttLogoEl.style.filter = "none";                 // remove white invert filter
                        ttLogoEl.style.opacity = "1";
                        ttLogoEl.style.transition = "filter 0.3s ease, opacity 0.3s ease";
                        ttLogoEl.style.filter = "drop-shadow(0 0 12px #9B26B6)"; // purple glow so it's obvious

                    } else {
                        bars.forEach((b) => {
                            b.style.backgroundColor = "rgba(255,255,255,0.95)";
                            b.style.boxShadow = "0 0 6px rgba(0,0,0,0.4)";
                        });

                        ttLogoEl.style.filter =
                            "brightness(0) invert(1) drop-shadow(0 0 2px rgba(255,255,255,0.45))";
                    }
                }
            },
            {
                threshold: [0, 0.05, 0.1],
                rootMargin: "0px 0px -20% 0px",
            }
        );

        whiteSections.forEach((s) => observer.observe(s));

        return () => observer.disconnect();
    }, []);

    return null;
}
