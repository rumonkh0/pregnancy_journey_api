const ReactionType = require("../../models/community/ReactionType");
const asyncHandler = require("../../middleware/async");

// @desc      Get  ReactionType List
// @route     GET /api/v1/babylist
// @access    Private
exports.getAllReactionType = asyncHandler(async (req, res, next) => {
  const babyList = await ReactionType.findAll();
  res.json({ success: true, message: "Found Reaction Types", data: babyList });
});

// @desc      Create reaction
// @route     POST /api/v1/babylist
// @access    Private
exports.createReactionType = asyncHandler(async (req, res, next) => {
  const reaction = await ReactionType.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "ReactionType created", data: reaction });
});

// @desc      Update reaction
// @route     PUT /api/v1/babylist/:id
// @access    Private
exports.updateReactionType = asyncHandler(async (req, res) => {
  const id = req.params.babyId;
  const newData = req.body;
  const updated = await ReactionType.update(newData, {
    where: { id, mother_id: req.user.id },
  });
  if (!updated[0]) {
    res.status(404).json({ success: false, message: "ReactionType not found" });
    return;
  }
  res.json({ message: "ReactionType updated" });
});

// @desc      Delete reaction
// @route     DELETE /api/v1/babylist/:id
// @access    Private/Admin
exports.deleteReactionType = asyncHandler(async (req, res) => {
  const id = req.params.pk;
  const deleted = await ReactionType.destroy({
    where: { id },
  });
  if (!deleted) {
    res.status(404).json({ success: false, message: "ReactionType not found" });
    return;
  }
  res.json({ message: "ReactionType deleted" });
});
