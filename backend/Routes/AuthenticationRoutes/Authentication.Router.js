const express = require("express");
const router = express.Router();
const { login } = require("../../controllers/Authentication/Login.controller");
const {
  logout,
} = require("../../controllers/Authentication/Logout.controller");
const auth = require("../../middleware/auth.middleware");

router.route("/login").post(login);

router.use(auth);
router.route("/logout").get(logout);

module.exports = router;
