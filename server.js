const express = require('express');
const connection = require('./config/db');
const { RegisterController, LoginController } = require('./controllers/userctrl');
const cors = require('cors');

const app=express();
app.use(express.json());
// it is use for wentoken generation 
require("dotenv").config();
// use for solving cors error 
app.use(cors());

app.use("/api/v1/user", require("./routes/userRouter"));

app.listen(4000);