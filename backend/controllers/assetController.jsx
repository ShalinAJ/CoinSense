const mongoose = require("mongoose");

const Asset = require("../models/AssetModel.jsx");

const getAssets = async (req, res) => {
  try {
    const user_id = req.user._id;
    console.log(user_id);
    const assets = await Asset.find({ user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(assets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createAsset = async (req, res) => {
  const { name, amount, type, category, status } = req.body;

  if (!name || !amount || !type || !category || !status) {
    return res.status(400).json({ error: "All Fields must be filled" });
  }

  try {
    const user_id = req.user._id;
    const asset = await Asset.create({
      name,
      amount,
      type,
      category,
      status,
      user_id,
    });

    res.status(200).json(asset);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAsset = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "NO such a contact (mongoose ID is invalid)" });
  }

  const asset = await Asset.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!asset) {
    return res
      .status(400)
      .json({ error: "NO such a contact (contact ID is invalid)" });
  }

  res.status(200).json(asset);
};

const deleteAsset = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId provided" });
  }

  try {
    // Delete all transactions with the specified user_id
    const asset = await Asset.findByIdAndDelete({ _id: id });

    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ error: "Error deleting asset" });
  }
};

module.exports = { getAssets, createAsset, updateAsset, deleteAsset };
