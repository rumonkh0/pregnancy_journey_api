const ErrorResponse = require("../resource/utils/errorResponse");
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((error) => {
    res.status(500).json({ succss: false, message: error.message, error });
    // next(new ErrorResponse(error.message, 500));
    // next();
  });

module.exports = asyncHandler;
