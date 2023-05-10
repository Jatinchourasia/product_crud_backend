const PromiseHandler = require("../utils/promiseHandler");

exports.home = PromiseHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    greeting: "API is working fine",
  });
});
