const multer = require("multer");
const path = require("path");

const storage: any = multer.memoryStorage();

module.exports = multer({ storage });
