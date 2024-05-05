const mongoose = require("mongoose");

const OrderHistory = require("../models/orderHistoryModel.jsx");

// create a orderHistory entry
const createOrderHistory = async (req, res) => {
  const { name, transactionType, price, amount, status } = req.body;

  if (!name || !transactionType || !price || !amount || !status) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    const user_id = req.user._id;
    const order = await OrderHistory.create({
      name,
      transactionType,
      price,
      amount,
      status,
      user_id,
    });

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all the orders
const getOrderHistorys = async (req, res) => {
  try {
    const user_id = req.user._id;
    const orderHistorys = await OrderHistory.find({ user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(orderHistorys);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "NO such a contact (mongoose ID is invalid)" });
  }

  const order = await OrderHistory.findOneAndDelete({ user_id: id });

  if (!order) {
    return res
      .status(400)
      .json({ error: "NO such a contact (contact ID is invalid)" });
  }

  res.status(200).json(order);
};

module.exports = { createOrderHistory, getOrderHistorys, deleteOrder };
