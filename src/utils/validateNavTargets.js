// ⭐ validateNavTargets.js
// Validates that nav links like #about, #programs, etc. have matching DOM elements.

export function validateNavTargets(navItems) {
    if (process.env.NODE_ENV === "production") return;

    const missing = [];

    navItems.forEach(item => {
        if (!item.link.startsWith("#")) return; // only validate anchors

        const clean = item.link.replace("#", "").trim();
        const el = document.getElementById(clean);

        if (!el) {
            missing.push({
                label: item.label,
                target: clean,
                link: item.link
            });
        }
    });

    if (missing.length > 0) {
        console.warn(
            "%c⚠ Missing Navigation Targets Detected!",
            "color: #ff4444; font-size: 16px; font-weight: bold;"
        );

        missing.forEach(m => {
            console.log(
                `%c• ${m.label} → Expected #${m.target}, but no element exists.`,
                "color: #ff8888; font-size: 13px;"
            );
        });

        showNavValidatorOverlay(missing);
    }
}

// ⭐ Optional: Dev overlay on screen
function showNavValidatorOverlay(missing) {
    const existing = document.getElementById("nav-validator");
    if (existing) existing.remove();

    const box = document.createElement("div");
    box.id = "nav-validator";
    box.style.position = "fixed";
    box.style.bottom = "20px";
    box.style.right = "20px";
    box.style.zIndex = "999999999";
    box.style.padding = "18px 22px";
    box.style.borderRadius = "10px";
    box.style.background = "rgba(200,0,50,0.9)";
    box.style.color = "white";
    box.style.fontSize = "14px";
    box.style.fontWeight = "600";
    box.style.boxShadow = "0 0 20px rgba(0,0,0,0.45)";
    box.style.backdropFilter = "blur(6px)";
    box.style.maxWidth = "260px";

    const title = document.createElement("div");
    title.innerText = "⚠ Missing Scroll Targets:";
    title.style.marginBottom = "8px";
    title.style.fontSize = "15px";
    title.style.fontWeight = "700";
    box.appendChild(title);

    missing.forEach(m => {
        const line = document.createElement("div");
        line.innerText = `${m.label} → #${m.target}`;
        line.style.marginBottom = "5px";
        box.appendChild(line);
    });

    const close = document.createElement("div");
    close.innerText = "Dismiss";
    close.style.marginTop = "10px";
    close.style.cursor = "pointer";
    close.style.opacity = "0.8";
    close.style.fontSize = "13px";

    close.onclick = () => box.remove();

    box.appendChild(close);
    document.body.appendChild(box);
}
