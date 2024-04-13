const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const incomeSchema = new Schema(
  {
    amount: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", incomeSchema);
