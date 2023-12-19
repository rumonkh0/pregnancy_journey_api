const express = require("express");
const {
  getAllComment,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../../controllers/community/comment");
const router = express.Router({ mergeParams: true });
const reactionRouter = require("./reaction");
const { protect } = require("../../middleware/auth");

router.use("/:commentId/reaction", reactionRouter);

router.use(protect);
router.get("/", getAllComment);
router.get("/:id", getComment);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
