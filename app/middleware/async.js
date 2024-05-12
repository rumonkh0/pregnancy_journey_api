const ErrorResponse = require("../resource/utils/errorResponse");

let asyncHandler;
if (process.env.NODE_ENV === "development") {
  asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
} else {
  asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
module.exports = asyncHandler;
