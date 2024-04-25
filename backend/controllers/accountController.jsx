const mongoose = require("mongoose");

const Account = require("../models/accountModel.jsx");

const updateAccountDetails = async (req, res) => {
  // const { address, phoneNo, birthday, gender } = req.body;
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
  res.status(200).json(transaciton);

  // try {
  //   const user_id = req.user._id;
  //   const account = await Account.create({
  //     address,
  //     phoneNo,
  //     birthday,
  //     gender,
  //     user_id,
  //   });
  //   res.status(200).json(account);
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
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
    console.log(`new ${account}`);
    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createAccountDetails, updateAccountDetails };
