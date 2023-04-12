require("dotenv").config();
const User = require("../../models/user/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
const axios = require("axios");
const { awsSecret } = require("../../constants/getAwsSecrets");
AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  sessionToken: process.env.SESSION_TOKEN,
});

let bucketFromAWS;
let tokenKey;
let tokenAge;
// let apiGateWayUrl;
awsSecret().then((data) => {
  bucketFromAWS = JSON.parse(data).S3_BUCKET_NAME;
  tokenKey = JSON.parse(data).TOKEN_KEY;
  tokenAge = JSON.parse(data).TOKEN_AGE_IN_DAYS;
  // apiGateWayUrl = JSON.parse(data).API_GATEWAY_URL;
});

const s3 = new AWS.S3();

exports.registerUser = async (req, res) => {
  console.log("//////////////////////////");
  console.log(req.file);
  var bucketName = bucketFromAWS;
  const fileContent = req.file.buffer;
  const image = String(Date.now() + req.file.originalname);
  const params = { Bucket: bucketName, Key: image, Body: fileContent };
  try {
    const { name, email, PIN, Position, role } = req.body;
    console.log(role);
    s3.upload(params, function (err, data) {
      if (err) {
        console.log("error is: " + err);
      } else {
        console.log("File uploaded Successfully & URL: " + data.Location);
        const S3image = data.Location;
        // if (!(name && email && PIN && Position && role)) {
        //   res.status(400).json({ message: "All inputs are required" });
        // }
        const addNewUser = async () => {
          const oldUser = await User.findOne({ email });
          if (oldUser) {
            res
              .status(409)
              .json({ message: "User already exist!! Please Login" });
          }
          const encryptedPassword = await bcrypt.hash(PIN, 10);
          const newImg = await User.create({
            name,
            email,
            PIN: encryptedPassword,
            Position,
            role,
            profilePicture: S3image,
          });
          newImg
            .save()
            .then((item) => {
              console.log(item);
            })
            .catch((err) => {
              console.log("error is: " + err);
            });
          console.log("/*-*/-/-/-/-/*-//--0");
          console.log(newImg._id);
          console.log(newImg.email);
          // const token = jwt.sign(
          //   {
          //     user_id: newImg._id,
          //     email: newImg.email,
          //   },
          //   tokenKey,
          //   {
          //     expiresIn: "24h",
          //   }
          // );
          // newImg.token = token;
          // res.cookie("token", token, {
          //   httpOnly: true,
          //   maxAge: tokenAge * 24 * 60 * 60 * 1000,
          //   sameSite: "lax",
          // });
          // try {
          //   axios.post(
          //     process.env.API_GATEWAY_URL ||
          //       "https://40e3pgta0h.execute-api.us-east-1.amazonaws.com/dev" +
          //         "/SendMailShiftSync",
          //     {
          //       to: newImg.email,
          //       subject: `${newImg.name} Successfully Registered on Shift Sync as ${newImg.Position} in ${newImg.role}`,
          //       message: `Dear ${newImg.name},

          //     We are delighted to inform you that your registration on our Shift-Sync  has been successful. As a Manager or Employee, you now have access to all the features and functionality of our web application, which has been designed to make shift management easier and more efficient.

          //     With our web application, you can manage your shifts, view your schedule, request time off, and communicate with your team members seamlessly. As a Manager, you also have additional capabilities such as shift assignment, managing employee requests, and approving time off requests.

          //     We understand that effective shift management is critical to the success of any business, and we are committed to providing you with the tools you need to streamline this process. Our user-friendly interface and customer support team are available to assist you in case you encounter any issues or have any questions.

          //     To get started, please use the login credentials provided during the registration process to access your account. Once logged in, you will have access to all the features and functionality available to your role.

          //     We appreciate your decision to choose our web application for your shift management needs, and we are confident that it will help simplify your work. If you have any feedback or suggestions on how we can improve our services, please do not hesitate to let us know.

          //     Thank you for joining our community. We look forward to serving you.

          //     Best regards,

          //     Shift-Sync`,
          //     }
          //   );
          // } catch (err) {
          //   res
          //     .status(201)
          //     .json({ newImg, message: `${name} registerd Successfully` });
          // }
          res
            .status(201)
            .json({ newImg, message: `${name} registerd Successfully` });
        };
        addNewUser();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
