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
    priceType: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderHistory", orderHistorySchema);
