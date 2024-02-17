const validator = (req, res, next) => {
  try {
    const fieleds = {
      allowBody: ["name", "email", "password", "mobile"],
      allowQuery: [],
      allowParams: [],
    };
    const body = Object.keys(req.body);
    const query = Object.keys(req.query);
    const params = Object.keys(req.params);

    for (let fieled of body) {
      if (!fieleds.allowBody.includes(fieled)) {
        return res.status(400).json({
          error: `Extra fields '${fieled}' are not allowed in requset body.`,
        });
      }
    }
    for (let fieled of query) {
      if (!fieleds.allowQuery.includes(fieled)) {
        return res.status(400).json({
          error: `Extra querys '${fieled}' are not allowed in request.`,
        });
      }
    }
    for (let fieled of params) {
      if (!fieleds.allowBody.includes(fieled)) {
        return res.status(400).json({
          error: `Extra params '${fieled}' are not allowed in requset.`,
        });
      }
    }
    next();
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports = validator;
