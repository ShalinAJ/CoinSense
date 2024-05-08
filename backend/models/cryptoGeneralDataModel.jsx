const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cryptoGeneralDataSchema = new Schema({
  id: {
    type: String,
  },
  symbol: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  current_price: {
    type: Number,
  },
  market_cap: {
    type: Number,
  },
  market_cap_rank: {
    type: Number,
  },
  fully_diluted_valuation: {
    type: Number,
  },
  total_volume: {
    type: Number,
  },
  high_24h: {
    type: Number,
  },
  low_24h: {
    type: Number,
  },
  price_change_24h: {
    type: Number,
  },
  price_change_percentage_24h: {
    type: Number,
  },
  market_cap_change_24h: {
    type: Number,
  },
  market_cap_change_percentage_24h: {
    type: Number,
  },
  circulating_supply: {
    type: Number,
  },
  total_supply: {
    type: Number,
  },
  max_supply: {
    type: Number,
  },
  ath: {
    type: Number,
  },
  ath_change_percentage: {
    type: Number,
  },
  ath_date: {
    type: Date,
  },
  atl: {
    type: Number,
  },
  atl_change_percentage: {
    type: Number,
  },
  atl_date: {
    type: Date,
  },
  block_explorer: {
    type: String,
  },
  historical_high: {
    type: String,
  },
  historical_high_date: {
    type: String,
  },
  historical_low: {
    type: String,
  },
  historical_low_date: {
    type: String,
  },
  intro: {
    type: String,
  },
  issue_date: {
    type: String,
  },
  official_website: {
    type: String,
  },
  white_Paper: {
    type: String,
  },
  doninance_index: {
    type: String,
  },
});

module.exports = mongoose.model("cryptoGeneralData", cryptoGeneralDataSchema);
