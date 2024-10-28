const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser"); // Import body-parser
const PORT = 2500;

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb+srv://Trimax:admin@trimaxcluster.j23ii.mongodb.net/?retryWrites=true&w=majority&appName=TrimaxCluster");
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }
}

connectToDatabase();

const schema = mongoose.Schema;
const objectID = schema.ObjectId;

const postSchema = new schema({
  id: objectID,
  content: { type: String, max: 100 },
  productName: String,
  created_at: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// Define a route to save data
app.post("/add-post", async (req, res) => {
  const { content, productName } = req.body;

  try {
    const newPost = new Post({ content, productName });
    await newPost.save();
    res.status(201).send("Post saved successfully!");
  } catch (error) {
    console.error("Error saving post:", error.message);
    res.status(500).send("Failed to save the post.");
  }
});

// Start the node server
app.listen(PORT, () => {
  console.log(`Welcome to the Etsy developer API, The Service is running on ${PORT}`);
});
