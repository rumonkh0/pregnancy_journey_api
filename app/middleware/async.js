const ErrorResponse = require("../resource/utils/errorResponse");
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((error) => {
    next(new ErrorResponse(error.message, 500));
  });

module.exports = asyncHandler;
