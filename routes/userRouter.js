const express= require('express');
const { LoginController, RegisterController, authController } = require('../controllers/userctrl');
const authmiddleware = require('../Middleware/authmiddleware');

const router=express.Router();


// Login Routes
router.post("/login",LoginController);

// Register Routes

router.post("/register",RegisterController);

//Auth || post

router.post("/GetUsetData",authmiddleware,authController)

module.exports=router;