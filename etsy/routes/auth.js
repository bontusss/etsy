// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware"); // Import the middleware


const router = express.Router();
const JWT_SECRET = "your_jwt_secret"; // Replace with your own secret


// Public Route
router.get('/', (req, res) =>{
    res.send('Welcome to the home page. Go to the registration')
})


// Registration route
router.post(
    "/register",
    [
        check("email", "Please provide a valid email").isEmail(),
        check("password", "Password must be at least 6 characters").isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "User already exists" });
            }

            user = new User({ fullName, email, password });
            await user.save();

            res.status(201).json({ msg: "User registered successfully" });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");
        }
    }
);

// Login route
router.post(
    "/login",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
            res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
            res.json({ msg: "Logged in successfully" });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");
        }
    }
);

// Logout route
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ msg: "Logged out successfully" });
});

// Protected route example: Get user profile
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        // Find the user based on the userId stored in req.user by the middleware
        const user = await User.findById(req.user).select("-password"); // Exclude password field
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});
module.exports = router;
