// server.js
import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use your Stripe SANDBOX Secret key
const stripe = new Stripe("sk_test_51SLRY52NRAQRhNmZjf9ErVU6EEKmmkR53xvRp7gJMblUHWtlc67do2FF5JKC9wdjX77ElT2tR52HgWZzYfTuP4UO00f0xGkDva", {
    apiVersion: "2024-06-20",
});

app.post("/create-checkout-session", async (req, res) => {
    try {
        const { priceId } = req.body;

        const session = await stripe.checkout.sessions.create({
            mode: "subscription", // or "payment"
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: "http://localhost:5173/thank-you",
            cancel_url: "http://localhost:5173/tiers",
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("❌ Stripe error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.listen(4242, () => console.log("✅ Stripe sandbox running on http://localhost:4242"));
