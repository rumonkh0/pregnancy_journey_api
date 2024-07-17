const path = require("path");
const fs = require("fs");
const PostTopic = require("../../../models/community/Post_topic");
const asyncHandler = require("../../../middleware/async");
const { Media, Post } = require("../../../models/Association");
const User = require("../../../models/User");

// @desc      Get  PostTopic List
// @route     GET /api/v1/babylist
// @access    Private
exports.getAllReactionType = asyncHandler(async (req, res, next) => {
  const babyList = await PostTopic.findAll({
    include: [
      { model: Media, as: "media", attributes: ["id", "file_path"] },
      // {
      //   model: Post,
      //   include: { model: User, attributes: ["id", "username"] },
      //   limit: 6,
      // },
    ],
  });
  res.json({ success: true, message: "Found All Topics", data: babyList });
});

// @desc      Get  PostTopic List
// @route     GET /api/v1/babylist
// @access    Private
exports.getReactionType = asyncHandler(async (req, res, next) => {
  const babyList = await PostTopic.findOne({
    where: { id: req.params.pk },
    include: [
      { model: Media, as: "media", attributes: ["id", "file_path"] },
      {
        model: Post,
        include: { model: User, attributes: ["id", "username"] },
        limit: 6,
      },
    ],
  });
  res.json({ success: true, message: "Found Topic", data: babyList });
});

// @desc      Create reaction
// @route     POST /api/v1/babylist
// @access    Private
exports.createReactionType = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image is required",
    });
  }

  const { mimetype, filename, path: file_path, originalname } = req.file;
  req.media = {
    uploaded_by: req.admin.username,
    file_path,
    mime_type: mimetype,
    file_name: filename,
    original_name: originalname,
    file_type: path.extname(filename).slice(1),
  };

  let media = await Media.create(req.media);
  req.body.image = media.id;

  const reaction = await PostTopic.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "Post topic created", data: reaction });
});

// @desc      Update reaction
// @route     PUT /api/v1/babylist/:id
// @access    Private
exports.updateReactionType = asyncHandler(async (req, res) => {
  const id = req.params.pk;
  const newData = req.body;

  if (!req.file) {
    let updated = await PostTopic.update(newData, {
      where: { id },
    });
    if (!updated[0]) {
      res.status(404).json({ success: false, message: "Post topic not found" });
      return;
    }
    return res.json({ message: "Post topic updated" });
  }

  const { mimetype, filename, path: file_path, originalname } = req.file;
  req.media = {
    uploaded_by: req.admin.username,
    file_path,
    mime_type: mimetype,
    file_name: filename,
    original_name: originalname,
    file_type: path.extname(filename).slice(1),
  };

  let media = await Media.create(req.media);
  newData.image = media.id;

  let updated = await PostTopic.update(newData, {
    where: { id },
  });
  if (!updated[0]) {
    res.status(404).json({ success: false, message: "Post topic not found" });
    return;
  }
  res.json({ message: "Post topic updated" });
});

// @desc      Delete reaction
// @route     DELETE /api/v1/babylist/:id
// @access    Private/Admin
exports.deleteReactionType = asyncHandler(async (req, res) => {
  const id = req.params.pk;
  const deleted = await PostTopic.destroy({
    where: { id },
  });
  if (!deleted) {
    res.status(404).json({ success: false, message: "Post topic not found" });
    return;
  }
  res.json({ message: "Post topic deleted" });
});
