const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");

//const upload = require("../middleware/fileUpload.jsx");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const {
  updateAccountDetails,
  createAccountDetails,
  getAccountDetails,
  deleteAccount,
} = require("../controllers/accountController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);

router.post(
  "/profile",
  upload.single("avatar"),
  async function (req, res, next) {
    try {
      // Access uploaded file information from req.file
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Save file information to MongoDB using Mongoose
      // Here you can also associate the uploaded photo with the user's account
      // For example, you can add a field in your accountSchema to store the photo filename or path

      const account = req.user.account; // Assuming you have a user object attached to the request
      account.profilePhoto = req.file.filename; // Assuming you're storing the filename in MongoDB
      await account.save();

      res.status(200).json({ message: "Profile photo uploaded successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get("/account", getAccountDetails);
router.post("/account/new", createAccountDetails);
router.patch("/account/:id", updateAccountDetails);
router.delete("/account/:id", deleteAccount);

module.exports = router;
