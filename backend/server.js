require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

//Routers
const userRouter = require("./Routes/userRouter");
const shiftManagementRouter = require("./Routes/shiftManagement/shiftManagementRouter");
const authRouter = require("./Routes/AuthenticationRoutes/Authentication.Router");
const roleRouter = require("./Routes/RoleRoutes/roleManagmentRouter");

const cookieParser = require("cookie-parser");
const cors = require("cors");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const corsOption = {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/shift", shiftManagementRouter);
app.use("/auth", authRouter);
// app.use("/role", roleRouter);

app.listen(process.env.PORT, () => console.log("server started"));
