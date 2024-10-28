const mongoose = require("mongoose");
const express = require("express");
const PORT = 2500

const app = express();

app.get("/", (req, res) => {
  res.send("Helllo world");
});

// Connect mongodb
mongoose
  .connect("mongodb+srv://etsy:etsy2024@cluster0.vvdwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected!"));


const schema = mongoose.Schema
const objectID = schema.ObjectId

const Post = new schema({
    id: objectID,
    content: {type: String, max: 100},
    productName: String,
    created_at: Date
})

// Start the node
app.listen(PORT, () => {
  console.log(`Welcome to the Etsy developer API, The Service is running on ${PORT}`);
});
