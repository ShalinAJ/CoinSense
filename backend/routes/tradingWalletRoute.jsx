const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");
const {
  createTradingWallet,
  getTradingWallet,
} = require("../controllers/tradingWalletController.jsx");

const router = express.Router();

// require authentication for all trading wallet routes
router.use(requireAuh);

router.get("/tradingwallet", getTradingWallet);
router.post("/tradingwallet/new", createTradingWallet);

module.exports = router;
