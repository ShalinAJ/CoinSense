require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const userRoutes = require("./routes/user.jsx");
const transacitonRoutes = require("./routes/transactionRoute.jsx");
const walletRoutes = require("./routes/walletRoute.jsx");
const accountRoutes = require("./routes/accountRoute.jsx");
const cryptoGeneralDataRoutes = require("./routes/cryptoGeneralDataRoute.jsx");
const tradingWalletRoutes = require("./routes/tradingWalletRoute.jsx");
const imageRoutes = require("./routes/imageRoute.jsx");
const orderHistoryRoutes = require("./routes/orderHistoryRoute.jsx");
const openOrderRoutes = require("./routes/openOrderRoute.jsx");
const bodyParser = require("body-parser");

const app = express();

// Parse JSON bodies with a larger limit
app.use(bodyParser.json({ limit: "10mb" })); // Adjust the limit as per your requirements

app.use(express.json());

//Access to fetch at 'http://localhost:4000/register' from origin 'http://localhost:5173' has been blocked by CORS policy
app.use(cors());

app.use((req, res, next) => {
  console.log(`Server js ${req.path}, ${req.method}`);
  next();
});

app.get("/stock-data", async (req, res) => {
  const { symbol, range, interval } = req.query;
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=${range}&interval=${interval}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching stock data: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Routes
app.use(userRoutes);
app.use(transacitonRoutes);
app.use(walletRoutes);
app.use(accountRoutes);
app.use(cryptoGeneralDataRoutes);
app.use(tradingWalletRoutes);
app.use(imageRoutes);
app.use(orderHistoryRoutes);
app.use(openOrderRoutes);

// Conncet to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB and listning on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
//
// test
