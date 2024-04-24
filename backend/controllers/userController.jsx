const jwt = require("jsonwebtoken");

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
  console.log(date);

  try {
    const user = await User.register(name, email, password);
    // create a token
    const token = createToken(user._id);
    res.status(200).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
