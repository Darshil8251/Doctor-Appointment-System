const doctorModel = require("../Models/doctorModels");
const userModel = require("../Models/userModel");
const appointmentModels = require("../Models/appointmentModels");
const { use } = require("../routes/doctorRoutes");

const getDoctorInfoController = async (req, resp) => {
  try {
    const doctor = await doctorModel.findOne({ userID: req.body.userId });
    resp.status(200).send({
      success: true,
      message: "Doctor Data fetch successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Failed to fetch doctor detail",
      error,
    });
  }
};

const updateProfile = async (req, resp) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userID: req.body.userId },
      req.body
    );
    resp.status(200).send({
      success: true,
      message: "Updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    resp.send(500).send({
      success: false,
      message: "Soory failed to edit profile",
      error,
    });
  }
};

// GET SINGLE DOCTOR

const getDoctorByIdController = async (req, resp) => {
  console.log("getdoctor by id called");
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    resp.status(200).send({
      success: true,
      message: "Single Doctor Info fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      error,
      message: "Error in single Doctor",
    });
  }
};

const doctorAppoinementController = async (req, resp) => {
  try {
    const doctor = await doctorModel.findOne({ userID: req.body.userId });
    const appointments = await appointmentModels.find({ doctorId: doctor._id });
    resp.status(200).send({
      success: true,
      message: "Doctor Appointment Fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error In Fetching Appointment",
    });
  }
};

const updateStatusController = async (req, resp) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModels.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    resp.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error In Update status",
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfile,
  getDoctorByIdController,
  doctorAppoinementController,
  updateStatusController,
};
