const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  numberOfAnswers: {
    type: Number,
    default: 0,
    index: true
  }
});

module.exports = mongoose.model("user", userSchema);
