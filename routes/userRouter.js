const express = require("express");
const {
    LoginController,
  RegisterController,
  authController,
} = require("../controllers/userctrl");
const authMiddleware = require("../Middleware/authmiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", LoginController);

//REGISTER || POST
router.post("/register",RegisterController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);
module.exports = router;