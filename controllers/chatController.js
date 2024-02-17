const User = require("../models/User");
const Chat = require("../models/Chat");
const Room = require("../models/Room");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.startChatInRoom = catchAsyncError(async (req, res, next) => {
  const { userId, roomId, message } = req.body;
  if (!message) return next(new ErrorHandler("Please enter message", 400));

  const user = await User.findById(userId);
  if (!user) return next(new ErrorHandler("User not found", 404));

  const room = await Room.findById(roomId);
  if (!room) return next(new ErrorHandler("Room not found", 404));

  const already_member = room.users.find((user) => user.toString() === userId);
  if (!already_member) {
    room.users.push(user._id);
    await room.save();
  }

  const chat = await Chat.create({
    user: userId,
    room: roomId,
    message,
  });

  await chat.populate("user", "name avatar");

  res.status(201).json({
    success: true,
    chat,
  });
});

exports.getChatsOfRoom = catchAsyncError(async (req, res, next) => {
  const chats = await Chat.find({ room: req.params.id }).populate(
    "user",
    "name avatar"
  );
  res.status(200).json({
    success: true,
    chats,
  });
});
