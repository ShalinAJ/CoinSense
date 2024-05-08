const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stockMarketGeneralDataSchema = new Schema({
  country: {
    type: String,
  },
  currency: {
    type: String,
  },
  estimateCurrency: {
    type: String,
  },
  exchange: {
    type: String,
  },
  finnhubIndustry: {
    type: String,
  },
  ipo: {
    type: String,
  },
  logo: {
    type: String,
  },
  marketCapitalization: {
    type: Number,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  shareOutstanding: {
    type: Number,
  },
  ticker: {
    type: String,
  },
  weburl: {
    type: String,
  },
});

module.exports = mongoose.model(
  "StockMarketGederalData",
  stockMarketGeneralDataSchema
);
