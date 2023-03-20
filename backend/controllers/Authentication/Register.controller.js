const User = require("../../models/user/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, PIN, Position, role } = req.body;

    if (!(name && email && PIN && Position && role)) {
      res.status(400).json({ message: "All inputs are required" });
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      res.status(409).json({ message: "User already exist!! Please Login" });
    }

    encryptedPassword = await bcrypt.hash(PIN, 10);

    const user = User.create({
      name,
      email: email.toLowerCase(),
      PIN: encryptedPassword,
      Position,
      role,
    });

    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    user.token = token;

    res.status(201).json({ user, message: `${name} registerd Successfully` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
