import React from "react";

export default function ScrollFog() {
    return (
        <div
            className="fixed inset-0 pointer-events-none z-[10]"
            style={{
                background:
                    "radial-gradient(ellipse at bottom, rgba(155,38,182,0.14) 0%, transparent 70%)",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
            }}
        />
    );
}
