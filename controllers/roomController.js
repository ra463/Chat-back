const User = require("../models/User");
const Room = require("../models/Room");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.createRoom = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  if (!name) return next(new ErrorHandler("Please enter room name", 400));

  const already_exist = await Room.findOne({ name });
  if (already_exist) return next(new ErrorHandler("Room already exists", 400));

  const user = await User.findById(req.userId);
  if (!user) return next(new ErrorHandler("User not found", 404));

  await Room.create({
    name,
    users: [user._id],
    createdBy: user._id,
  });

  res.status(201).json({
    success: true,
    message: "Room created successfully",
  });
});

exports.getAllRooms = catchAsyncError(async (req, res, next) => {
  const rooms = await Room.find().populate("createdBy", "name email avatar");
  res.status(200).json({
    success: true,
    rooms,
  });
});

exports.getRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.params.id).populate(
    "users",
    "name email avatar"
  );
  if (!room) return next(new ErrorHandler("Room not found", 404));
  res.status(200).json({
    success: true,
    room,
  });
});
