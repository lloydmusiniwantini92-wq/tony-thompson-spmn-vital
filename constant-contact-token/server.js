import express from "express";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const API_KEY = process.env.API_KEY;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PORT = process.env.PORT || 3001;

/* ----------------------------------------------------------------------------
   STEP 1 — Redirect user to Constant Contact Authorization Page
---------------------------------------------------------------------------- */

app.get('/auth', (req, res) => {
    const redirectUri = "http://localhost:" + PORT + "/callback";

    // Generate random state value
    const state = Math.random().toString(36).substring(2);

    const url =
        `https://authz.constantcontact.com/oauth2/default/v1/authorize?` +
        `client_id=${API_KEY}` +
        `&redirect_uri=${redirectUri}` +
        `&response_type=code` +
        `&scope=contact_data offline_access` +
        `&state=${state}`;

    res.redirect(url);
});


/* ----------------------------------------------------------------------------
   STEP 2 — Exchange ?code=xxxx for a refresh token
---------------------------------------------------------------------------- */
app.get("/callback", async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.send("<h3>No authorization code received.</h3>");
    }

    try {
        const redirectUri = `http://localhost:${PORT}/callback`;

        const payload = new URLSearchParams({
            grant_type: "authorization_code",
            client_id: API_KEY,
            client_secret: CLIENT_SECRET,
            redirect_uri: redirectUri,
            code
        });

        const tokenRes = await axios.post(
            "https://authz.constantcontact.com/oauth2/default/v1/token",
            payload,
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
        );

        const refreshToken = tokenRes.data.refresh_token;

        res.send(`
            <h2 style="font-family:Arial">REFRESH TOKEN GENERATED ✔️</h2>
            <p><b>Copy this and save it somewhere safe:</b></p>
            <textarea style="width:500px;height:120px">${refreshToken}</textarea>
        `);
    } catch (err) {
        console.error(err.response?.data || err);
        res.send("<h3>Error exchanging code for tokens.</h3>");
    }
});

/* ----------------------------------------------------------------------------
   START SERVER
---------------------------------------------------------------------------- */
app.listen(PORT, () => {
    console.log(`Token generator running at: http://localhost:${PORT}/auth`);
});
