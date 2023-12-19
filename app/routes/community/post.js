const express = require("express");
const {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../../controllers/community/post");
const commentRouter = require("./comment");
const reactionRouter = require("./reaction");
const router = express.Router({ mergeParams: true });
const { protect } = require("../../middleware/auth");

router.use("/:postId/comment", commentRouter);
router.use("/:postId/reaction", reactionRouter);

router.use(protect);
router.get("/", getAllPost);
router.get("/:id", getPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
