const express = require("express");
const {
  getAllReply,
  getReply,
  createReply,
  updateReply,
  deleteReply,
  checkOwner,
} = require("../../controllers/community/reply");
const router = express.Router({ mergeParams: true });
const reactionRouter = require("./reaction");
const replyRouter = require("./reply");
const { protect } = require("../../middleware/auth");

// router.use("/:commentId/reaction", reactionRouter);
// router.use("/:commentId/reply", replyRouter);

router.use(protect);
router.get("/", getAllReply);
router.get("/:id", getReply);
router.post("/", createReply);
router.put("/:id", updateReply);
router.delete("/:id", checkOwner, deleteReply);

module.exports = router;
