const Image = require("../models/imageModel.jsx");

const createAccountImage = async (req, res) => {
  const { accountImg } = req.body;
  const user_id = req.user._id;

  try {
    const accountimage = Image.create({ accountImg, user_id });
    res.status(200).json(accountimage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAccountImage = async (req, res) => {
  try {
    const user_id = req.user._id;
    const accountImage = await Image.find({ user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(accountImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createAccountImage, getAccountImage };
