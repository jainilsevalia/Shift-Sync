const express = require("express");
const router = express.Router();
const {
  getAllUser,
  // createNewUser,
  getUser,
  deleteUser,
  editUser,
} = require("../controllers/user/userController");
const {
  registerUser,
} = require("../controllers/Authentication/Register.controller.js");
const auth = require("../middleware/auth.middleware");

router.route("/").post(registerUser);

//Protected Route
router.use(auth);

//geting all users
router.route("/get-all-users").get(getAllUser);

//geting single users
router.route("/").get(getUser).delete(deleteUser).patch(editUser);

module.exports = router;
