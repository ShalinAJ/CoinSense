const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");
const {
  createTradingWallet,
  updateTradingWallet,
  getTradingWallet,
} = require("../controllers/tradingWalletController.jsx");

const router = express.Router();

// require authentication for all trading wallet routes
router.use(requireAuh);

router.get("/tradingwallet", getTradingWallet);
router.post("/tradingwallet/new", createTradingWallet);
router.patch("/tradingwallet/:id", updateTradingWallet);

module.exports = router;
