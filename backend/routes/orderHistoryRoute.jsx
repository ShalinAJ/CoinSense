const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");
const {
  createOrderHistory,
  getOrderHistorys,
  deleteOrder,
  deleteAllOrderHistory,
} = require("../controllers/orderHistoryController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);

router.post("/orderhistory/new", createOrderHistory);
router.get("/orderhistory", getOrderHistorys);
router.delete("/orderhistory/:id", deleteAllOrderHistory);

module.exports = router;
