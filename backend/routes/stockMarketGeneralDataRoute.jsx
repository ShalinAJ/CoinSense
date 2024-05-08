const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");

const {
  getStockMarketGeneralData,
} = require("../controllers/stockMarketGeneralDataController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);

router.get("/stocks/general", getStockMarketGeneralData);

module.exports = router;
