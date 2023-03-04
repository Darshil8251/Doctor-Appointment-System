const userModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const connection = require("../config/db");
const main = require("../Models/userModel");

const JWT = require("jsonwebtoken");

// login controller
const LoginController = async (req, resp) => {
  try {
    const data = await connection();
    const user= await userModel.findOne({ Email: req.body.Email });
    if (!user) {
      return resp
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch =  bcrypt.compare(req.body.Password, user.Password);
    if (!isMatch) {
      return resp
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    else{

      const token = JWT.sign({id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      resp.status(200).send({ message: "Login Success", success: true, token });
    }
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: `Error occured${error.message}` });
  }
};

// Register Controller
const RegisterController = async (req, resp) => {
  const data = await connection();
  console.log(req.body.Email);
  try {
    const existingUser = await userModel.findOne({ Email: req.body.Email });
    if (existingUser) {
      return resp
        .status(200)
        .send({ message: "User Already register", succuss: false });
    } else {
      const Password = req.body.Password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Password, salt);
      req.body.Password = hashedPassword;
      const newUser = new userModel(req.body);
      await newUser.save();
      // data.insertOne(req.body);
      resp
        .status(200)
        .send({ message: "User Register Sucessfully", succuss: true });
    }
  } catch (error) {
    console.log(error);
    resp.status(500).send({ succuss: false, message: error.message });
  }
};

// Use for authetication

// const authController = async (req, res) => {
//   try {
//     const user = await userModel.findById({ _id: req.body.userId });
//     console.log(req.body.userId);
//      console.log(user);
//     user.Password=undefined;
//     if (!user) {
//       res.status(200).send({
//         message: "User Not found",
//         succuss: false,
//       });
//     } else {
//       res.status(200).send({
//         succuss: true,
//         data: {
//           succuss:true,
//           data:user,
//         },
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "auth error",
//       succuss: false,
//     });
//   }
// };


const authController = async (req, res) => {
  console.log("authetication function called");
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.Password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};


module.exports = { LoginController, RegisterController, authController };
