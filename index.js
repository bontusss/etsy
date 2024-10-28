const mongoose = require("mongoose");
const express = require("express");
const PORT = 2500;
const app = express();

app.get("/", (req, res) => {
  res.send("Helllo world");
});

// Connect mongodb
// mongoose
//   .connect("mongodb+srv://etsy:etsy2024@cluster0.vvdwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//   .then(() => console.log("Connected!"));
mongoose
    .connect("mongodb+srv://Jobvista:jobvista2024@jobvista.0vecs.mongodb.net/?retryWrites=true&w=majority&appName=Jobvista")
    .then(() =>console.log("you are connected to database"));


const schema = mongoose.Schema
const objectID = schema.ObjectId

const Post = new schema({
    id: objectID,
    content: {type: String, max: 100},
    productName: String,
    created_at: Date
})

app.post('/items', (req, res) =>{
  const newItem = new Item(req.body);

  newItem.save()
    .then(item => res.status(201).json(item))
    .catch(err => res.status(400).json({errorMessage:err.message}))
});

const connectdb = async (req, res) =>{
  try {
    await mongoose.connect("mongodb+srv://Jobvista:jobvista2024@jobvista.0vecs.mongodb.net/?retryWrites=true&w=majority&appName=Jobvista")
    console.log("you are connected to database")
  } catch (err){
    console.log(err)
  }
}

// Start the node
app.listen(PORT, () => {
  console.log(`Welcome to the Etsy developer API, The Service is running on ${PORT}`);
});

connectdb();