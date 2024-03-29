const express = require("express");
const { 
    getDoctorInfoController,
    updateProfile,
    getDoctorByIdController,  
    doctorAppoinementController,
    updateStatusController

} = require("../controllers/doctorctrl");
const authMiddleware  = require("../Middleware/authmiddleware");

const routes = express.Router();

// POST FETCH DOCTOR INFO
routes.post('/getDoctorInfo',authMiddleware,getDoctorInfoController);

// POST UPDATE PROFIL

routes.post('/updateProfile',authMiddleware,updateProfile);

//POST GET SINGLE DOCTOR

routes.post('/getDoctorById',authMiddleware,getDoctorByIdController);


// GET DOC APPOINTMENT
routes.get('/doctor-appointment',authMiddleware,doctorAppoinementController);

// Update appointment status

routes.post('/update-status',authMiddleware,updateStatusController);


module.exports = routes;
