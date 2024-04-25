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
    user_id: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("account", accountSchema);
