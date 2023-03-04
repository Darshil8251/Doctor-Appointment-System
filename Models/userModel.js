const mongoose = require("mongoose");
const connection = require("../config/db");



  const userSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
    isAdmin:{
      type:Boolean,
      default:false
    },
    isDoctor:{
      type:Boolean,
      default:false
    },
    notification:{
      type:Array,
      default:[],
    },
    seenNotification:{
      type:Array,
      default:[]
    }
  });
  
  const userModel = mongoose.model("User", userSchema);


module.exports = userModel;
