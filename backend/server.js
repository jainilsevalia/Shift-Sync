require("dotenv").config();
// const awsSecrets = require("./constants/getAwsSecrets").awsSecret;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { awsSecret } = require("./constants/getAwsSecrets");

//Routers
const userRouter = require("./Routes/userRouter");
const shiftManagementRouter = require("./Routes/shiftManagement/shiftManagementRouter");
const authRouter = require("./Routes/AuthenticationRoutes/Authentication.Router");
const roleRouter = require("./Routes/RoleRoutes/roleManagmentRouter");

// const cookieParser = require("cookie-parser");
const cors = require("cors");

awsSecret().then((data) => {
  mongoose.connect(JSON.parse(data).DATABASE_URL);
  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to Database"));
});

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  })
);

app.use(express.json());

app.use("/user", userRouter);
app.use("/shift", shiftManagementRouter);
app.use("/auth", authRouter);
app.get("/temp", (req, res) => {
  res.status(200).json({ message: "You Can Sleep Now!!!" });
});

app.listen(5000, () => console.log("server started"));
