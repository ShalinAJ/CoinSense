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
router.post("/assest/new", createAsset);
router.patch("/assest/:id", updateAsset);
router.delete("/assest/:id", deleteAsset);

module.exports = router;
