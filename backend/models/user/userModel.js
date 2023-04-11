const mongoose = require("mongoose");
const roles = require("../../constants/roles");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
  },
  PIN: {
    type: String,
    required: true,
  },
  Position: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [roles.MANAGER, roles.EMPLOYEE, roles.OWNER, roles.OTHERS],
    default: roles.OTHERS,
  },
  profilePicture: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
