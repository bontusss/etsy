const mongoose = require("mongoose");
require('dotenv').config();
const app = require("./app");

const PORT = process.env.PORT || 5000;
const dbUrl = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose.connect(dbUrl, {

})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));





// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
