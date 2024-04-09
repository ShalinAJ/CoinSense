const express = require("express");

const app = express();

const userRoutes = require("./routes/user.jsx");

app.use(userRoutes);

app.listen(4000);
