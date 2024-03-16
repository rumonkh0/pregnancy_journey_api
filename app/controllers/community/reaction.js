const Reaction = require("../../models/community/Reaction");
const asyncHandler = require("../../middleware/async");
const { Op } = require("sequelize");
const { Post } = require("../../models/Association");
const Comment = require("../../models/community/Comment");
const User = require("../../models/User");
const ReactionType = require("../../models/community/ReactionType");

// @desc      Get  Reaction List Of Mother
// @route     GET /api/v1/babylist
// @access    Private
exports.getAllReaction = asyncHandler(async (req, res, next) => {
  if (req.params.postId) {
    const reactions = await Reaction.findAll({
      where: {
        [Op.and]: [{ post_id: req.params.postId }, { comment_id: null }],
      },
      include: [
        {
          model: User,
          attributes: ["id", "username", "first_name", "last_name"],
        },
        { model: ReactionType, attributes: ["type_name"] },
      ],
    });
    return res.json({
      success: true,
      message: "Found Post reactions",
      data: reactions,
    });
  }

  if (req.params.commentId) {
    const reactions = await Reaction.findAll({
      where: { comment_id: req.params.commentId },
      include: [
        {
          model: User,
          attributes: ["id", "username", "first_name", "last_name"],
        },
        { model: ReactionType, attributes: ["type_name"] },
      ],
    });
    return res.json({
      success: true,
      message: "Found Comment reactions",
      data: reactions,
    });
  }
});

// @desc      Get single reaction
// @route     GET /api/v1/babylist/:id
// @access    Private
exports.getReaction = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const reaction = await Reaction.findAll({
    where: { id },
  });
  if (!reaction.length)
    return res

      .status(404)
      .json({ success: false, message: "Reaction not found" });
  res
    .status(200)
    .json({ success: true, message: "Reaction found", data: reaction });
});

// @desc      Create reaction
// @route     POST /api/v1/babylist
// @access    Private
exports.createReaction = asyncHandler(async (req, res, next) => {
  const reactionData = req.body;
  reactionData.user_id = req.user.id;
  reactionData.post_id = req.params.postId;
  reactionData.type = req.params.reactionType;
  reactionData.comment_id = req.params.commentId;

  if (reactionData.post_id) {
    let available = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!available) {
      return res.status(200).json({ success: false, message: "No post found" });
    }

    let prevData = await Reaction.findOne({
      where: { user_id: req.user.id, post_id: req.params.postId },
    });

    // console.log(prevData);
    if (prevData) {
      if (prevData.type == reactionData.type) {
        const deleteData = await Reaction.findOne({
          where: { user_id: req.user.id, post_id: req.params.postId },
        });

        await deleteData.destroy();

        return res.status(200).json({
          remark: "UNREACTED",
          success: true,
          message: "Post Reaction updated",
        });
      } else {
        await Reaction.update(req.body, {
          where: { user_id: req.user.id, post_id: req.params.postId },
        });
        return res.status(200).json({
          remark: "REACTED",
          success: true,
          message: "Post Reaction submitted",
        });
      }
    }
  }

  if (reactionData.comment_id) {
    let available = await Comment.findOne({
      where: { id: req.params.commentId },
    });

    if (!available) {
      return res
        .status(200)
        .json({ success: false, message: "No comment found" });
    }
    let prevData = await Reaction.findOne({
      where: { user_id: req.user.id, comment_id: req.params.commentId },
    });

    if (prevData) {
      if (prevData.type == reactionData.type) {
        const deleteData = await Reaction.findOne({
          where: { user_id: req.user.id, comment_id: req.params.commentId },
        });
        await deleteData.destroy();
        return res.status(200).json({
          remark: "UNREACTED",
          success: true,
          message: "Comment Reaction updated",
        });
      } else {
        await Reaction.update(req.body, {
          where: { user_id: req.user.id, comment_id: req.params.commentId },
        });
        return res.status(200).json({
          remark: "REACTED",
          success: true,
          message: "Comment Reaction submitted",
        });
      }
      // await Reaction.update(req.body, {
      //   where: { user_id: req.user.id, comment_id: req.params.commentId },
      // });
      // return res
      //   .status(200)
      //   .json({ success: true, message: "Comment Reaction updated" });
    }
  }

  const reaction = await Reaction.create(reactionData);
  res.status(201).json({
    remark: "REACTED",
    success: true,
    message: "Reaction created",
    data: reaction,
  });
});

// @desc      Update reaction
// @route     PUT /api/v1/babylist/:id
// @access    Private
exports.updateReaction = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const updated = await Reaction.update(newData, {
    where: { id, user_id: req.user.id },
  });
  if (!updated[0])
    return res
      .status(404)
      .json({ success: false, message: "Reaction not found" });
  res.json({ message: "Reaction updated" });
});

// @desc      Delete reaction
// @route     DELETE /api/v1/babylist/:id
// @access    Private/Admin
exports.deleteReaction = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleted = await Reaction.destroy({
    where: { id, user_id: req.user.id },
  });
  if (!deleted)
    return res
      .status(404)
      .json({ success: false, message: "Reaction not found" });
  res.json({ message: "Reaction deleted" });
});
