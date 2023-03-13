const userModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const connection = require("../config/db");
const main = require("../Models/userModel");
const doctorModel = require("../Models/doctorModels");

const JWT = require("jsonwebtoken");
const appoinementModel = require("../Models/appointmentModels");
const { use } = require("../routes/userRouter");
const moment = require("moment");

// login controller
const LoginController = async (req, resp) => {
  try {
    const data = await connection();
    const user = await userModel.findOne({ Email: req.body.Email });
    if (!user) {
      return resp
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = bcrypt.compare(req.body.Password, user.Password);
    if (!isMatch) {
      return resp
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    } else {
      const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
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

// it is use for authetication
const authController = async (req, res) => {
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

// it use for doctor controller

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({
      ...req.body,
      status: "pending",
      userID: req.body.userId,
    });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;

    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/docotrs",
      },
    });
    console.log(adminUser.Name);
    console.log(adminUser.notification);
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    console.log(adminUser.notification);
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};

const getAllNotificationController = async (req, resp) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    const updateUser = await user.save();
    resp.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error in notification",
    });
  }
};

const deleteAllNotificationController = async (req, resp) => {
  console.log("delete all notification called");
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updateUser = await user.save();
    updateUser.Password = undefined;
    resp.status(200).send({
      success: true,
      message: "Notification Deleted Successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Unable to delete all notification",
    });
  }
};

// GET ALL DOC

const getAllDoctorsController = async (req, resp) => {
  try {
    const doctor = await doctorModel.find({ status: "approved" });
    resp.status(200).send({
      success: true,
      message: "Successfully Fetch Data",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Failed to fetch",
      error,
    });
  }
};

// It is use for book appointment
const bookAppointment = async (req, resp) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appoinementModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userID });
    user.notification.push({
      type: "New-appointment-request",
      message: ` A nEw Appointment Request from ${req.body.userId.name}`,
      onClickPath: "/user/appointment",
    });
    await user.save();
    resp.status(200).send({
      success: true,
      message: "Appointment Book Successfully",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error while Booking Appoinement",
      error,
    });
  }
};

// CHECK AVAILABILITY OF DOCTOR

const bookingAvailabilityController = async (req, resp) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    console.log(toTime);
    console.log();
    const appointment = await appoinementModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    console.log(appointment);
    if (appointment.length == 0) {
      return resp.status(200).send({
        success: true,
        message: "Slot Is Available",
      });
    } else {
      return resp.status(200).send({
        success: false,
        message: "Sorry Slot Is not Available",
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error In check Availability",
      error,
    });
  }
};

const userAppointmentController = async (req, resp) => {
  try {
    const appointment = await appoinementModel.find({
      userId: req.body.userId,
    });
    resp.status(200).send({
      success: true,
      message: "User Appointment Fetch Successfully",
      data: appointment,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error In User Appointment",
      error,
    });
  }
};
module.exports = {
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
};
