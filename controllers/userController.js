const User = require("../models/user");
const cookieToken = require("../utils/cookieToken");
const CustomError = require("../utils/customError");
const PromiseHandler = require("../utils/promiseHandler");

exports.signup = PromiseHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return next(new CustomError("Name, email and password are required", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  cookieToken(user, res);
});

exports.login = PromiseHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // entries validation
  if (!email || !password) {
    return next(new CustomError("please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  //  user validation
  if (!user) {
    return next(
      new CustomError("Email or password does not match or exist", 400)
    );
  }

  // matching the password
  const isPasswordCorrect = await user.isValidatedPassword(password);
  if (!isPasswordCorrect) {
    return next(
      new CustomError("Email or password does not match or exist", 400)
    );
  }

  //send token
  cookieToken(user, res);
});

exports.logout = PromiseHandler(async (req, res, next) => {
  //clear the cookie
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    succes: true,
    message: "Logout success",
  });
});
