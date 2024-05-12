const TradingWalletDetails = require("../models/tradingWalletDetails.jsx");

const createTradingWalletDetails = async (req, res) => {
  const { cardName, amount, status } = req.body;

  try {
    const user_id = req.user._id;
    const tradingWalletDetails = await TradingWalletDetails.create({
      cardName,
      amount,
      status,
      user_id,
    });

    res.status(200).json(tradingWalletDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTradingWalletDetails = async (req, res) => {
  try {
    const user_id = req.user._id;
    const tradingWalletDetail = await TradingWalletDetails.find({
      user_id,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(tradingWalletDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTradingWalletDetails, getTradingWalletDetails };
