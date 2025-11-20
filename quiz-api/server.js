import express from "express";
import axios from "axios";
import cors from "cors";
import * as dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let API_KEY = process.env.API_KEY;
let CLIENT_SECRET = process.env.CLIENT_SECRET;
let REFRESH_TOKEN = process.env.REFRESH_TOKEN;   // will get auto-updated
const LIST_ID = process.env.LIST_ID;
const PORT = process.env.PORT || 3002;

// ===============================
//  SAVE UPDATED REFRESH TOKEN
// ===============================
function saveRefreshToken(newToken) {
    REFRESH_TOKEN = newToken;
    const envFile = [
        `API_KEY=${API_KEY}`,
        `CLIENT_SECRET=${CLIENT_SECRET}`,
        `REFRESH_TOKEN=${REFRESH_TOKEN}`,
        `LIST_ID=${LIST_ID}`,
        `PORT=${PORT}`
    ].join("\n");

    fs.writeFileSync(".env", envFile, "utf8");
    console.log("🔄 Refresh token updated & saved to .env");
}

// ===============================
//  GET ACCESS TOKEN USING REFRESH
// ===============================
async function getAccessToken() {
    try {
        const res = await axios.post(
            "https://authz.constantcontact.com/oauth2/default/v1/token",
            new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: REFRESH_TOKEN,
                client_id: API_KEY,
                client_secret: CLIENT_SECRET
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        // If a new refresh token is issued — SAVE IT
        if (res.data.refresh_token) {
            saveRefreshToken(res.data.refresh_token);
        }

        return res.data.access_token;
    } catch (err) {
        console.error("❌ TOKEN REFRESH FAILED:", err.response?.data || err);
        throw err;
    }
}

// ===============================
//  ADD CONTACT ENDPOINT
// ===============================
app.post("/add-contact", async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    try {
        const accessToken = await getAccessToken();

        const payload = {
            email_address: { address: email },
            first_name: name,
            phone_numbers: [{ phone_number: phone }],
            list_memberships: [LIST_ID]
        };

        const ccRes = await axios.post(
            "https://api.cc.email/v3/contacts/sign_up_form",
            payload,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        console.log("✅ Contact Added:", ccRes.data);

        return res.json({ success: true });
    } catch (err) {
        console.error("❌ Error adding contact:", err.response?.data || err);
        return res.status(500).json({ error: "Failed to add contact" });
    }
});

// ===============================
//  START SERVER
// ===============================
app.listen(PORT, () => {
    console.log(`🚀 Constant Contact backend live at http://localhost:${PORT}`);
});
