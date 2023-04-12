const User = require("../../models/user/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { awsSecret } = require("../../constants/getAwsSecrets");

exports.login = async (req, res) => {
  try {
    let tokenKey;
    let tokenAge;
    awsSecret().then((data) => {
      tokenKey = JSON.parse(data).TOKEN_KEY;
      console.log("//////////////////////////////");
      console.log(tokenKey);
      tokenAge = JSON.parse(data).TOKEN_AGE_IN_DAYS;
    });
    const { email, PIN } = req.body;
    const user = await User.findOne({ email });
    if (!(email && PIN)) {
      res.status(400).json({ message: "All inputs are required" });
    } else if (user && (await bcrypt.compare(PIN, user.PIN))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        tokenKey || "QWE789asd456ZXC123",
        {
          expiresIn: "24h",
        }
      );
      user.token = token;
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: tokenAge || 2 * 24 * 60 * 60 * 1000,
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
