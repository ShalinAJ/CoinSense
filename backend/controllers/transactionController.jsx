const Transaciton = require("../models/transactionModel.jsx");
const mongoose = require("mongoose");

// GET all transactions
const getTransactions = async (req, res) => {
  try {
    const user_id = req.user._id;
    const transactions = await Transaciton.find({ user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST a new transaction
const createTransaction = async (req, res) => {
  const { status, date, amount, transaction } = req.body;

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

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields, ", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const transactions = await Transaciton.create({
      status,
      date,
      amount,
      transaction,
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
    const incomeTransactions = await Transaciton.find({
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
    const transactions = await Transaciton.find({ status: "Expense" }).sort({
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
    const transactions = await Transaciton.find({ status: "Investments" }).sort(
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

  const transaction = await Transaciton.findOneAndDelete({ _id: id });

  if (!transaction) {
    return res
      .status(400)
      .json({ error: "NO such a contact (contact ID is invalid)" });
  }

  res.status(200).json(transaction);
};

// UPDATE transaciton
const updateTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400)
      .json({ error: "NO such a contact (mongoose ID is invalid)" });
  }

  const transaciton = await Transaciton.findOneAndUpdate(
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
};