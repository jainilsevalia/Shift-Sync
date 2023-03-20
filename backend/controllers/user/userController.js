const User = require("../../models/user/userModel");

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.user.user_id);
    if (user == null) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.user.user_id);
    if (user == null) {
      res.status(404).json({ message: "User not found" });
    } else {
      await User.findByIdAndRemove(req.params.id);
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.editUser = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.user.user_id);
    if (user == null) {
      res.status(404).json({ message: "User not found" });
    } else {
      if (req.body.name != null) {
        user.name = req.body.name;
      }
      if (req.body.email != null) {
        user.email = req.body.email;
      }
      if (req.body.PIN != null) {
        user.PIN = req.body.PIN;
      }
      if (req.body.Position != null) {
        user.Position = req.body.Position;
      }
      try {
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
