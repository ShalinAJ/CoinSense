const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");

const {
  updateAccountDetails,
  createAccountDetails,
  getAccountDetails,
} = require("../controllers/accountController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);
router.get("/account", getAccountDetails);
router.post("/account/new", createAccountDetails);
router.patch("/account/:id", updateAccountDetails);

module.exports = router;
