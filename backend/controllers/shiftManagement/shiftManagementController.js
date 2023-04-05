const {
  rawListeners,
} = require("../../models/AllocatedShift/allocatedShiftModel");
const Shift = require("../../models/AllocatedShift/allocatedShiftModel");
const User = require("../../models/user/userModel");
exports.addShift = async (req, res) => {
  const shift = new Shift({
    user_id: req.user.user_id,
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
    const userList = await User.find({}).select("name email");

    const latestShifts = await Shift.aggregate([
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
    shift = await Shift.find({
      user_id: req.user.user_id,
      startDate: "2021-06-20T14:10:30.000Z",
      endDate: "2021-06-27T14:10:30.000Z",
    });
    res.status(200).json(shift);
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

exports.updateShift = async (req, res) => {
  try {
  } catch (err) {}
};
