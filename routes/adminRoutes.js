const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
 changeAccountStatusController,
 
} = require("../controllers/adminctrl");
const authMiddleware = require("../Middleware/authmiddleware");
const router=express.Router();

// GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOS || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// POST METHOD
router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController)

module.exports = router;
