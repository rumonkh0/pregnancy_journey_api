const express = require("express");
const {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../../controllers/community/post");
const router = express.Router({ mergeParams: true });
const { protect } = require("../../middleware/auth");

router.use(protect);
router.get("/", getAllPost);
router.get("/:id", getPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
