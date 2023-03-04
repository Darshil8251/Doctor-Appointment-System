const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');

//dotenv conig
dotenv.config();

//mongodb connection


//rest obejct
const app = express();

//middlewares
app.use(express.json());
app.use(moragan("dev"));
app.use(cors());
//routes
app.use("/api/v1/user", require("./routes/userRouter"));

//port

//listen port
app.listen(4000)
