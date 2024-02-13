const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../resource/utils/errorResponse");
const User = require("../models/User");
const Admin = require("../models/Admin");
const Role = require("../models/Role");
const Media = require("../models/Media");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];kali
  } else if (req.cookies.token) {
    // Set token from cookie
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "unauthorized for this route" });
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    switch (decoded.type) {
      case "admin":
        let admin = await Admin.findOne({
          where: { id: decoded.id },
          include: [
            {
              model: Role,
              attributes: ["role"],
            },
            {
              model: Media,
              as: "profile_photo",
              attributes: ["file_name", "file_path"],
            },
          ],
        });
        admin = admin.toJSON();
        req.admin = admin;
        break;
      case "user":
        const user = await User.findOne({
          where: { id: decoded.id },
          include: {
            model: Media,
            as: "media",
            attributes: ["file_name", "file_path"],
          },
        });
        req.user = user;
        if (
          user.is_email_confirmed == "0" &&
          !(
            req.originalUrl == "/api/v1/auth/sendotp" ||
            req.originalUrl == "/api/v1/auth/logout" ||
            req.originalUrl == "/api/v1/auth/me" ||
            req.originalUrl == "/api/v1/auth/confirmemail"
          )
        ) {
          return res.status(200).json({
            remark: "NOT_VERIFIED",
            success: false,
            message: "Email not verified",
          });
        }
        break;
      default:
        return res.status(401).json({
          remark: "UNAUTHORIZED",
          success: false,
          message: "unauthorized for this route",
        });
        break;
    }

    next();
  } catch (err) {
    return res.status(401).json({
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
    if (
      !req.admin ||
      !roles.some((element) => req.admin.roles.includes(element))
    ) {
      return res.status(200).json({
        remark: "UNAUTHORIZED",
        success: false,
        message: "Not authorized to access this route",
      });
    }
    next();
  };
};
