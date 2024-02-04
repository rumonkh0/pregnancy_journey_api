const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../resource/utils/errorResponse");
const User = require("../models/User");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // console.log("------------go with bearer-----------");
  } else if (req.cookies.token) {
    // Set token from cookie
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "unauthorized for this route" });
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: { id: decoded.id },
    });
    req.user = user;
    console.log(user.is_email_confirmed);
    if ((user.is_email_comfirmed == "0") && (req.originalUrl != "/api/v1/auth/sendotp")) {
      return res.status(200).json({
        remark: "NOT_VERIFIED",
        success: false,
        message: "Email not verified",
      });
    }
    next();
  } catch (err) {
    res.status(401).json({
      remark: "UNAUTHORIZED",
      success: false,
      message: "unauthorized for this route",
    });
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
