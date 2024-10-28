const mongoose = require("mongoose");
const express = require("express");
const PORT = 3000

const app = express();

app.get("/", (req, res) => {
  res.send("Helllo world");
});

// Connect mongodb
mongoose
  .connect("mongodb+srv://collinsnote378:collinsnote378@cluster0.g7coj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected!"));


const schema = mongoose.Schema
const objectID = schema.ObjectId

const Post = new schema({
    id: objectID,
    content: {type: String, max: 100},
    productName: String,
    created_at: Date
})

app.post('/item', (req, res) => {
    const newItem = new item(req.body)

    newItem.save()
    .then(itew => res.status(201).json(item))
    .catch(err => res.status(400).json({ errorMessages : err.messages}))
})


// Start the node
app.listen(PORT, () => {
  console.log(`Welcome to the Etsy developer API, The Service is running on ${PORT}`);
});