const OpenOrders = require("../models/openOrdersModel.jsx");

// create a orderHistory entry
const createOpenOrder = async (req, res) => {
  const { name, transactionType, price, amount } = req.body;

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

module.exports = { createOpenOrder, getOpenOrders };
