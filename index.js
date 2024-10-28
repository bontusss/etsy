const mongoose = require("mongoose");
const express = require("express");
const PORT = 2500

const app = express();

app.get("/", (req, res) => {
  res.send("Helllo world");
});

// Connect mongodb
mongoose
  .connect("mongodb+srv://oduwos:wisedaniel@cluster0.2l9nrub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected!"));


const schema = mongoose.Schema
const objectID = schema.ObjectId

const Post = new schema({
    id: objectID,
    content: {type: String, max: 100},
    productName: String,
    created_at: Date
})

// Route for saving data
app.post('/items', (req, res) => {
  const newItem = new Item(req.body);
  
  newItem.save()
      .then(item => res.status(201).json(item))
      .catch(err => res.status(400).json({ errorMessage : err.message }));
});


// Start the node
app.listen(PORT, () => {
  console.log(`Welcome to the Etsy developer API, The Service is running on ${PORT}`);
});
