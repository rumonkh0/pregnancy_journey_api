const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const { Op } = require("sequelize");
const ErrorResponse = require("../../resource/utils/errorResponse");
const asyncHandler = require("../../middleware/async");
const Admin = require("../../models/Admin");
const Media = require("../../models/Media");
const sendEmail = require("../../resource/utils/sendEmail");
const Role = require("../../models/Role");

// @desc      Register admin
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const {
    username,
    first_name,
    last_name,
    age,
    gender,
    child_number,
    edd_date,
    email,
    password,
    language,
    country,
    pregnency_loss,
    baby_already_born,
    lmp_date,
  } = req.body;

  const adminData = {
    username,
    first_name,
    last_name,
    age,
    gender,
    child_number,
    edd_date,
    email,
    password,
    language,
    country,
    pregnency_loss,
    baby_already_born,
    lmp_date,
  };

  let prev = await Admin.findOne({ where: { email: req.body.email } });
  if (prev) {
    return res.status(404).json({
      success: false,
      message: "email already exists",
    });
  }

  prev = await Admin.findOne({ where: { username: req.body.username } });
  if (prev) {
    return res.status(404).json({
      success: false,
      message: "username already exists",
    });
  }

  req.body.admin_type = "admin";
  // Create a new admin with the data from req.body
  const admin = await Admin.create(adminData);

  // grab token and send to email
  const OTP = await admin.getOTP();

  const message = `You are receiving this email because you need to confirm your email address. Heres your OTP: \n\n ${OTP}`;

  admin.save();

  const sendResult = await sendEmail({
    email: admin.email,
    subject: "Email confirmation OTP",
    otp: OTP,
    username,
  });
  // admin.password = null;
  sendTokenResponse(admin, 200, res);
});

// @desc      Login admin
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // Validate emil & password
  if (!username || !password) {
    return res.status(404).json({
      success: false,
      message: "Please enter username and password",
    });
  }
  //Find admin from database
  let admin = await Admin.scope("withPassword").findOne({
    where: { username },
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
  if (!admin) {
    return res.status(404).json({
      success: false,
      message: "Admin not found",
    });
  }

  //Match hash password
  const isMatch = await admin.verifyPassword(password);

  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Invalid credential",
    });
  }
  sendTokenResponse(admin, 200, res);
});

// @desc      Log admin out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out",
  });
});

// @desc      Get current logged in admin
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  // admin is already available in req due to the protect middleware
  const admin = req.admin;
  if (admin == undefined)
    return res.status(401).json({
      remark: "UNAUTHORIZED",
      success: false,
      message: "unauthorized for this route",
    });
  res.status(200).json({
    success: true,
    message: "Admin data found",
    data: admin,
  });
});

// @desc      Update admin details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const {
    username,
    first_name,
    last_name,
    age,
    gender,
    child_number,
    edd_date,
    language,
    country,
    pregnency_loss,
    baby_already_born,
    lmp_date,
  } = req.body;

  const adminDetailsToUpdate = {
    username,
    first_name,
    last_name,
    age,
    gender,
    child_number,
    edd_date,
    language,
    country,
    pregnency_loss,
    baby_already_born,
    lmp_date,
  };

  // Find the admin by username
  const admin = await Admin.findOne({ where: { id: req.admin.id } });

  if (!admin) {
    return res.status(404).json({
      success: false,
      message: "Admin not found",
      error: "Admin not found",
    });
  }
  let adminData = await Admin.findByPk(req.admin.id);
  if (!req.file) {
    updated = await Admin.update(adminDetailsToUpdate, {
      where: {
        id: req.admin.id,
      },
    });

    if (!updated[0]) {
      return res
        .status(304)
        .json({ success: false, message: "Recond no modified" });
    }

    adminData = await Admin.findByPk(req.admin.id);

    return res.status(200).json({
      success: true,
      message: "Admin information updated successfully",
      data: { admin: adminData },
    });
  }

  const { mimetype, filename, path: file_path } = req.file;
  console.log(req.file);
  // if (!mimetype.startsWith("image")) {
  //   return res
  //     .status(401)
  //     .json({ success: false, message: "File type must be image" });
  // }
  req.media = {
    uploaded_by: req.admin.username,
    file_path,
    mime_type: mimetype,
    file_name: filename,
    file_type: path.extname(filename).slice(1),
  };

  let media, prevMedia;
  try {
    adminWithMedia = await Admin.findByPk(req.admin.id, {
      include: [
        {
          model: Media,
          as: "media",
          required: false,
        },
      ],
    });

    media = await Media.create(req.media);
    adminDetailsToUpdate.photo = media.id;

    //delete previous photo
    if (adminWithMedia.media) {
      await unlinkAsync(adminWithMedia.media.file_path);
      await Media.destroy({ where: { id: admin.photo } });
    }
  } catch (err) {
    if (req.file && req.file && req.file.path) {
      const filePath = req.file.path;
      await unlinkAsync(filePath);
    }
    return res
      .status(200)
      .json({ success: false, message: "data upload failed", error: err });
  }

  updated = await Admin.update(adminDetailsToUpdate, {
    where: {
      id: req.admin.id,
    },
  });

  if (!updated[0]) {
    return res
      .status(304)
      .json({ success: false, message: "Recond no modified" });
  }

  res.status(200).json({
    success: true,
    message: "Data updated",
  });
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body; // Contains old and new passwords

    // Find the admin by username
    // const admin = await Admin.findByAdminname(username);
    const admin = await Admin.scope("withPassword").findOne({
      where: { id: req.admin.id },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
        error: "Admin not found",
      });
    }

    // Verify the old password
    const isPasswordValid = await admin.verifyPassword(oldPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid old password",
        error: "Invalid old password",
      });
    }

    // Update the admin's password
    admin.password = newPassword;
    await admin.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Password not changed",
      error: error.message,
    });
  }
});
/**
 *@desc      Forgot password
 *@route     POST /api/v1/auth/forgotpassword
 *@access    Public
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  let admin = await Admin.findOne({
    where: { username: req.body.adminnameORemail },
  });

  if (!admin) {
    admin = await Admin.findOne({
      where: { email: req.body.adminnameORemail },
    });

    if (!admin)
      return next(
        new ErrorResponse("There is no admin with that username or email", 404)
      );
  }
  // Get reset token
  const OTP = await admin.getOTP();

  await admin.save();

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. your OTP is : \n\n ${OTP}\n\n Make sure to reset the password within 10 minits`;

  try {
    await sendEmail({
      email: admin.email,
      subject: "Password reset OTP",
      otp: OTP,
      username: req.admin.username,
    });

    res.status(200).json({ success: true, message: "Email sent" });
  } catch (err) {
    admin.password_reset_token = null;

    await admin.save();

    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

/**
 *@desc      Reset password
 *@route     PUT /api/v1/auth/resetpassword
 *@access    Public
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { username, OTP, newPassword } = req.body;

  const admin = await Admin.scope("withPassword").findOne({
    where: {
      username,
      reset_password_expire: { [Op.gt]: new Date() },
    },
  });

  if (!admin) {
    return next(new ErrorResponse("No admin found", 400));
  }

  // Verify the OTP
  const isOTPdValid = await admin.verifyOTP(OTP);

  if (!isOTPdValid)
    return res.status(200).json({ success: false, message: "Invalid OTP" });

  // Set new password
  admin.password = newPassword;
  admin.password_reset_token = null;
  admin.resetPasswordExpire = null;
  await admin.save();

  sendTokenResponse(admin, 200, res);
});

/**
 * @desc    Confirm Email
 * @route   GET /api/v1/auth/confirmemail
 * @access  Public
 */
