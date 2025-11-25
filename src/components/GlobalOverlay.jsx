import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, ArrowRight } from "lucide-react";
import gsap from "gsap";
import logoFull from "../assets/images/logoFull.png";
import ttLogo from "../assets/images/logoTT.png";
import useScrollSpy from "../utils/useScrollSpy";

// === 1. SPOTLIGHT LOGIC (The Environment) ===
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

// === 2. MAGNETIC PHYSICS (The Flow) ===
const useMagnetic = (ref, active) => {
    useEffect(() => {
        if (!active || !ref.current) return;
        const el = ref.current;

        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            // MESSI SQUARED PHYSICS: Low resistance, high fluidity
            gsap.to(el, {
                x: x * 0.08,
                y: y * 0.08,
                duration: 2,
                ease: "power2.out"
            });
            // Text moves slightly differently to create 3D depth
            gsap.to(el.querySelector(".text-content"), {
                x: x * 0.04,
                y: y * 0.04,
                duration: 2,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            // The "Drift" return - no snap, just flow
            gsap.to(el, { x: 0, y: 0, duration: 2, ease: "power2.out" });
            gsap.to(el.querySelector(".text-content"), { x: 0, y: 0, duration: 2, ease: "power2.out" });
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

    // Apply spotlight tracking to the menu container
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

        // Secondary
        { label: "SHOP", link: "/shop", variant: "secondary" },
        { label: "PODCASTS", link: "/podcasts", variant: "secondary" },
        { label: "NEWSLETTER", link: "/newsletter", variant: "secondary" },
        { label: "CONTACT", link: "#contact", variant: "secondary" },
    ];

    // === SCROLL SPY ===
    const selectors = [
        "#home", "#meet-tony", "#about", "#testimonials",
        "#trust", "#programs", "#contact", "#book-tony",
    ];

    const { active, lock } = useScrollSpy(selectors, { sample: 0.45, lockMs: 1000 });

    useEffect(() => {
        const saved = sessionStorage.getItem("activeSection");
        if (saved && !lastClicked.current) setActiveSection(saved);
    }, []);

    useEffect(() => {
        if (activeSection) sessionStorage.setItem("activeSection", activeSection);
    }, [activeSection]);

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

    // === 🎬 CINEMATIC ENTRANCE ===
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray(".menu-item-container");
            const socialIcons = gsap.utils.toArray(".social-icon-btn");
            const divider = "#nav-divider";
            const copyright = "#nav-copyright";

            if (menuOpen) {
                // Initial State: Subtle offset, slight blur
                gsap.set(items, {
                    x: 60,
                    opacity: 0,
                    filter: "blur(12px)"
                });
                gsap.set(socialIcons, { scale: 0.5, opacity: 0, x: -10 });
                gsap.set(divider, { scaleX: 0, opacity: 0 });
                gsap.set(copyright, { opacity: 0, y: 10 });

                const tl = gsap.timeline();

                // 1. The Slide (Liquid Silk)
                tl.to(items, {
                    x: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.8,
                    stagger: 0.05,
                    ease: "power4.out",
                    onComplete: () => setCascadeDone(true),
                }, "+=0.3");

                // 2. The Details
                tl.to(divider, {
                    scaleX: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.inOut"
                }, "-=1.5");

                tl.to(socialIcons, {
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
                    stagger: 0.06,
                    ease: "back.out(1.2)"
                }, "-=1.2");

                tl.to(copyright, { opacity: 1, y: 0, duration: 1.0 }, "-=1.0");

            } else {
                setCascadeDone(false);
                setHoveredLink(null);
                const tl = gsap.timeline();
                // Elegant Exit
                tl.to(items, { opacity: 0, x: 20, filter: "blur(5px)", duration: 0.5, stagger: 0.02, ease: "power2.in" });
                tl.to([socialIcons, divider, copyright], { opacity: 0, duration: 0.3 }, "<");
            }
        }, overlayRef);

        return () => ctx.revert();
    }, [menuOpen]);

    // === FOG LOGIC ===
    useEffect(() => {
        const fade = fadeRef.current;
        if (!fade) return;

        window.triggerGlobalFog = (scrollAction) => {
            const params = new URLSearchParams(window.location.search);
            const target = params.get("target");

            if (target === "programs" || target === "tierlist") {
                scrollAction?.();
                return;
            }
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
    if (lock) lock();
    lastClicked.current = hashOrPath;
    setHoveredLink(hashOrPath);

    // 1 — If link is a different FULL PAGE route
    if (hashOrPath.startsWith("/")) {
        window.triggerGlobalFog(() => {
            navigate(hashOrPath);
            setMenuOpen(false);
        });
        return;
    }

    // 2 — If we are ALREADY on homepage
    if (window.location.pathname === "/") {
        window.triggerGlobalFog(() => {
            const lenis = window.lenis;
            const el = document.querySelector(hashOrPath);

            if (el && lenis) lenis.scrollTo(el, { duration: 1.4 });
            else el?.scrollIntoView({ behavior: "smooth" });

            setMenuOpen(false);
        });
        return;
    }

    // 3 — If NOT on homepage → NAVIGATE FIRST, THEN SCROLL
    window.triggerGlobalFog(() => {
        navigate("/");

        const attemptScroll = () => {
            const lenis = window.lenis;
            const target = document.querySelector(hashOrPath);

            if (!target) return false;
            if (!lenis) return false;

            lenis.scrollTo(target, { duration: 1.4 });
            return true;
        };

        // Try repeatedly until homepage fully rendered
        const interval = setInterval(() => {
            if (attemptScroll()) {
                clearInterval(interval);
            }
        }, 100);

        // safety timeout
        setTimeout(() => clearInterval(interval), 6000);

        setMenuOpen(false);
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
                    display: block; width: 52px;
                    /* FIXED: Always white, regardless of menu state */
                    background-color: rgba(255,255,255,0.95); 
                    border-radius: 2.5px; margin: 5px 0;
                    box-shadow: 0 0 6px rgba(0,0,0,0.4);
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, background-color 0.3s ease;
                    transform-origin: center;
                }
                #hamburger .bar.top, #hamburger .bar.bottom { height: 5.5px; }
                #hamburger .bar.middle { height: 2px; opacity: 0.95; }
                #hamburger.active .bar.top    { transform: rotate(45deg) translate(9px, 9px); }
                #hamburger.active .bar.middle { opacity: 0; transform: translateX(-20px); }
                #hamburger.active .bar.bottom { transform: rotate(-45deg) translate(9px, -9px); }
                #hamburger:hover .bar.top { transform: translateY(-2px); }
                #hamburger:hover .bar.bottom { transform: translateY(2px); }
            `}</style>
        </button>
    );

    // === CLICK OUTSIDE ===
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuOpen && menuRef.current && !menuRef.current.contains(e.target) && !hamburgerRef.current.contains(e.target)) {
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

        let styles = "";
        let textClass = "";

        if (isDimmed) {
            styles = "opacity-85";
            textClass = "text-white/90";
        } else if (isHovered) {
            styles = "opacity-100 translate-x-[6px] drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]";
            textClass = "text-white";
        } else {
            styles = "opacity-100";
            textClass = "text-white";
        }

        if (isSecondary) textClass = "text-white/60 hover:text-white";

        return (
            <div ref={itemRef} className={`menu-item-container relative ${marginClass} perspective-[1000px] will-change-transform`}>
                <button
                    onClick={onClick}
                    onMouseEnter={() => setHoveredLink(link)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={`text-content relative text-left uppercase ${fontSizeClass} ${weight} ${tracking} ${textClass} ${styles} 
                               transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] leading-[0.95] subpixel-antialiased font-['Bebas_Neue'] group
                               pointer-events-auto cursor-pointer`}
                >
                    <span className={`relative z-10 inline-block pointer-events-none`}>
                        {label}
                        <span
                            className={`absolute left-0 top-1/2 -translate-y-1/2 h-[3px] rounded-sm origin-left 
                                      bg-gradient-to-r from-white via-[#9B26B6] to-transparent
                                      transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                                      ${showStrike ? "scale-x-105 opacity-100" : "scale-x-0 opacity-0"}`}
                            style={{ width: "115%", boxShadow: "0 0 12px rgba(155,38,182,0.5)" }}
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

    return (
        <>
            {/* LOGOS */}
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
                        marginLeft: "0.3cm", width: "1px", height: "26.2px", backgroundColor: "#fff",
                        borderRadius: "1px", opacity: heroVisible ? 1 : 0, visibility: heroVisible ? "visible" : "hidden",
                        transform: heroVisible ? "translateY(0)" : "translateY(-12px)",
                        transition: "opacity 0.9s ease-in-out 0.15s, transform 0.9s ease-in-out 0.15s",
                    }}
                />
                <img
                    src={logoFull}
                    alt="Tony Thompson full logo"
                    style={{
                        width: "68px", marginLeft: "0.1cm", opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? "translateX(0)" : "translateX(24px)",
                        transition: "opacity 0.9s ease-in-out, transform 0.9s ease-in-out",
                    }}
                />
            </div>

            {/* MAIN OVERLAY CONTAINER */}
            <div
                ref={overlayRef}
                id="global-overlay"
                role="navigation"
                className="fixed inset-0 z-[2147483650] pointer-events-none"
                style={{ opacity: menuOpen ? 1 : 0, transition: "opacity 1s ease-in-out" }}
            >
                <div
                    ref={menuRef}
                    className={`menu-overlay fixed top-0 right-0 h-screen w-[90%] md:w-[48%] lg:w-[42%] xl:w-[38%]
                        flex flex-col justify-start items-start
                        pt-[4.5rem] md:pt-[1cm] pl-[1.65cm] md:pl-[4.8cm] pr-[1cm]
                        transition-transform duration-[1500ms]
                        ease-[cubic-bezier(0.16,1,0.3,1)]
                        ${menuOpen ? "translate-x-0" : "translate-x-full"}
                        pointer-events-auto border-l border-white/10 shadow-[-100px_0_150px_rgba(0,0,0,0.8)]`}
                    style={{
                        overflow: "hidden",
                        background: `
                            radial-gradient(
                                800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                                rgba(155, 38, 182, 0.15),
                                transparent 40%
                            ),
                            linear-gradient(145deg, rgba(155,38,182,0.98) 0%, rgba(70,10,85,0.99) 50%, rgba(45,5,60,1) 100%)
                        `,
                        backdropFilter: "blur(60px)"
                    }}
                >
                    {/* NOISE TEXTURE */}
                    <div className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                    />

                    <div className="flex flex-col w-full mt-[0.5cm] relative z-10 translate-x-[0.5cm]">
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
                                    isActive={activeSection === item.link}
                                    showStrike={cascadeDone && activeSection === item.link}
                                    hoveredLink={hoveredLink}
                                    setHoveredLink={setHoveredLink}
                                />
                            ))}
                        </div>
                    </div>

                    <div
                        id="nav-footer"
                        className="absolute bottom-[2.5rem] z-20 flex flex-col items-start
                                   left-[calc(1.65cm+0.5cm)] md:left-[calc(4.8cm+0.5cm)]"
                    >
                        <div className="flex gap-3 mb-4">
                            {/* === REPLACED SOCIAL ICONS WITH REAL LINKS === */}
                            <a
                                href="https://www.instagram.com/tt5481562/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-btn w-[28px] h-[28px] rounded-full flex items-center justify-center 
                                           bg-white/5 hover:bg-white border border-white/20 hover:border-transparent
                                           transition-all duration-300 backdrop-blur-md group shadow-[0_4px_12px_rgba(0,0,0,0.2)]
                                           hover:shadow-[0_0_15px_rgba(155,38,182,0.6)]"
                            >
                                <Instagram
                                    size={14}
                                    strokeWidth={1.5}
                                    className="text-white group-hover:text-[#9B26B6] transition-colors duration-300"
                                />
                            </a>

                            {/* TikTok */}
                            <a
                                href="https://www.tiktok.com/@tonythompson08?is_from_webapp=1&sender_device=pc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-btn w-[28px] h-[28px] rounded-full flex items-center justify-center 
                                           bg-white/5 hover:bg-white border border-white/20 hover:border-transparent
                                           transition-all duration-300 backdrop-blur-md group shadow-[0_4px_12px_rgba(0,0,0,0.2)]
                                           hover:shadow-[0_0_15px_rgba(155,38,182,0.6)]"
                            >
                                {/* TikTok SVG to match footer style */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
                                    className="w-[14px] h-[14px] fill-white group-hover:fill-[#9B26B6] transition-all duration-300">
                                    <path d="M161.06 0h-34.1v166.63a30.75 30.75 0 1 1-30.75-30.75 31.2 31.2 0 0 1 6.89.75V99.1a64.74 64.74 0 1 0 57.6 64.64V79.06a79.47 79.47 0 0 0 49.77 17.07V61.46a49.63 49.63 0 0 1-49.4-49.4V0Z" />
                                </svg>
                            </a>

                            {/* YouTube */}
                            <a
                                href="https://www.youtube.com/@TonyThompson-b5u"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-btn w-[28px] h-[28px] rounded-full flex items-center justify-center 
                                           bg-white/5 hover:bg-white border border-white/20 hover:border-transparent
                                           transition-all duration-300 backdrop-blur-md group shadow-[0_4px_12px_rgba(0,0,0,0.2)]
                                           hover:shadow-[0_0_15px_rgba(155,38,182,0.6)]"
                            >
                                <Youtube
                                    size={14}
                                    strokeWidth={1.5}
                                    className="text-white group-hover:text-[#9B26B6] transition-colors duration-300"
                                />
                            </a>

                            {/* X (Twitter) */}
                            <a
                                href="https://x.com/TonyThomps7989"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-btn w-[28px] h-[28px] rounded-full flex items-center justify-center 
                                           bg-white/5 hover:bg-white border border-white/20 hover:border-transparent
                                           transition-all duration-300 backdrop-blur-md group shadow-[0_4px_12px_rgba(0,0,0,0.2)]
                                           hover:shadow-[0_0_15px_rgba(155,38,182,0.6)]"
                            >
                                <Twitter
                                    size={14}
                                    strokeWidth={1.5}
                                    className="text-white group-hover:text-[#9B26B6] transition-colors duration-300"
                                />
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://linktr.ee/TonyT9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-btn w-[28px] h-[28px] rounded-full flex items-center justify-center 
                                           bg-white/5 hover:bg-white border border-white/20 hover:border-transparent
                                           transition-all duration-300 backdrop-blur-md group shadow-[0_4px_12px_rgba(0,0,0,0.2)]
                                           hover:shadow-[0_0_15px_rgba(155,38,182,0.6)]"
                            >
                                <Linkedin
                                    size={14}
                                    strokeWidth={1.5}
                                    className="text-white group-hover:text-[#9B26B6] transition-colors duration-300"
                                />
                            </a>
                        </div>

                        <div id="nav-copyright" className="text-[0.65rem] tracking-[0.25em] text-white/40 font-bold uppercase select-none">
                            © 2025 Tony Thompson
                        </div>
                    </div>
                </div>
            </div>

            {/* FOG LAYER */}
            <div
                ref={fadeRef}
                className="fixed inset-0 z-[2147483645] pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(155,38,182,0.2) 0%, rgba(20,5,30,0.9) 60%, rgba(0,0,0,1) 100%)",
                    opacity: 0,
                    transition: "opacity 1s ease-out",
                }}
            />

            {createPortal(HamburgerButton, document.body)}
        </>
    );
}
