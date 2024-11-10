// const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret"; // Replace with your own secret




// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};







