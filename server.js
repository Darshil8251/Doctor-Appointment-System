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
//It is for user
app.use("/api/v1/user", require("./routes/userRouter"));


// it is for admin
app.use('/api/v1/admin',require('./routes/adminRoutes'));


//listen port
app.listen(4000)
