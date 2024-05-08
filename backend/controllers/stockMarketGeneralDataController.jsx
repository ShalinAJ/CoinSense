const StockMarketGeneralData = require("../models/stockMarketGeneralDataModel.jsx");

const getStockMarketGeneralData = async (req, res) => {
  try {
    const data = await StockMarketGeneralData.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getStockMarketGeneralData };
