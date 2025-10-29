// ✅ src/pages/Go.jsx — Redirect bridge for Constant Contact short links
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Go() {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract ?plan from query string
    const query = new URLSearchParams(location.search);
    const plan = query.get("plan") || "community";

    useEffect(() => {
        // Redirect immediately to the thank-you page with same plan parameter
        navigate(`/thank-you?plan=${plan}`, { replace: true });
    }, [navigate, plan]);

    // Optional: fallback text for slow connections
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white text-lg">
            Redirecting you to your thank you page...
        </div>
    );
}
