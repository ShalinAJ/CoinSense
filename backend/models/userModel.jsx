const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

// static register method
userSchema.statics.register = async function (name, email, password) {
  // validation
  if (!email || !password || !name) {
    throw error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw error("Email is not valid");
  }
  // if (!validator.isStrongPassword(password)) {
  //   throw error ("Password is not strong enough")
  // }

  const exists = await this.findOne({ email });
  if (exists) {
    throw error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw error("Incorrect Email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw error("Incorrect Password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