exports.resendOTP = asyncHandler(async (req, res, next) => {
  // grab token from email
  const { username } = req.admin;

  let admin = await Admin.findOne({ where: { username } });

  if (!admin)
    return res
      .status(200)
      .json({ success: false, message: "username of email not found" });

  // grab token and send to email
  const OTP = await admin.getOTP();

  const message = `You are receiving this email because you need to confirm your email address. Heres your OTP: \n\n ${OTP}`;

  admin.save();

  const sendResult = await sendEmail({
    email: admin.email,
    subject: "Email confirmation OTP",
    otp: OTP,
    username: req.admin.username,
  });

  res.status(200).json({ success: true, message: "OTP send" });
});

/**
 * @desc    Confirm Email
 * @route   GET /api/v1/auth/confirmemail
 * @access  Public
 */
exports.confirmEmail = asyncHandler(async (req, res, next) => {
  // grab token from email
  const { username, OTP } = req.body;

  if (!OTP) {
    return next(new ErrorResponse("Invalid Token", 400));
  }

  // get admin by OTP
  const admin = await Admin.findOne({
    where: {
      username,
      is_email_confirmed: false,
    },
  });

  if (!admin) {
    return res
      .status(200)
      .json({ success: false, message: "already verified" });
  }
  // Verify the OTP
  const isOTPdValid = await admin.verifyOTP(OTP);

  if (!isOTPdValid)
    return res.status(200).json({ success: false, message: "Invalid OTP" });

  // update confirmed to true
  admin.confirm_email_token = null;
  admin.is_email_confirmed = true;

  // save
  admin.save();

  // return token
  res
    .status(200)
    .json({ success: true, message: "Email verification successfull" });
});

/**
 * @desc    Social oauth verification
 * @route   POST /api/v1/auth/social
 * @access  Public
 */
exports.oAuth = asyncHandler(async (req, res, next) => {
  const { token, type } = req.body;
  // const { email, social_id, first_name, last_name, image } = req.body;
  switch (type) {
    case "google":
      // code block
      const oauthdata = await fetch(
        `https://www.googleapis.com/oauth2/v1/admininfo?alt=json&access_token=${token}`
      );
      let adminInfo;
      // const {
      //   id: social_id,
      //   email,
      //   given_name: first_name,
      //   family_name: last_name,
      //   verified_email,
      //   picture: photo,
      // } = oauthdata;
      if (oauthdata.ok) {
        adminInfo = await oauthdata.json();
      } else {
        throw new Error("Failed to fetch admin information");
      }

      const {
        id: social_id,
        email,
        given_name: first_name,
        family_name: last_name,
        verified_email,
        picture: social_photo,
      } = adminInfo;

      const admin = await Admin.findOne({
        where: {
          email,
          social_id,
        },
      });

      if (!admin) {
        admindata = {
          username: social_id,
          social_id,
          email,
          first_name,
          social_photo,
          last_name,
          login_type: "google",
        };
        const admin = await Admin.create(admindata);
        sendTokenResponse(admin, 200, res);
      } else {
        sendTokenResponse(admin, 200, res);
      }

      break;
    case "facebook":
      // code block
      break;
    default:
    // code block
  }
  const data = await Admin.findOne({ where: {} });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (admin, statusCode, res) => {
  // Create token
  const token = admin.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  admin = admin.toJSON();
  delete admin.password;

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message: "Authentication successfull",
    data: { token, admin },
  });
};
