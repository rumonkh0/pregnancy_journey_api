const ErrorResponse = require("../resource/utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  // console.log(err);
  console.log(error);

  // Sequelize bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Sequelize duplicate key
  if (err.code === 1062) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  // Sequelize validation error
  if (err.name === "SequelizeValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // Sequelize validation error
  if (err.name === "SequelizeUniqueConstraintError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
