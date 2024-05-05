const mongoose = require("mongoose");

const OpenOrders = require("../models/openOrdersModel.jsx");

// create a orderHistory entry
const createOpenOrder = async (req, res) => {
  const { name, transactionType, price, amount, prevPrice } = req.body;
  console.log(name, transactionType, price, amount, prevPrice);

  if (!name || !transactionType || !price || !amount) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    const user_id = req.user._id;
    const order = await OpenOrders.create({
      name,
      transactionType,
      price,
      amount,
      prevPrice,
      user_id,
    });

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all the orders
const getOpenOrders = async (req, res) => {
  try {
    const user_id = req.user._id;
    const openOrders = await OpenOrders.find({ user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(openOrders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a open order when limit is reached
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "NO such a contact (mongoose ID is invalid)" });
  }

  const order = await OpenOrders.findOneAndDelete({ _id: id });

  if (!order) {
    return res
      .status(400)
      .json({ error: "NO such a contact (contact ID is invalid)" });
  }

  res.status(200).json(order);
};

module.exports = { createOpenOrder, getOpenOrders, deleteOrder };
