// ✅ src/utils/scrollToSection.js
// Universal smooth-scroll helper for any section ID.

export function scrollToSection(id) {
    const targetSelector = `#${id}`;
    console.log(`[scrollToSection] → ${targetSelector}`);
    const element = document.querySelector(targetSelector);

    const scroll = (el) => {
        if (window.lenis) {
            window.lenis.scrollTo(el, { duration: 1.3, offset: -40 });
        } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (element) {
        scroll(element);
    } else {
        console.warn(`[scrollToSection] ❌ Element not found, retrying…`);
        setTimeout(() => {
            const retryEl = document.querySelector(targetSelector);
            if (retryEl) {
                console.log("[scrollToSection] ✅ Found on retry");
                scroll(retryEl);
            } else {
                console.error("[scrollToSection] ❌ Still not found after retry");
            }
        }, 800);
    }
}
