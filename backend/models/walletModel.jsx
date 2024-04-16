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
    expMonth: {
      type: Number,
      require: true,
    },
    expYear: {
      type: Number,
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
