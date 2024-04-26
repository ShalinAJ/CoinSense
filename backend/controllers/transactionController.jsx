const mongoose = require("mongoose");

const Transaction = require("../models/transactionModel.jsx");

// GET all transactions
const getTransactions = async (req, res) => {
  try {
    const user_id = req.user._id;
    const transactions = await Transaction.find({ user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST a new transaction
const createTransaction = async (req, res) => {
  const { status, date, amount, transaction, card } = req.body;

  const emptyFields = [];

  if (!status) {
    emptyFields.push(status);
  }
  if (!date) {
    emptyFields.push(date);
  }
  if (!amount) {
    emptyFields.push(amount);
  }
  if (!transaction) {
    emptyFields.push(transaction);
  }

  if (!card) {
    emptyFields.push(card);
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields, ", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const transactions = await Transaction.create({
      status,
      date,
      amount,
      transaction,
      card,
      user_id,
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET all incomes
const getIncomes = async (req, res) => {
  try {
    const user_id = req.user._id;
    const incomeTransactions = await Transaction.find({
      status: "Income",
      user_id,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(incomeTransactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET all Expanses
const getExpenses = async (req, res) => {
  try {
    const user_id = req.user._id;
    const transactions = await Transaction.find({ status: "Expense" }).sort({
      createdAt: -1,
      user_id,
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET all Investments
const getInvestments = async (req, res) => {
  try {
    const user_id = req.user._id;
    const transactions = await Transaction.find({ status: "Investments" }).sort(
      {
        createdAt: -1,
        user_id,
      }
    );
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE transaction
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "NO such a contact (mongoose ID is invalid)" });
  }

  const transaction = await Transaction.findOneAndDelete({ _id: id });

  if (!transaction) {
    return res
      .status(400)
      .json({ error: "NO such a contact (contact ID is invalid)" });
  }

  res.status(200).json(transaction);
};

// Delete all transactions associated with one user
const deleteAllTransactions = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId provided" });
  }

  try {
    // Delete all transactions with the specified user_id
    const transactions = await Transaction.deleteMany({ user_id: id });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Error deleting transactions" });
  }
};

// UPDATE transaciton
const updateTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400)
      .json({ error: "NO such a contact (mongoose ID is invalid)" });
  }

  const transaciton = await Transaction.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!transaciton) {
    return res
      .status(400)
      .json({ error: "NO such a contact (contact ID is invalid)" });
  }

  res.status(200).json(transaciton);
};

module.exports = {
  createTransaction,
  getTransactions,
  getIncomes,
  getExpenses,
  getInvestments,
  deleteTransaction,
  updateTransaction,
  deleteAllTransactions,
};
