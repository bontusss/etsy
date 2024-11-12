const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");

const authRoutes = require("./routes/auth");
require("./config/passport")(passport);

const app = express();

// Middleware
app.use(express.json());
app.use(cookieSession({
    name: "session",
    keys: ["your_secret_key"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Passport middleware
app.use(passport.initialize());

// Routes
app.use("/auth", authRoutes);

module.exports = app;
