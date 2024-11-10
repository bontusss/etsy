// server.js
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser"); // Import cookie-parser

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cookieParser()); // To parse cookies

// Routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
