const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");

const {
  updateAccountDetails,
  createAccountDetails,
} = require("../controllers/accountController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);
router.post("/account/new", createAccountDetails);

router.patch("/account/:id", updateAccountDetails);

module.exports = router;
