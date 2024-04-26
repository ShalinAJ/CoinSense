const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");
const {
  createWallet,
  getWallets,
  deleteWallet,
  updateWallet,
  deleteAllWallets,
} = require("../controllers/walletController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);

// GET all the wallets
router.get("/wallets", getWallets);

// POST a new wallet
router.post("/wallet/new", createWallet);

// DELETE a wallet
router.delete("/wallet/:id", deleteWallet);

// DELETE all the wallets
router.delete("/wallets/:id", deleteAllWallets);

// UPDATE a wallet
router.patch("/wallet/:id", updateWallet);

module.exports = router;
