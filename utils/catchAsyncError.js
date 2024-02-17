module.exports = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      if (err.name === "ValidationError") {
        const firstErrorField = Object.keys(err.errors)[0];
        const errorMessage = err.errors[firstErrorField].message;
        return res.status(400).json({ message: errorMessage });
      }
      next(err);
    }
  };
};
