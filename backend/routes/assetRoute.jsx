const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");
const {
  getAssets,
  createAsset,
  updateAsset,
  deleteAsset,
} = require("../controllers/assetController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);

router.get("/assets", getAssets);
router.post("/asset/new", createAsset);
router.patch("/asset/:id", updateAsset);
router.delete("/asset/:id", deleteAsset);

module.exports = router;
