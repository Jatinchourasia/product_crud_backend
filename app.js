const express = require("express");
const app = express();
//routes
const home = require("./routes/home");
const user = require("./routes/user");
const cookieParser = require("cookie-parser");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//router middlewares
app.use("/api", home);
app.use("/api", user);

module.exports = app;
