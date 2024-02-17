const express = require("express");
const cors = require("cors");
const app = express();
const { error } = require("./middlewares/error");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config/config.env",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// routes & validators
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const chatRoutes = require("./routes/chatRoutes");
const userValidator = require("./validator/userValidator");
const roomValidator = require("./validator/roomValidator");
const chatValidator = require("./validator/chatValidator");

// using routes
app.use("/api/user", userValidator, userRoutes);
app.use("/api/room", roomValidator, roomRoutes);
app.use("/api/chat", chatValidator, chatRoutes);

app.get("/", (req, res) =>
  res.send(`<h1>Its working. Click to visit Link.</h1>`)
);

app.all("*", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;

app.use(error);
