const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    status: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    amount: {
      type: Number,
      reqiure: true,
    },
    transaction: {
      type: String,
      require: true,
    },
    user_id: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transaction", transactionSchema);
