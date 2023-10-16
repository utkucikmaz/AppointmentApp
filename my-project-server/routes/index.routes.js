const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID =
    "759266247632-j6nk02r1jr5b6l07bpeic4prdcn2fd7j.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = [
    "http://localhost",
    "https://localhost",
    "http://localhost:5173/",
    "https://localhost:5173/",
    "http://localhost:5005",
    "https://localhost:5005",
];

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline", // This allows you to get a refresh token
    scope: ["https://www.googleapis.com/auth/calendar.readonly"], // Adjust the scope based on your needs
});
console.log("Authorize this app by visiting this URL:", authUrl);

router.get("/", (req, res, next) => {
    async function listCalendars() {
        const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
        const res = await calendar.calendarList.list();
        console.log(res.data);
    }

    // Call the function to list calendars
    listCalendars();
});

module.exports = router;
