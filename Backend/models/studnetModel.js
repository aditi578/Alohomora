const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNo: {
    type: Number,
    required: true
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;