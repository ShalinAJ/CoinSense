const mongoose = require("mongoose");

const OrderHistory = require("../models/orderHistoryModel.jsx");

// create a orderHistory entry
const createOrderHistory = async (req, res) => {
  const { name, transactionType, price, amount, status, prevPrice } = req.body;
  console.log(prevPrice);

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
      prevPrice,
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

// Delete all order history associated with one user
const deleteAllOrderHistory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId provided" });
  }

  try {
    // Delete all transactions with the specified user_id
    const orderHistory = await OrderHistory.deleteMany({ user_id: id });

    res.status(200).json(orderHistory);
  } catch (error) {
    res.status(500).json({ error: "Error deleting transactions" });
  }
};

module.exports = {
  createOrderHistory,
  getOrderHistorys,
  deleteAllOrderHistory,
};
