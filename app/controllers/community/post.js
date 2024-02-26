// const Post = require("../../models/community/Post");
const { Post, Media } = require("../../models/Association");
const asyncHandler = require("../../middleware/async");
const Reaction = require("../../models/community/Reaction");
const Comment = require("../../models/community/Comment");
const PostMedia = require("../../models/community/PostMedia");
const path = require("path");
const fs = require("fs");
const User = require("../../models/User");
const ReactionType = require("../../models/community/ReactionType");
// const Media = require("../../models/Media");

// @desc      Get  Post List Of Mother
// @route     GET /api/v1/babylist
// @access    Private
exports.getAllPost = asyncHandler(async (req, res, next) => {
  return res.status(200).json(res.advancedResults);
});

// @desc      Get single post
// @route     GET /api/v1/babylist/:id
// @access    Private
exports.getPost = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findOne({
    where: { id },
    include: [
      { model: Media, attributes: ["id", "file_name", "file_path"] },
      { model: User, attributes: ["id", "username"] },
      {
        model: Reaction,
        include: [
          { model: User, attributes: ["id", "username"] },
          { model: ReactionType, attributes: ["type_name"] },
        ],
      },
      {
        model: Comment,
        include: [{ model: User, attributes: ["id", "username"] }],
      },
    ],
  });
  const total_reaction = await Reaction.count({ where: { post_id: id } });
  const total_comment = await Comment.count({
    where: { post_id: id },
  });
  if (!post)
    return res.status(404).json({ success: false, message: "Post not found" });
  res.status(200).json({
    success: true,
    message: "Post found",
    data: { post, total_reaction, total_comment },
  });
});

// @desc      Create post
// @route     POST /api/v1/babylist
// @access    Private
exports.createPost = asyncHandler(async (req, res, next) => {
  const postData = req.body;
  postData.user_id = req.user.id;
  let post = await Post.create(postData);
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

  const fpost = await Post.findOne({
    where: { id: post.id },
    include: [{ model: Media, attributes: ["id", "file_name", "file_path"] }],
  });

  return res
    .status(200)
    .json({ success: true, message: "post created", data: fpost });
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
