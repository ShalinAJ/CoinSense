const mongoose = require("mongoose");

const Account = require("../models/accountModel.jsx");

const updateAccountDetails = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400)
      .json({ error: "NO such a contact (mongoose ID is invalid)" });
  }

  const details = await Account.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!details) {
    return res
      .status(400)
      .json({ error: "NO such a contact (contact ID is invalid)" });
  }
  res.status(200).json(details);
};

const createAccountDetails = async (req, res) => {
  const address = "";
  const phoneNo = "";
  const birthday = "";
  const gender = "";

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

const getAccountDetails = async (req, res) => {
  try {
    const user_id = req.user._id;
    const accountDetails = await Account.find({ user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(accountDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "NO such a contact (mongoose ID is invalid)" });
  }

  const account = await Account.findOneAndDelete({ _id: id });

  if (!account) {
    return res
      .status(400)
      .json({ error: "NO such a contact (contact ID is invalid)" });
  }

  res.status(200).json(account);
};

module.exports = {
  createAccountDetails,
  updateAccountDetails,
  getAccountDetails,
  deleteAccount,
};
