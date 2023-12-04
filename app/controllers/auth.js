const crypto = require("crypto");
const { Op } = require("sequelize");
const ErrorResponse = require("../resource/utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const sendEmail = require("../resource/utils/sendEmail");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  // const {username, first_name, last_name,age,gender,photo, child_number, edd_date,email, password, language, pregnency_loss, baby_already_born,
  //   login_type, user_type, subscription, password_reset_token, confirm_email_token, lmp_date,
  // Other fields from req.body
  // } = req.body;

  // Create a new user with the data from req.body
  const user = await User.create(req.body);

  // grab token and send to email
  const OTP = await user.getOTP();

  const message = `You are receiving this email because you need to confirm your email address. Heres your OTP: \n\n ${OTP}`;

  user.save();

  const sendResult = await sendEmail({
    email: user.email,
    subject: "Email confirmation OTP",
    message,
  });

  sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req);

  // Validate emil & password
  if (!username || !password) {
    return next(
      new ErrorResponse("Please provide an username and password", 400)
    );
  }
  //Find user from database
  const user = await User.scope("withPassword").findOne({
    where: { username },
  });
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  //Match hash password
  const isMatch = await user.verifyPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
};

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
    data: {},
  });
});

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  // user is already available in req due to the protect middleware
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = async (req, res, next) => {
  try {
    const userDetailsToUpdate = req.body; // Contains the updated details

    // Find the user by username
    const user = await User.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user details
    await user.update(userDetailsToUpdate);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body; // Contains old and new passwords

    // Find the user by username
    // const user = await User.findByUsername(username);
    const user = await User.scope("withPassword").findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Verify the old password
    const isPasswordValid = await user.verifyPassword(oldPassword);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid old password" });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};
/**
 *@desc      Forgot password
 *@route     POST /api/v1/auth/forgotpassword
 *@access    Public
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ where: { username: req.body.username } });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }
  // Get reset token
  const OTP = await user.getOTP();

  await user.save();

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. your OTP is : \n\n ${OTP}\n\n Make sure to reset the password within 10 minits`;

  res.status(200).json({ success: true, data: "Email sent" });

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset OTP",
      message,
    });

    res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    console.log(err);
    user.password_reset_token = undefined;

    await user.save();

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

  const user = await User.scope("withPassword").findOne({
    where: {
      username,
      reset_password_expire: { [Op.gt]: new Date() },
    },
  });

  if (!user) {
    return next(new ErrorResponse("No user found", 400));
  }

  // Verify the OTP
  const isOTPdValid = await user.verifyOTP(OTP);

  if (!isOTPdValid)
    return res.status(200).json({ success: false, message: "Invalid OTP" });

  // Set new password
  user.password = newPassword;
  user.password_reset_token = undefined;
  //  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
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

  // get user by OTP
  const user = await User.findOne({
    where: {
      username,
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
  sendTokenResponse(user, 200, res);
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

      console.log(user);

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

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    data: { token, user },
  });
};
