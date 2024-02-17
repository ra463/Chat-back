const DatauriParser = require("datauri/parser");
const path = require("path");

exports.getDataUri = async (file) => {
  const parser = new DatauriParser();
  const pathName = path.extname(file.originalname).toString();

  return parser.format(pathName, file.buffer);
};
