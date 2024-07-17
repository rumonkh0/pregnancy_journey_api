const User = require("../../models/User");
const path = require("path");
const { promisify } = require("util");
const fs = require("fs");
const unlinkAsync = promisify(fs.unlink);
const Baby = require("../../models/Baby");
const asyncHandler = require("../../middleware/async");
const Media = require("../../models/Media");
const { where } = require("sequelize");
// @desc      Get all users
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
  // try {
  //   const users = await User.findAll();
  //   res.json(users);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
});

// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const id = req.params.userId;
  const user = await User.findOne({
    where: { id },
    include: [
      { model: Baby, as: "baby_lists" },
      { model: Media, as: "media" },
    ],
  });
  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }
  res.status(200).json({ success: true, data: user });
});

// @desc      Create user
// @route     POST /api/v1/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const userData = req.body;
  const user = await User.create(userData);
  res.status(201).json({ success: true, message: "User created", data: user });
});

// @desc      Update user
// @route     PUT /api/v1/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
  const id = req.params.userId;
  const userDetailsToUpdate = req.body;
  // Find the user by username
  const user = await User.findOne({
    where: { id },
    include: { model: Media, as: "media" },
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
      error: "User not found",
    });
  }
  let userData;

  if (!req.file) {
    updated = await User.update(userDetailsToUpdate, {
      where: {
        id,
      },
    });

    if (!updated[0]) {
      return res
        .status(304)
        .json({ success: false, message: "Recond no modified" });
    }

    userData = await User.findByPk(id);

    return res.status(200).json({
      success: true,
      message: "User information updated successfully",
      data: userData,
    });
  }

  const { mimetype, filename, path: file_path, originalname } = req.file;
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
    original_name: originalname,
    file_type: path.extname(filename).slice(1),
  };

  let media, prevMedia;
  try {
    userWithMedia = await User.findByPk(id, {
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
    // delete previous photo
    if (userWithMedia.media) {
      try {
        await unlinkAsync(userWithMedia.media.file_path);
      } catch (error) {
        console.log("No prev file found");
      }

      await Media.destroy({ where: { id: user.photo } });
    }
  } catch (err) {
    // console.log(err);
    if (req.file && req.file.path) {
      const filePath = req.file.path;
      await unlinkAsync(filePath);
    }
    return res.status(200).json({
      remark: "UNSUCCESSFULL",
      success: false,
      message: "data upload failed",
      error: err,
    });
  }

  updated = await User.update(userDetailsToUpdate, {
    where: {
      id,
    },
  });

  if (!updated[0]) {
    return res
      .status(304)
      .json({ success: false, message: "Recond no modified" });
  }

  userData = await User.findByPk(id, {
    include: { model: Media, as: "media" },
  });

  res.status(200).json({
    success: true,
    message: "Data updated",
    data: userData,
  });
});

// @desc      Delete user
// @route     DELETE /api/v1/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.userId;
  const deleted = await User.destroy({ where: { id } });
  if (!deleted) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }
  res.status(200).json({ success: true, message: "User deleted" });
});
