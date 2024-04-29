const mongoose = require("mongoose");

const TradingWallet = require("../models/tradingWallet.jsx");

const createTradingWallet = async (req, res) => {
  const { cardName, amount } = req.body;

  if (!cardName || !amount) {
    throw Error("All fields must be filled");
  }

  try {
    const user_id = req.user._id;
    const tradingWallet = await TradingWallet.create({
      cardName,
      amount,
      user_id,
    });

    res.status(200).json(tradingWallet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTradingWallet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400)
      .json({ error: "NO such a contact (mongoose ID is invalid)" });
  }

  const tradingWallet = await TradingWallet.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!tradingWallet) {
    return res
      .status(400)
      .json({ error: "NO such a contact (contact ID is invalid)" });
  }
  res.status(200).json(tradingWallet);
};

const getTradingWallet = async (req, res) => {
  try {
    const user_id = req.user._id;
    const tradingWallet = await TradingWallet.find({ user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(tradingWallet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTradingWallet, updateTradingWallet, getTradingWallet };
