const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    address: {
      type: String,
    },
    phoneNo: {
      type: Number,
    },
    birthday: {
      type: String,
    },
    gender: {
      type: String,
    },
    user_id: {
      type: String,
      require: true,
    },
    profilePhoto: {
      type: String, // Assuming you will store the filename of the profile photo
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("account", accountSchema);
