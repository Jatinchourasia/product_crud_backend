const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
//routes
const home = require("./routes/home");
const user = require("./routes/user");
const product = require("./routes/product");
const cookieParser = require("cookie-parser");
app.use(cors());
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//router middlewares
app.use("/api", home);
app.use("/api", user);
app.use("/api", product);

module.exports = app;
