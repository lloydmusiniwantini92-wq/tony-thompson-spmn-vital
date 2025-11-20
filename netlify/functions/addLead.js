// netlify/functions/addLead.js

export const handler = async (event) => {
    try {
        const { email, firstName, lastName, tier, listId } = JSON.parse(event.body);

        if (!email || !listId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing email or listId" }),
            };
        }

        const ACCESS_TOKEN = process.env.CONSTANT_CONTACT_ACCESS_TOKEN;
        const API_KEY = process.env.CONSTANT_CONTACT_API_KEY;

        if (!ACCESS_TOKEN || !API_KEY) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Missing API credentials" }),
            };
        }

        const url = "https://api.cc.email/v3/contacts";

        const payload = {
            email_address: { address: email },
            first_name: firstName || "",
            last_name: lastName || "",
            create_source: "Account",
            update_source: "Account",
            list_memberships: [listId],
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const raw = await response.text();
        let data = {};
        try {
            data = JSON.parse(raw);
        } catch { }

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({
                    error: "Constant Contact returned an error",
                    details: data,
                }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: "Lead captured successfully",
                data,
            }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server error", details: err.message }),
        };
    }
};
