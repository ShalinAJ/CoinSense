const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");
const {
  getTradingWalletDetails,
  createTradingWalletDetails,
} = require("../controllers/tradingWalletDetailsController.jsx");

const router = express.Router();

// require authentication for all trading wallet routes
router.use(requireAuh);

router.get("/tradingwalletdetail", getTradingWalletDetails);
router.post("/tradingwalletdetails/new", createTradingWalletDetails);

module.exports = router;
