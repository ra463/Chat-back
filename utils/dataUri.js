const DatauriParser = require("datauri/parser");
const path = require("path");

const parser = new DatauriParser();
exports.getDataUri = async (file) => {
  const pathName = path.extname(file.originalname).toString();
  const uri = parser.format(pathName, file.buffer);
  return uri;
};
