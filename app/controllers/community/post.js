// const Post = require("../../models/community/Post");
const { Post, Media } = require("../../models/Association");
const asyncHandler = require("../../middleware/async");
const Reaction = require("../../models/community/Reaction");
const Comment = require("../../models/community/Comment");
const PostMedia = require("../../models/community/PostMedia");
const path = require("path");
const fs = require("fs");
// const Media = require("../../models/Media");

// @desc      Get  Post List Of Mother
// @route     GET /api/v1/babylist
// @access    Private
exports.getAllPost = asyncHandler(async (req, res, next) => {
  const posts = await Post.findAll({
    where: { user_id: req.user.id },
    include: [{ model: Media, attributes: ["id", "file_name", "file_path"] }],
  });
  if (!post)
    return res.status(404).json({ success: false, message: "Post not found" });
  res.json({ success: true, message: "Found posts", data: posts });
});

// @desc      Get single post
// @route     GET /api/v1/babylist/:id
// @access    Private
exports.getPost = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findOne({
    where: { id },
    include: [{ model: Media, attributes: ["id", "file_name", "file_path"] }],
  });
  if (!post)
    return res.status(404).json({ success: false, message: "Post not found" });
  res.status(200).json({ success: true, message: "Post found", data: post });
});

// @desc      Create post
// @route     POST /api/v1/babylist
// @access    Private
exports.createPost = asyncHandler(async (req, res, next) => {
  const postData = req.body;
  postData.user_id = req.user.id;
  const post = await Post.create(postData);
  req.files.forEach(async (element) => {
    const { mimetype, filename, path: file_path } = element;

    let postMedia = {
      uploaded_by: req.user.username,
      file_path,
      mime_type: mimetype,
      file_name: filename,
      file_type: path.extname(filename).slice(1),
    };

    let media = await Media.create(postMedia);
    await PostMedia.create({
      post_id: post.id,
      media_id: media.id,
    });
  });

  return res.status(200).json({ success: true, message: "post created" });
  // let media, prevMedia;
  // try {
  //   userWithMedia = await User.findByPk(req.user.id, {
  //     include: [
  //       {
  //         model: Media,
  //         as: "media",
  //         required: false,
  //       },
  //     ],
  //   });

  //   media = await Media.create(req.media);
  //   req.body.photo = media.id;
  //   //delete previous photo
  //   if (userWithMedia.media) {
  //     await unlinkAsync(userWithMedia.media.file_path);
  //     await Media.destroy({ where: { id: user.photo } });
  //   }
  // } catch (err) {
  //   if (req.file && req.file && req.file.path) {
  //     const filePath = req.file.path;
  //     await unlinkAsync(filePath);
  //     console.log("File removed:", filePath);
  //   }
  //   return res
  //     .status(200)
  //     .json({ success: false, message: "data upload failed", error: err });
  // }

  // updated = await User.update(userDetailsToUpdate, {
  //   where: {
  //     id: req.user.id,
  //   },
  // });

  // res.status(201).json({ success: true, message: "Post created", data: post });
});

// @desc      Update post
// @route     PUT /api/v1/babylist/:id
// @access    Private
exports.updatePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const updated = await Post.update(newData, {
    where: { id, user_id: req.user.id },
  });
  if (!updated[0])
    return res.status(404).json({ success: false, message: "Post not found" });
  res.json({ message: "Post updated" });
});

// @desc      Delete post
// @route     DELETE /api/v1/babylist/:id
// @access    Private/Admin
exports.deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleted = await Post.destroy({
    where: { id, user_id: req.user.id },
  });
  if (!deleted)
    return res.status(404).json({ success: false, message: "Post not found" });
  res.json({ message: "Post deleted" });
});
