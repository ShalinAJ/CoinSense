const mongoose = require("mongoose");

const Account = require("../models/accountModel.jsx");

const createAccount = async (req, res) => {
  const { address, phoneNo, birthday, gender } = req.body;
  try {
    const user_id = req.user._id;
    const account = await Account.create({
      address,
      phoneNo,
      birthday,
      gender,
      user_id,
    });
    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createAccount };
