const mongoose = require("mongoose");

const CryptoGeneralData = require("../models/cryptoGeneralDataModel.jsx");

const getCryptoGeneralData = async (req, res) => {
  try {
    const data = await CryptoGeneralData.find({
      market_cap_rank: { $in: [1, 2, 3] },
    }).sort({ market_cap_rank: 1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCryptoGeneralData };
