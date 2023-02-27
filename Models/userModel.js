const mongoose = require("mongoose");
const connection = require("../config/db");



  // await connection();
  const userSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
  });

  const userModel = mongoose.model("User", userSchema);


module.exports =userModel;