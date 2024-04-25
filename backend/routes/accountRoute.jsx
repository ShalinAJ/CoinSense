const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");

const { createAccount } = require("../controllers/accountController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);

router.post("/account/new", createAccount);

module.exports = router;
