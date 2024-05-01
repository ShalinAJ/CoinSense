const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");
const {
  createAccountImage,
  getAccountImage,
} = require("../controllers/imageController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);

router.get("/image/account", getAccountImage);
router.post("/image/account/new", createAccountImage);

module.exports = router;
