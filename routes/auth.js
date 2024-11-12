const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already in use" });

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Registration failed", "message": error});
    }
});

// Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });
        
        res.cookie("jwt", token, { httpOnly: true, secure: false });
        res.json({ message: "Logged in successfully", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

// Logout route
router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.json({ message: "Logged out successfully" });
});

// Protected route example
router.get("/protected", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({ message: "You have access to this protected route", user: req.user });
});

module.exports = router;
