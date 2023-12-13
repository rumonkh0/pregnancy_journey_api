const Post = require("../../models/community/Post");
const asyncHandler = require("../../middleware/async");

// @desc      Get  Post List Of Mother
// @route     GET /api/v1/babylist
// @access    Private
exports.getAllPost = asyncHandler(async (req, res, next) => {
  const posts = await Post.findAll();
  res.json({ success: true, message: "Found posts", data: posts });
});

// @desc      Get single post
// @route     GET /api/v1/babylist/:id
// @access    Private
exports.getPost = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findAll({
    where: { id },
  });
  if (!post.length)
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
  res.status(201).json({ success: true, message: "Post created", data: post });
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
