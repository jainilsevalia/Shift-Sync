const User = require("../../models/user/userModel");
const jwr = require("jsonwebtoken");

exports.logout = async (req, res) => {
  try {
    user = await User.findById(req.user.user_id);
    if (user == null) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.clearCookie("token");
      res.status(200).json({ message: "Logout Successful" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
