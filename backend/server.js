const express = require("express");
const dotenv = require("dotenv");
require("express-async-errors");
const connection = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
dotenv.config();

app.use(express.json());

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the chat app</h1>");
});

const PORT = process.env.PORT || 5000;

connection();

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}...`);
});
