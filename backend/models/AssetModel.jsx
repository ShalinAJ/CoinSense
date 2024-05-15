const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assetSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    status: {
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

module.exports = mongoose.model("asset", assetSchema);
