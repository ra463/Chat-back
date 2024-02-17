const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../utils/catchAsyncError");

dotenv.config({ path: "../config/config.env" });

exports.auth = catchAsyncError(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new ErrorHandler("Please login first", 401));
  }
  const { userId } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );

  req.userId = userId;

  const user = await User.findById(userId);
  if (!user) return next(new ErrorHandler("User not found", 404));
  next();
});
