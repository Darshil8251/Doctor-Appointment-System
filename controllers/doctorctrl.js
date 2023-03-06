const doctorModel = require("../Models/doctorModels");
const userModel = require("../Models/userModel");

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

module.exports = { getDoctorInfoController, updateProfile };
