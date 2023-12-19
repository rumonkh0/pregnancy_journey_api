const express = require("express");
const {
  getAllReaction,
  getReaction,
  createReaction,
  updateReaction,
  deleteReaction,
} = require("../../controllers/community/reaction");
const router = express.Router({ mergeParams: true });
const { protect } = require("../../middleware/auth");

router.use(protect);
router.get("/", getAllReaction);
router.get("/:id", getReaction);
router.post("/:reactionType", createReaction);
router.put("/:id", updateReaction);
router.delete("/:id", deleteReaction);

module.exports = router;
