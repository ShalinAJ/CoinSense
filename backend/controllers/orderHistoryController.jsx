const mongoose = require("mongoose");

const OrderHistory = require("../models/orderHistoryModel.jsx");

// create a orderHistory entry
const createOrderHistory = async (req, res) => {
  const { name, transactionType, priceType, price, amount } = req.body;

  if (!name || !transactionType || !priceType || !price || !amount) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    const user_id = req.user._id;
    const order = await OrderHistory.create({
      name,
      transactionType,
      priceType,
      price,
      amount,
      user_id,
    });

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createOrderHistory };
