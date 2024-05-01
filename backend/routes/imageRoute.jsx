const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");
const {
  createAccountImage,
  getAccountImage,
  replaceAccountImage,
  deleteAccountImage,
} = require("../controllers/imageController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);

router.get("/image/account", getAccountImage);
router.post("/image/account/new", createAccountImage);
router.patch("/image/account/:id", replaceAccountImage);
router.delete("/image/account/:id", deleteAccountImage);

module.exports = router;
