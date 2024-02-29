const PostTopic = require("../../models/community/Post_topic");
const asyncHandler = require("../../middleware/async");
const { Media } = require("../../models/Association");

// @desc      Get  PostTopic List
// @route     GET /api/v1/babylist
// @access    Private
exports.getAllReactionType = asyncHandler(async (req, res, next) => {
  const babyList = await PostTopic.findAll({
    include: { model: Media, as: "media", attributes: ["id", "file_path"] },
  });
  res.json({ success: true, message: "Found All Topics", data: babyList });
});

// @desc      Get  PostTopic List
// @route     GET /api/v1/babylist
// @access    Private
exports.getReactionType = asyncHandler(async (req, res, next) => {
  const babyList = await PostTopic.findOne({
    where: { id: req.params.pk },
    include: { model: Media, as: "media", attributes: ["id", "file_path"] },
  });
  res.json({ success: true, message: "Found Topic", data: babyList });
});

// @desc      Create reaction
// @route     POST /api/v1/babylist
// @access    Private
exports.createReactionType = asyncHandler(async (req, res, next) => {
  const reaction = await PostTopic.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "Post topic created", data: reaction });
});

// @desc      Update reaction
// @route     PUT /api/v1/babylist/:id
// @access    Private
exports.updateReactionType = asyncHandler(async (req, res) => {
  const id = req.params.babyId;
  const newData = req.body;
  const updated = await PostTopic.update(newData, {
    where: { id, mother_id: req.user.id },
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
