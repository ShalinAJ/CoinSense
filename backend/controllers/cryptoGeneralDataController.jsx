const mongoose = require("mongoose");

const CryptoGeneralData = require("../models/cryptoGeneralDataModel.jsx");

const getCryptoGeneralData = async (req, res) => {
  try {
    const data = await CryptoGeneralData.find({}).limit(3);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCryptoGeneralData };
