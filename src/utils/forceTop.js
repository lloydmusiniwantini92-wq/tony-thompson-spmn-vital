// ✅ src/utils/forceTop.js — guarantee start at top and scroll unlocked
export function forceTop() {
    // scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // make sure overflow isn't locked
    document.documentElement.style.overflow = "visible";
    document.body.style.overflow = "visible";

    // wait a bit and scroll again just in case Lenis hijacks it
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, 800);
}
