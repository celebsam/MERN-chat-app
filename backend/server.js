const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");

const app = express();
dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the chart app" });
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const { id } = req.params;
  const chat = chats.find((chat) => {
    return chat._id === id;
  });
  res.status(200).json({ chat });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}...`);
});
