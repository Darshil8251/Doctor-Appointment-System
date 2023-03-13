const express = require("express");
const {
  LoginController,
  RegisterController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointment,
  bookingAvailabilityController,
  userAppointmentController,
} = require("../controllers/userctrl");
const authMiddleware = require("../Middleware/authmiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", LoginController);

//REGISTER || POST
router.post("/register", RegisterController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

// Apply doctor
router.post("/apply-doctor",authMiddleware, applyDoctorController);

// Notification Doctor || POST
router.post("/get-all-notification",authMiddleware,getAllNotificationController);

// delete all notification Doctor || POST
router.post("/delete-all-notification",authMiddleware,deleteAllNotificationController);


// GET ALL DOC
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController);


// POST BOOKE APPOINTMENT
router.post('/book-appointment',authMiddleware,bookAppointment);

//POST BOOKING AVAILIBILITY
router.post('/booking-availability',authMiddleware,bookingAvailabilityController);

// Appointment List
router.get('/user-appointment',authMiddleware,userAppointmentController);


module.exports = router;
