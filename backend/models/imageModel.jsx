const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  accountImg: {
    type: String,
  },
  user_id: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("image", imageSchema);
