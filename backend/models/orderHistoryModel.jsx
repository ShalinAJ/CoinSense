const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderHistorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    prevPrice: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderHistory", orderHistorySchema);
