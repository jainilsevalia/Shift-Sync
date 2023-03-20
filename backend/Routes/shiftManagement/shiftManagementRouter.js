const express = require("express");
const router = express.Router();
const {
  addShift,
  getShift,
} = require("../../controllers/shiftManagement/shiftManagementController");
const auth = require("../../middleware/auth.middleware");

//Protected Routes after this line
router.use(auth);

//add shift
router.route("/addShift").post(addShift);

router.route("/getShift").get(getShift);

module.exports = router;
