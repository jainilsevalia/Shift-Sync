const mongoose = require("mongoose");
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
  role: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
