const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const { Op } = require("sequelize");
const ErrorResponse = require("../resource/utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Media = require("../models/Media");
const sendEmail = require("../resource/utils/sendEmail");

// @desc      Register user
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

  const userData = {
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

  let prev = await User.findOne({ where: { email: req.body.email } });
  if (prev) {
    return res.status(404).json({
      success: false,
      message: "email already exists",
    });
  }

  prev = await User.findOne({ where: { username: req.body.username } });
  if (prev) {
    return res.status(404).json({
      success: false,
      message: "username already exists",
    });
  }

  req.body.user_type = "user";
  // Create a new user with the data from req.body
  const user = await User.create(userData);

  // grab token and send to email
  const OTP = await user.getOTP();

  const message = `You are receiving this email because you need to confirm your email address. Heres your OTP: \n\n ${OTP}`;

  user.save();

  const sendResult = await sendEmail({
    email: user.email,
    subject: "Email confirmation OTP",
    otp: OTP,
    username,
  });
  // user.password = null;
  sendTokenResponse(user, 200, res);
});

// @desc      Login user
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
  //Find user from database
  let user = await User.scope("withPassword").findOne({
    where: { username },
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  //Match hash password
  const isMatch = await user.verifyPassword(password);

  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Invalid credential",
    });
  }

  sendTokenResponse(user, 200, res);
});

// @desc      Log user out / clear cookie
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

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  // user is already available in req due to the protect middleware
  const user = req.user;

  if (user == undefined)
    return res.status(401).json({
      remark: "UNAUTHORIZED",
      success: false,
      message: "unauthorized for this route",
    });

  res.status(200).json({
    success: true,
    message: "User data found",
    data: user,
  });
});

