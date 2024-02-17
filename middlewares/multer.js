const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

module.exports = upload;
