const mongoose = require("mongoose");
const express = require("express");
const PORT = 2500

const app = express();

app.get("/", (req, res) => {
  res.send("Helllo world");
});

// Connect mongodb
const dbconnect = async () => {
  try{
    await mongoose.connect("mongodb+srv://TodoApi:promzee2024@cluster0.ntqfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("you are connected to db")
  } catch (err){
    console.error(err)
  }
}

const user = new mongoose.Schema({
  firstname:{type:String, required:true},
  age:{type:Number, required:true}
})

const usersinfo = mongoose.model("user", user);

const user_data = new usersinfo({
  firstname: "promise",
  age: "40"
})

user_data.save()
.then(()=> {
   console.log("saved succeffully")
}) 
.catch((err)=>{
  console.log(err)
})


dbconnect()

// Start the node
app.listen(PORT, () => {
  console.log(`Welcome to the Etsy developer API, The Service is running on ${PORT}`);
});
