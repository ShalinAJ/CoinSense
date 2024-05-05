const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");
const {
  createOrderHistory,
  getOrderHistorys,
  deleteOrder,
} = require("../controllers/orderHistoryController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);

router.post("/orderhistory/new", createOrderHistory);
router.get("/orderhistory", getOrderHistorys);
router.get("/orderhistory/:id", deleteOrder);

module.exports = router;
