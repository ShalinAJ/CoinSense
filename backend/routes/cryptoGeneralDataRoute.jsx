const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");

const {
  getCryptoGeneralData,
} = require("../controllers/cryptoGeneralDataController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);

router.get("/crypto/general", getCryptoGeneralData);

module.exports = router;