// @desc      Update user details
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

  const userDetailsToUpdate = {
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

  // Find the user by username
  const user = await User.findOne({ where: { id: req.user.id } });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
      error: "User not found",
    });
  }
  let userData = await User.findByPk(req.user.id);

  if (!req.files) {
    updated = await User.update(userDetailsToUpdate, {
      where: {
        id: req.user.id,
      },
    });

    if (!updated[0]) {
      return res
        .status(304)
        .json({ success: false, message: "Recond no modified" });
    }

    userData = await User.findByPk(req.user.id);

    return res.status(200).json({
      success: true,
      message: "User information updated successfully",
      data: { user: userData },
    });
  }

  const { mimetype, filename, path: file_path } = req.file;
  req.media = {
    uploaded_by: req.user.username,
    file_path,
    mime_type: mimetype,
    file_name: filename,
    file_type: path.extname(filename).slice(1),
  };

  let media, prevMedia;
  try {
    userWithMedia = await User.findByPk(req.user.id, {
      include: [
        {
          model: Media,
          as: "media",
          required: false,
        },
      ],
    });

    media = await Media.create(req.media);
    userDetailsToUpdate.photo = media.id;
    //delete previous photo
    if (userWithMedia.media) {
      await unlinkAsync(userWithMedia.media.file_path);
      await Media.destroy({ where: { id: user.photo } });
    }
  } catch (err) {
    if (req.file && req.file && req.file.path) {
      const filePath = req.file.path;
      await unlinkAsync(filePath);
      console.log("File removed:", filePath);
    }
    return res
      .status(200)
      .json({ success: false, message: "data upload failed", error: err });
  }

  updated = await User.update(userDetailsToUpdate, {
    where: {
      id: req.user.id,
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

    // Find the user by username
    // const user = await User.findByUsername(username);
    const user = await User.scope("withPassword").findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "User not found",
      });
    }

    // Verify the old password
    const isPasswordValid = await user.verifyPassword(oldPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid old password",
        error: "Invalid old password",
      });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

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
  let user = await User.findOne({
    where: { username: req.body.usernameORemail },
  });

  if (!user) {
    user = await User.findOne({
      where: { email: req.body.usernameORemail },
    });

    if (!user)
      return res.status(404).json({
        remark: "UNSUCCESSFUL",
        success: false,
        message: "No user found",
      });
  }
  // Get reset token
  const OTP = await user.getOTP();

  await user.save();

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. your OTP is : \n\n ${OTP}\n\n Make sure to reset the password within 10 minits`;
  console.log({
    email: user.email,
    subject: "Password reset OTP",
    otp: OTP,
    username: user.username,
  });
  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset OTP",
      otp: OTP,
      username: user.username,
    });

    res.status(200).json({ success: true, message: "Email sent" });
  } catch (err) {
    user.password_reset_token = null;

    await user.save();

    return res.status(400).json({
      remark: "UNSUCCESSFUL",
      success: false,
      message: "Email could not be sent",
    });
  }
});

/**
 *@desc      Reset password
 *@route     PUT /api/v1/auth/resetpassword
 *@access    Public
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { usernameORemail, OTP, newPassword } = req.body;

  let prev = await User.findOne({
    where: { username: usernameORemail },
  });

  if (!prev) {
    prev = await User.findOne({
      where: { email: usernameORemail },
    });
  }

  if (!prev)
    return res.status(404).json({
      remark: "UNSUCCESSFUL",
      success: false,
      message: "No user found",
    });

  ///////////////////////////////////

  const user = await User.scope("withPassword").findOne({
    where: {
      username: prev.username,
      reset_password_expire: { [Op.gt]: new Date() },
    },
  });

  if (!user) {
    return res.status(404).json({
      remark: "UNSUCCESSFUL",
      success: false,
      message: "OTP expired",
    });
  }

  // Verify the OTP
  const isOTPdValid = await user.verifyOTP(OTP);

  if (!isOTPdValid)
    return res.status(200).json({ success: false, message: "Invalid OTP" });

  // Set new password
  user.password = newPassword;
  user.password_reset_token = undefined;
  user.reset_password_expire  = undefined;
  console.log(user);
  await user.save();

  sendTokenResponse(user, 200, res);
});

/**
 * @desc    Confirm Email
 * @route   GET /api/v1/auth/confirmemail
 * @access  Public
 */
exports.resendOTP = asyncHandler(async (req, res, next) => {
  // grab token from email
  const { username } = req.user;

  let user = await User.findOne({ where: { username } });

  if (!user)
    return res
      .status(200)
      .json({ success: false, message: "username of email not found" });

  console.log(user);

  if (user.is_email_confirmed == "1")
    return res
      .status(200)
      .json({ success: false, message: "already verified" });

  // grab token and send to email
  const OTP = await user.getOTP();

  const message = `You are receiving this email because you need to confirm your email address. Heres your OTP: \n\n ${OTP}`;

  user.save();

  const sendResult = await sendEmail({
    email: user.email,
    subject: "Email confirmation OTP",
    otp: OTP,
    username: req.user.username,
  });

  res.status(200).json({ success: true, messsage: "OTP send" });
});

/**
 * @desc    Confirm Email
 * @route   GET /api/v1/auth/confirmemail
 * @access  Public
 */
exports.confirmEmail = asyncHandler(async (req, res, next) => {
  // grab token from email
  const { OTP } = req.body;

  if (!OTP) {
    return res.status(404).json({
      success: false,
      message: "invalid token",
    });
  }

  // get user by OTP
  const user = await User.findOne({
    where: {
      username: req.user.username,
      is_email_confirmed: false,
    },
  });

  if (!user) {
    return res
      .status(200)
      .json({ success: false, message: "already verified" });
  }
  // Verify the OTP
  const isOTPdValid = await user.verifyOTP(OTP);

  if (!isOTPdValid)
    return res.status(200).json({ success: false, message: "Invalid OTP" });

  // update confirmed to true
  user.confirm_email_token = undefined;
  user.is_email_confirmed = true;

  // save
  user.save();

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
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
      );
      let userInfo;
      // const {
      //   id: social_id,
      //   email,
      //   given_name: first_name,
      //   family_name: last_name,
      //   verified_email,
      //   picture: photo,
      // } = oauthdata;
      if (oauthdata.ok) {
        userInfo = await oauthdata.json();
      } else {
        throw new Error("Failed to fetch user information");
      }

      const {
        id: social_id,
        email,
        given_name: first_name,
        family_name: last_name,
        verified_email,
        picture: social_photo,
      } = userInfo;

      const user = await User.findOne({
        where: {
          email,
          social_id,
        },
      });

      if (!user) {
        userdata = {
          username: social_id,
          social_id,
          email,
          first_name,
          social_photo,
          last_name,
          login_type: "google",
        };
        const user = await User.create(userdata);
        sendTokenResponse(user, 200, res);
      } else {
        sendTokenResponse(user, 200, res);
      }

      break;
    case "facebook":
      // code block
      break;
    default:
    // code block
  }
  const data = await User.findOne({ where: {} });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  user = user.get({ plain: true });
  delete user.password;

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message: "Authentication successfull",
    data: { token, user },
  });
};
