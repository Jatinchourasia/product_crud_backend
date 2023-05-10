const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");

//routes
const home = require("./routes/home");
const user = require("./routes/user");
const product = require("./routes/product");
const cookieParser = require("cookie-parser");

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
