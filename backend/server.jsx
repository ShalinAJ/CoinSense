require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user.jsx");

const app = express();

app.use(express.json());

//Access to fetch at 'http://localhost:4000/register' from origin 'http://localhost:5173' has been blocked by CORS policy
app.use(cors());

app.use((req, res, next) => {
  console.log(`Server js ${req.path}, ${req.method}`);
  next();
});

// Routes
app.use(userRoutes);

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
