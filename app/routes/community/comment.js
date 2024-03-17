const express = require("express");
const {
  getAllComment,
  getComment,
  createComment,
  updateComment,
  deleteComment,
  checkOwner,
} = require("../../controllers/community/comment");
const router = express.Router({ mergeParams: true });
const reactionRouter = require("./reaction");
const replyRouter = require("./reply");
const { protect } = require("../../middleware/auth");

router.use("/:commentId/reaction", reactionRouter);
router.use("/:commentId/reply", replyRouter);

router.use(protect);
router.get("/", getAllComment);
router.get("/:id", getComment);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", checkOwner, deleteComment);

module.exports = router;
