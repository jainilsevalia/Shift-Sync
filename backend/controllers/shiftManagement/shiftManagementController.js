const {
  rawListeners,
} = require("../../models/AllocatedShift/allocatedShiftModel");
const Shift = require("../../models/AllocatedShift/allocatedShiftModel");

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
