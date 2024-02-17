const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  createRoom,
  getAllRooms,
  getRoom,
} = require("../controllers/roomController");

const router = express.Router();

router.post("/create-room", auth, createRoom);
router.get("/get-all-rooms", auth, getAllRooms);
router.get("/get-room/:id", auth, getRoom);

module.exports = router;
