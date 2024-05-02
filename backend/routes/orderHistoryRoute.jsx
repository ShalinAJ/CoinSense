const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");
const {
  createOrderHistory,
} = require("../controllers/orderHistoryController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);

router.post("/orderhistory/new", createOrderHistory);

module.exports = router;
