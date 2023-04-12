const {
  rawListeners,
} = require("../../models/AllocatedShift/allocatedShiftModel");
const Shift = require("../../models/AllocatedShift/allocatedShiftModel");
const User = require("../../models/user/userModel");
const axios = require("axios");
require("dotenv").config();
exports.addShift = async (req, res) => {
  const shift = new Shift({
    user_id: req.body.user_id,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    monday: req.body.monday,
    tuesday: req.body.tuesday,
    wednesday: req.body.wednesday,
    thursday: req.body.thursday,
    friday: req.body.friday,
    saturday: req.body.saturday,
    sunday: req.body.sunday,
  });
  try {
    const newShift = await shift.save();
    const user = await User.findOne({ _id: req.body.user_id });
    console.log("++++++++++++++++++++++++++++++++++++++");
    console.log(user.email);
    axios.post(
      process.env.API_GATEWAY_URL ||
        "https://40e3pgta0h.execute-api.us-east-1.amazonaws.com/dev" +
          "/SendMailShiftSync",
      {
        to: user.email,
        subject: `New Shift Added to Your Schedule`,
        message: `Dear ${user.name},
      
      I am writing to inform you that a new shift has been added to your schedule on our Shift-Sync application. The details of your new shift are as follows:

      Shift Date: ${req.body.startDate}
      Shift Start-Time: ${req.body.monday.startTime} 
      Shift End-Time: ${req.body.monday.endTime} 
      Shift Role: ${user.Position}

      Please ensure that you have reviewed the details of this shift and make any necessary arrangements. If you are unable to work this shift, please notify your manager or use the time off request feature on our web application as soon as possible.

      If you have any questions or concerns regarding this shift or any other shift on your schedule, please do not hesitate to contact your manager or our customer support team at ShitSync@gmail.com.

      Thank you for using our Shift-Sync application. We strive to make shift management easier and more efficient for you.

      Best regards,

      Shift-Sync`,
      }
    );
    res.status(201).json(newShift);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllShift = async (req, res) => {
  try {
    const allShift = await Shift.find();
    if (allShift !== null) {
      res
        .status(200)
        .json({ success: true, message: "all employee shift", allShift });
    } else {
      res.status(400).json({ success: false, message: "Shift not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getLatestShifts = async (req, res) => {
  try {
    const userList = await User.find({}).select("name email profilePicture");

    let latestShifts = await Shift.aggregate([
      {
        $sort: { endDate: -1 }, // Sort the shifts by endDate in descending order
      },
      {
        $group: { _id: "$user_id", shift: { $first: "$$ROOT" } }, // Group shifts by user_id and return only the latest shift for each user
      },
      {
        $replaceRoot: { newRoot: "$shift" }, // Replace the root document with the latest shift for each user
      },
    ]);

    if (latestShifts.length > 0) {
      res.status(200).json({
        success: true,
        message: "Latest shifts for all users",
        latestShifts,
        userList,
      });
    } else {
      res.status(404).json({ success: false, message: "Shifts not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getShift = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);
    res.status(200).json(shift);
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

exports.deleteShift = async (req, res) => {
  try {
    shift = await Shift.deleteMany({ user_id: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "Shift Deleted successfully" });
  } catch (err) {
    console.log(err.message);
  }
};

exports.updateShift = async (req, res) => {
  const updatedShift = {
    monday: req.body.monday,
    tuesday: req.body.tuesday,
    wednesday: req.body.wednesday,
    thursday: req.body.thursday,
    friday: req.body.friday,
    saturday: req.body.saturday,
    sunday: req.body.sunday,
  };
  console.log(req.params.id);
  try {
    const shift = await Shift.findByIdAndUpdate(req.params.id, updatedShift);
    shift.save();
    res.status(200).json({
      success: true,
      message: "Shift updated successfully!! :)",
      shift,
    });
  } catch (err) {
    res.status(500).json({ message: false, message: "Something Went Wrong!!" });
  }
};
