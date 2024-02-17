const User = require("../models/User");
const catchAsyncError = require("../utils/catchAsyncError");
const { getDataUri } = require("../utils/dataUri");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");

const sendData = async (res, statusCode, user, message) => {
  const accessToken = await user.getAccessToken();
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
    message,
  });
};

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, mobile } = req.body;

  const user_exist = await User.findOne({
    $or: [{ email: { $regex: new RegExp(email, "i") } }, { mobile }],
  });

  if (user_exist && user_exist.is_verified) {
    return next(
      new ErrorHandler(
        `${user_exist.email ? "Email" : "Mobile"} already exists`,
        400
      )
    );
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    mobile,
  });

  sendData(res, 201, user, "Registered successfully");
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password)
    return next(new ErrorHandler("Please Enter Email & Password", 400));

  const user = await User.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
  }).select("+password");
  if (!user) return next(new ErrorHandler("User not found", 404));

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return next(new ErrorHandler("Invalid credentials", 401));

  sendData(res, 200, user, `Hey ${user.name}! Welcome Back`);
});

exports.getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) return next(new ErrorHandler("User not found", 404));

  const { name, email, mobile } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (mobile) user.mobile = mobile;

  await user.save();
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateAvatar = catchAsyncError(async (req, res, next) => {
  const file = req.file;
  if (!file) return next(new ErrorHandler("Please upload an image", 400));

  const user = await User.findById(req.userId);
  if (!user) return next(new ErrorHandler("User not found", 404));

  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  user.avatar = myCloud.secure_url;

  await user.save();

  res.status(200).json({
    success: true,
  });
});
