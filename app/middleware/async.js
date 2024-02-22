const ErrorResponse = require("../resource/utils/errorResponse");

let asyncHandler;
if (process.env.NODE_ENV === "development") {
  asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(
      next
      // (error) => {
      //   console.log(error.message, "\n\n------------------\n");
      // }
    );
  };
} else {
  asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.log(JSON.stringify(error));
      res.status(500).json({ succss: false, message: error.message });
      // next(new ErrorResponse(error, 500));
      next();
    });
}
module.exports = asyncHandler;
