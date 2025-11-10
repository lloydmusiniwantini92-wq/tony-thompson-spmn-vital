import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

/* 🧩 Add DeviceProvider for low-end detection */
import { DeviceProvider } from "./context/DeviceContext.jsx";

/* ✅ Universal GitHub Pages SPA Redirect Fix */
if (window.location.search.startsWith("?redirect=")) {
    const redirect = decodeURIComponent(
        window.location.search.replace("?redirect=", "")
    );
    window.history.replaceState(null, "", redirect);
}

/* 🩵 Scroll reset before React mounts */
window.scrollTo(0, 0);
document.body.style.overflow = "visible";
document.documentElement.style.overflow = "visible";
document.body.style.height = "auto";
document.documentElement.style.height = "auto";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <DeviceProvider>
                <App />
            </DeviceProvider>
        </BrowserRouter>
    </React.StrictMode>
);
