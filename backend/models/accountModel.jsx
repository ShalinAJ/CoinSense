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
    birthDay: {
      type: Date,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("account", accountSchema);
