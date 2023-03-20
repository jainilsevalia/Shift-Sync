const jwt = require("jsonwebtoken");

const verifyCookie = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.token;
  console.log(token);
  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY);
    // console.log(user);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.status(498).json({ message: "Invalid token" });
  }
};

module.exports = verifyCookie;
