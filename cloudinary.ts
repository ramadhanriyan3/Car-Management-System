// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dzns6jopj",
  api_key: "341665814819595",
  api_secret: "NI4vf30HRlCF0zWZeiJI12icR-8",
});
module.exports = cloudinary;
