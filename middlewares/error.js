exports.error = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  if (err.code === 11000) {
    err.message = "Email already exist";
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
