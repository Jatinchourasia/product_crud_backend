require("dotenv").config();

const connectWithDb = require("./config/db");
const cloudinary = require("cloudinary");
const app = require("./app");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = 4000;

connectWithDb().then(() => {
  app.listen(PORT, () => console.log(`server running in ${PORT}`));
});
