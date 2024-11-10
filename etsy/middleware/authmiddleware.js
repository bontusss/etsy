// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret"; // Make sure to replace this with your actual secret key

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

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

module.exports = authMiddleware;
