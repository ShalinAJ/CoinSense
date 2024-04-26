const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");

const {
  updateAccountDetails,
  createAccountDetails,
  getAccountDetails,
  deleteAccount,
} = require("../controllers/accountController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);

router.get("/account", getAccountDetails);
router.post("/account/new", createAccountDetails);
router.patch("/account/:id", updateAccountDetails);
router.delete("/account/:id", deleteAccount);

module.exports = router;
