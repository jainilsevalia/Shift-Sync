const User = require("../../models/user/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, PIN } = req.body;
    const user = await User.findOne({ email });
    if (!(email && PIN)) {
      res.status(400).json({ message: "All inputs are required" });
    } else if (user && (await bcrypt.compare(PIN, user.PIN))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );
      user.token = token;
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: process.env.TOKEN_AGE_IN_DAYS * 24 * 60 * 60 * 1000,
        sameSite: "lax",
      });
      res.status(200).json({ user, message: "Login successful" });
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
