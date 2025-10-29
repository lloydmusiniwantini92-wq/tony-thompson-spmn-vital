import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// 🩵 Scroll reset before React mounts
window.scrollTo(0, 0);
document.body.style.overflow = "visible";
document.documentElement.style.overflow = "visible";
document.body.style.height = "auto";
document.documentElement.style.height = "auto";

root.render(
    <React.StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
