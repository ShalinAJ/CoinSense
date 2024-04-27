const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/userModel.jsx");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // create a token
    const name = user.name;
    const token = createToken(user._id);
    res.status(200).json({ email, token, name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const date = await User.findOne({ email });

  try {
    const user = await User.register(name, email, password);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "NO such a contact (mongoose ID is invalid)" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res
      .status(400)
      .json({ error: "NO such a contact (contact ID is invalid)" });
  }

  res.status(200).json(user);
};

module.exports = { registerUser, loginUser, deleteUser };
