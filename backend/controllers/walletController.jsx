const mongoose = require("mongoose");

const Wallet = require("../models/walletModel.jsx");

// GET all the wallets
const getWallets = async (req, res) => {
  try {
    const user_id = req.user._id;
    const wallets = await Wallet.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(wallets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST a new wallet
const createWallet = async (req, res) => {
  const { name, number, expMonth, expYear, nickname, cardbalance } = req.body;

  const emptyFields = [];

  if (!name) {
    emptyFields.push(name);
  }
  if (!number) {
    emptyFields.push(number);
  }
  if (!expMonth) {
    emptyFields.push(expMonth);
  }

  if (!expYear) {
    emptyFields.push(expYear);
  }

  if (!nickname) {
    emptyFields.push(nickname);
  }

  if (!cardbalance) {
    emptyFields.push(cardbalance);
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields, ", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const wallet = await Wallet.create({
      name,
      number,
      expMonth,
      expYear,
      nickname,
      user_id,
      cardbalance,
    });
    res.status(200).json(wallet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a wallet
const deleteWallet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "NO such a contact (mongoose ID is invalid)" });
  }

  const wallet = await Wallet.findByIdAndDelete({ _id: id });

  if (!wallet) {
    return res
      .status(400)
      .json({ error: "NO such a contact (contact ID is invalid)" });
  }

  res.status(200).json(wallet);
};

// DELETE all wallets with specified user_id
const deleteAllWallets = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId provided" });
  }

  try {
    // Delete all transactions with the specified user_id
    const wallets = await Wallet.deleteMany({ user_id: id });

    res.status(200).json(wallets);
  } catch (error) {
    res.status(500).json({ error: "Error deleting transactions" });
  }
};

// PATCH a wallet
const updateWallet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "NO such a contact (mongoose ID is invalid)" });
  }

  const wallet = await Wallet.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!wallet) {
    return res
      .status(400)
      .json({ error: "NO such a contact (contact ID is invalid)" });
  }

  res.status(200).json(wallet);
};

module.exports = {
  createWallet,
  getWallets,
  deleteWallet,
  updateWallet,
  deleteAllWallets,
};
