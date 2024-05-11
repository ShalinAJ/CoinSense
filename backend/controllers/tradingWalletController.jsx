const mongoose = require("mongoose");

const TradingWallet = require("../models/tradingWallet.jsx");

const createTradingWallet = async (req, res) => {
  const { cardName, amount, status } = req.body;

  if (!cardName || !amount || !status) {
    throw Error("All fields must be filled");
  }

  try {
    const user_id = req.user._id;
    const tradingWallet = await TradingWallet.create({
      cardName,
      amount,
      status,
      user_id,
    });

    res.status(200).json(tradingWallet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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

module.exports = { createTradingWallet, getTradingWallet };
