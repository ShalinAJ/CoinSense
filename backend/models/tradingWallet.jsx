const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tradingWalletSchema = new Schema(
  {
    cardName: {
      type: String,
      require: true,
    },
    amount: {
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

module.exports = mongoose.model("tradingWallet", tradingWalletSchema);
