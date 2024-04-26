const express = require("express");

const {
  registerUser,
  loginUser,
  deleteUser,
} = require("../controllers/userController.jsx");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
