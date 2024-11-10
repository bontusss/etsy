// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Jobvista:jobvista2024@jobvista.0vecs.mongodb.net/?retryWrites=true&w=majority&appName=Jobvista"); // No need for useNewUrlParser or useUnifiedTopology
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
