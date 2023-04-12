const jwt = require("jsonwebtoken");
const { awsSecret } = require("../constants/getAwsSecrets");

const verifyCookie = (req, res, next) => {
  let tokenKey;
  // let tokenAge;
  awsSecret().then((data) => {
    tokenKey = JSON.parse(data).TOKEN_KEY;
    // tokenAge = JSON.parse(data).TOKEN_AGE_IN_DAYS;
  });
  console.log(req.cookies);
  const token = req.cookies.token;
  console.log(token);
  try {
    const user = jwt.verify(token, tokenKey || "QWE789asd456ZXC123");
    // console.log(user);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.status(498).json({ message: "Invalid token" });
  }
};

module.exports = verifyCookie;
