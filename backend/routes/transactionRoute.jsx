const express = require("express");

const requireAuh = require("../middleware/requireAuth.jsx");
const {
  createTransaction,
  getTransactions,
  getIncomes,
  getExpenses,
  getInvestments,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController.jsx");

const router = express.Router();

// require authentication for all transaction routes
router.use(requireAuh);

// get all the income transactions
router.get("/transactions/incomes", getIncomes);

// get all the expense transactions
router.get("/transactions/expenses", getExpenses);

// get all the investment transactions
router.get("/transactions/investments", getInvestments);

// get all the transactions
router.get("/transactions", getTransactions);

// post a new transaction
router.post("/transaction/new", createTransaction);

// delete a transaciton
router.delete("/:id", deleteTransaction);

// update a transaction
router.patch("/:id", updateTransaction);

module.exports = router;
