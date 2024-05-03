const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");
const {
  createOpenOrder,
  getOpenOrders,
} = require("../controllers/openOrdersController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);

router.post("/openorder/new", createOpenOrder);
router.get("/openorder", getOpenOrders);

module.exports = router;
