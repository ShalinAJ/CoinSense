const mongoose = require("mongoose");

const Image = require("../models/imageModel.jsx");

const createAccountImage = async (req, res) => {
  const accountImg = null;
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

const replaceAccountImage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "NO such a contact (mongoose ID is invalid)" });
  }

  const image = await Image.findOneAndUpdate({ user_id: id }, { ...req.body });

  if (!image) {
    return res
      .status(400)
      .json({ error: "NO such a contact (contact ID is invalid)" });
  }

  res.status(200).json(image);
};

const deleteAccountImage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "NO such a contact (mongoose ID is invalid)" });
  }

  const account = await Image.findOneAndDelete({ user_id: id });

  if (!account) {
    return res
      .status(400)
      .json({ error: "NO such a contact (contact ID is invalid)" });
  }

  res.status(200).json(account);
};

module.exports = {
  createAccountImage,
  getAccountImage,
  replaceAccountImage,
  deleteAccountImage,
};
