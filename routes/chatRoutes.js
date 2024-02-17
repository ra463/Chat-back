const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  startChatInRoom,
  getChatsOfRoom,
} = require("../controllers/chatController");

const router = express.Router();

router.post("/send-message", auth, startChatInRoom);
router.get("/get-chats/:id", auth, getChatsOfRoom);

module.exports = router;
