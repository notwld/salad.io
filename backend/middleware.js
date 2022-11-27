const util = require("util");
const multer = require("multer");
const path = require("path");
let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "public", "uploads"));
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
    limits: { fileSize: 1000000 },
}).array("file", 10);	

let FileMiddleware = util.promisify(uploadFile);
module.exports = FileMiddleware;