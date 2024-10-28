const mongoose = require("mongoose");
const express = require("express");
const PORT = 2500

const app = express();

app.get("/", (req, res) => {
  res.send("Helllo world");
});

// Connect mongodb
const connectedb = async (req, res) => {
  try{
    await mongoose.connect("mongodb+srv://weather-api:weatherapi2024@cluster0.9orjr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("you are connected to database")
  } catch (err){
    console.log(err)
  }
}


const user_data = new mongoose.Schema({
  firstname: {type:String, required:true},
  lastname:{type:String, required:true},
  age:{type:Number, required:true}
})
const user = mongoose.model("user_data", user_data)

const save_user = new user({
  firstname: "elvis",
  lastname: "david",
  age: 30
})

save_user.save()
.then(()=> {
  console.log("saved successfully")
})
.catch((err)=> {
  console.log(err)
})

connectedb()
// Start the node
app.listen(PORT, () => {
  console.log(`Welcome to the Etsy developer API, The Service is running on ${PORT}`);
});
