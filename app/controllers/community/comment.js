const Comment = require("../../models/community/Comment");
const asyncHandler = require("../../middleware/async");

// @desc      Get  Comment List Of Mother
// @route     GET /api/v1/babylist
// @access    Private
exports.getAllComment = asyncHandler(async (req, res, next) => {
  const comments = await Comment.findAll({
    where: { post_id: req.params.postId },
  });
  res.json({ success: true, message: "Found comments", data: comments });
});

// @desc      Get single comment
// @route     GET /api/v1/babylist/:id
// @access    Private
exports.getComment = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const comment = await Comment.findAll({
    where: { id },
  });
  if (!comment.length)
    return res

    
      .status(404)
      .json({ success: false, message: "Comment not found" });
  res
    .status(200)
    .json({ success: true, message: "Comment found", data: comment });
});

// @desc      Create comment
// @route     POST /api/v1/babylist
// @access    Private
exports.createComment = asyncHandler(async (req, res, next) => {
  const commentData = req.body;
  commentData.user_id = req.user.id;
  commentData.post_id = req.params.postId;
  console.log(req.body);
  const comment = await Comment.create(commentData);
  res
    .status(201)
    .json({ success: true, message: "Comment created", data: comment });
});

// @desc      Update comment
// @route     PUT /api/v1/babylist/:id
// @access    Private
exports.updateComment = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const updated = await Comment.update(newData, {
    where: { id, user_id: req.user.id },
  });
  if (!updated[0])
    return res
      .status(404)
      .json({ success: false, message: "Comment not found" });
  res.json({ message: "Comment updated" });
});

// @desc      Delete comment
// @route     DELETE /api/v1/babylist/:id
// @access    Private/Admin
exports.deleteComment = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleted = await Comment.destroy({
    where: { id, user_id: req.user.id },
  });
  if (!deleted)
    return res
      .status(404)
      .json({ success: false, message: "Comment not found" });
  res.json({ message: "Comment deleted" });
});
