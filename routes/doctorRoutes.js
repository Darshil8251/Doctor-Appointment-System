const express = require("express");
const { 
    getDoctorInfoController,
    updateProfile,  

} = require("../controllers/doctorctrl");
const authMiddleware  = require("../Middleware/authmiddleware");

const routes = express.Router();

// POST FETCH DOCTOR INFO
routes.post('/getDoctorInfo',authMiddleware,getDoctorInfoController);

// POST UPDATE PROFIL

routes.post('/updateProfile',authMiddleware,updateProfile);



module.exports = routes;
