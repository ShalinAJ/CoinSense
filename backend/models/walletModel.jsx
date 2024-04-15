const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const walletSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    number: {
      type: Number,
      require: true,
    },
    expDate: {
      type: Date,
      require: true,
    },
    user_id: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("wallet", walletSchema);
