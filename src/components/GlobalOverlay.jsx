import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import logoFull from "../assets/images/logoFull.png";
import logoTT from "../assets/images/logoTT.png";

export default function GlobalOverlay({ menuOpen, setMenuOpen, heroVisible }) {
    const navigate = useNavigate();
    const location = useLocation();

    /* === LOGO CONFIG === */
    const logoStyles = {
        containerTop: "26px",
        containerLeft: "28px",
        ttOffsetX: "0.1cm",
        ttOffsetY: "-0.11cm",
        dividerOffsetX: "0.3cm",
        dividerOffsetY: "-0.06cm",
        fullLogoOffsetX: "0.1cm",
        fullLogoOffsetY: "-0.05cm",
        ttWidth: "38px",
        fullLogoWidth: "68px",
        dividerHeight: "26.2px",
        dividerThickness: "0.068px",
        dividerColor: "rgba(180,180,180,0.9)",
    };

    /* === NAVIGATION ITEMS === */
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

    const firstGroup = navItems.slice(0, 6);
    const secondGroup = navItems.slice(6);

    const [activeSection, setActiveSection] = useState("#home");
    const [cascadeDone, setCascadeDone] = useState(false);
    const [strikeDelay, setStrikeDelay] = useState(false);

    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);
    const observerRef = useRef(null);

    /* === INTERSECTION OBSERVER === */
    useEffect(() => {
        const currentPath = location.pathname;
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        const initObserver = () => {
            const sections = navItems
                .filter((n) => n.link.startsWith("#"))
                .map((n) => document.querySelector(n.link))
                .filter(Boolean);
            if (!sections.length) {
                setTimeout(initObserver, 350);
                return;
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    let visible = null;
                    let ratio = 0;
                    entries.forEach((entry) => {
                        if (entry.intersectionRatio > ratio) {
                            ratio = entry.intersectionRatio;
                            visible = entry.target;
                        }
                    });
                    if (visible && ratio > 0.35) {
                        setActiveSection(`#${visible.id}`);
                    }
                },
                { threshold: Array.from({ length: 21 }, (_, i) => i * 0.05) }
            );

            sections.forEach((s) => observer.observe(s));
            observerRef.current = observer;
        };

        if (currentPath === "/") {
            const t = setTimeout(initObserver, 400);
            return () => clearTimeout(t);
        } else {
            if (currentPath.startsWith("/about-tony")) setActiveSection("#meet-tony");
            else if (currentPath.startsWith("/quiz-intro")) setActiveSection("#about");
            else if (currentPath.startsWith("/shop")) setActiveSection("/shop");
            else if (currentPath.startsWith("/podcasts")) setActiveSection("/podcasts");
            else if (currentPath.startsWith("/newsletter")) setActiveSection("/newsletter");
            else setActiveSection("#home");
        }

        setStrikeDelay(true);
        const td = setTimeout(() => setStrikeDelay(false), 800);
        return () => clearTimeout(td);
    }, [location.pathname, location.hash]);

    /* === UNIVERSAL SCROLL / ROUTE HANDLER === */
    const handleNavClick = (hashOrPath) => {
        const lenis = window.lenis;

        // ✅ Route pages
        if (hashOrPath.startsWith("/")) {
            navigate(hashOrPath);
            setActiveSection(hashOrPath);
            setMenuOpen(false);
            return;
        }

        // ✅ In-page sections
        const scrollToTarget = () => {
            const el = document.querySelector(hashOrPath);
            if (el) {
                lenis
                    ? lenis.scrollTo(el, { duration: 1.1, offset: -10 })
                    : el.scrollIntoView({ behavior: "smooth" });
                setActiveSection(hashOrPath);
                return true;
            }
            return false;
        };

        // If already on home, scroll directly
        if (window.location.pathname === "/") {
            scrollToTarget();
            setMenuOpen(false);
            return;
        }

        // ✅ If on another page (shop, podcasts, etc.)
        // Navigate with encoded target param for delayed scroll
        navigate(`/?target=${encodeURIComponent(hashOrPath)}`);
        setMenuOpen(false);
        setActiveSection(hashOrPath);
    };

    /* === MENU ANIMATION === */
    useEffect(() => {
        const hamburger = hamburgerRef.current;
        const menu = menuRef.current;
        const items = menu?.querySelectorAll(".menu-item");
        if (!hamburger || !menu || !items) return;

        if (menuOpen) {
            hamburger.classList.add("active");
            menu.classList.add("active");
            setCascadeDone(false);
            items.forEach((item, i) => {
                item.style.opacity = 0;
                item.style.transform = "translateY(35px)";
                item.style.filter = "blur(2px)";
                setTimeout(() => {
                    item.style.transition =
                        "opacity 2.4s cubic-bezier(0.19,1,0.22,1), transform 2.4s cubic-bezier(0.19,1,0.22,1), filter 1.6s ease-out";
                    item.style.opacity = 1;
                    item.style.transform = "translateY(0)";
                    item.style.filter = "blur(0)";
                    if (i === items.length - 1)
                        setTimeout(() => setCascadeDone(true), 700);
                }, i * 280);
            });
        } else {
            hamburger.classList.remove("active");
            menu.classList.remove("active");
            setCascadeDone(false);
            items.forEach((item) => {
                item.style.opacity = 0;
                item.style.transform = "translateY(35px)";
                item.style.filter = "blur(2px)";
            });
        }
    }, [menuOpen]);

    /* === HAMBURGER BUTTON === */
    const HamburgerButton = (
        <button
            ref={hamburgerRef}
            onClick={() => setMenuOpen(!menuOpen)}
            id="hamburger"
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
                        transform 0.45s cubic-bezier(0.25, 1.15, 0.35, 1),
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

    /* === MENU ITEMS === */
    const renderItems = (items) =>
        items.map(({ label, link }) => {
            const isActive = activeSection === link;
            const showStrike = cascadeDone && isActive && !strikeDelay;
            return (
                <button
                    key={label}
                    onClick={() => handleNavClick(link)}
                    className="menu-item relative text-left font-[900] tracking-tight uppercase transition-all duration-300 leading-[1.05] text-[clamp(2rem,3.5vw,2.8rem)]"
                    style={{
                        color: isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,1)",
                        marginBottom: "0.45rem",
                    }}
                >
                    <span className="misty-text relative inline-block">
                        {label}
                        <span
                            className={`absolute left-0 top-1/2 -translate-y-1/2 h-[5px] bg-white rounded-sm origin-left transform transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.3,1)] ${showStrike
                                    ? "scale-x-100 opacity-100"
                                    : "scale-x-0 opacity-0"
                                }`}
                            style={{ width: "115%", transformOrigin: "left" }}
                        />
                    </span>
                </button>
            );
        });

    /* === RENDER === */
    return (
        <div
            id="global-overlay"
            className="fixed inset-0 z-[2147483646] transition-opacity duration-500"
            style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        >
            {/* === LOGO === */}
            <div
                className="fixed flex items-center pointer-events-auto transition-opacity duration-500 cursor-pointer"
                style={{
                    top: logoStyles.containerTop,
                    left: logoStyles.containerLeft,
                    zIndex: 2147483647,
                }}
                onClick={() => navigate("/")}
                aria-label="Go to home"
            >
                <img
                    src={logoTT}
                    alt="TT Icon"
                    className="transition-opacity duration-700"
                    style={{
                        width: logoStyles.ttWidth,
                        transform: `translate(${logoStyles.ttOffsetX}, ${logoStyles.ttOffsetY})`,
                        opacity: 1,
                    }}
                />
                <div
                    className="transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.3,1)]"
                    style={{
                        marginLeft: logoStyles.dividerOffsetX,
                        transform: `translate(${heroVisible ? "0" : "1.2cm"}, ${logoStyles.dividerOffsetY})`,
                        width: logoStyles.dividerThickness,
                        height: logoStyles.dividerHeight,
                        backgroundColor: logoStyles.dividerColor,
                        borderRadius: "1px",
                        opacity: heroVisible ? 1 : 0,
                    }}
                ></div>
                <img
                    src={logoFull}
                    alt="Tony Thompson Logo Full"
                    className="transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.3,1)]"
                    style={{
                        width: logoStyles.fullLogoWidth,
                        marginLeft: logoStyles.fullLogoOffsetX,
                        transform: `translate(${heroVisible ? "0" : "1.2cm"}, ${logoStyles.fullLogoOffsetY})`,
                        opacity: heroVisible ? 1 : 0,
                    }}
                />
            </div>

            {/* === MENU === */}
            <div
                ref={menuRef}
                className={`menu-overlay fixed top-0 right-0 h-screen w-full md:w-[40%]
                bg-gradient-to-br from-[#9b26b6] to-[#b14fc0]
                flex flex-col items-start justify-start
                pl-[4.5cm] pr-[1cm] pt-[1cm]
                transition-transform duration-[1200ms]
                ease-[cubic-bezier(0.25,1,0.3,1)]
                ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex flex-col w-full mt-[0.5cm]">
                    {renderItems(firstGroup)}
                    <div className="w-[80%] h-[1px] bg-[rgba(255,255,255,0.3)] my-6"></div>
                    {renderItems(secondGroup)}
                </div>

                {/* FOOTER */}
                <div
                    className={`absolute bottom-[1.6rem] left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-[1000ms] ${cascadeDone ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div className="text-[0.75rem] font-['Press_Start_2P'] text-white/80 text-center mb-3">
                        © 2025 Tony Thompson
                    </div>
                    <div className="flex justify-between w-[240px]">
                        {[Facebook, Twitter, Instagram, Linkedin, Youtube].map(
                            (Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="social-icon w-[26px] h-[26px] rounded-full flex items-center justify-center
                                    bg-white hover:bg-[#9b26b6] transition-all duration-500
                                    shadow-[0_2px_6px_rgba(255,255,255,0.25)] hover:scale-110 active:scale-90"
                                >
                                    <Icon
                                        size={13}
                                        strokeWidth={1.75}
                                        className="text-[#9b26b6] hover:text-white"
                                    />
                                </a>
                            )
                        )}
                    </div>
                </div>
            </div>

            {createPortal(HamburgerButton, document.body)}
        </div>
    );
}
