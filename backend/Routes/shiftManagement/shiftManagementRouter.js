const express = require("express");
const router = express.Router();
const {
  addShift,
  getShift,
  getLatestShifts,
  deleteShift,
  updateShift,
} = require("../../controllers/shiftManagement/shiftManagementController");
const auth = require("../../middleware/auth.middleware");

//Protected Routes after this line
router.use(auth);

//add shift
router.route("/addShift").post(addShift);
router.route("/getAllShift").get(getLatestShifts);
router.route("/getShift/:id").get(getShift);
router.route("/deleteShift/:id").delete(deleteShift);
router.route("/updateShift/:id").put(updateShift);

module.exports = router;
