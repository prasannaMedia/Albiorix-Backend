mongoose = require("mongoose");

userSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Email: {
    type: String,
  },
  Number: {
    type: String,
  },
  DOB: {
    type: String,
  },
});
module.exports = User = mongoose.model("user", userSchema);
