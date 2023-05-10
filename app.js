const express = require("express");
const app = express();
//routes
const home = require("./routes/home");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router middlewares
app.use("/api", home);

module.exports = app;
