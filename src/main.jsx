// ✅ src/main.jsx — production setup
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx"; // 👈 back to optimized App (with Lenis)
import TestimonialDetail from "./pages/TestimonialDetail.jsx";
import AboutTony from "./pages/AboutTony.jsx";
import { QuizOverlayProvider } from "./context/QuizOverlayContext.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <QuizOverlayProvider>
            <Routes>
                {/* Main multi-section landing page */}
                <Route path="/*" element={<App />} />

                {/* Cinematic About Tony page */}
                <Route path="/about-tony" element={<AboutTony />} />

                {/* Individual Testimonial detail route */}
                <Route path="/testimonials/:id" element={<TestimonialDetail />} />
            </Routes>
        </QuizOverlayProvider>
    </BrowserRouter>
);
