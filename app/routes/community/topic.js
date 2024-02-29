const express = require("express");
const {
  getAllReactionType,
  createReactionType,
  updateReactionType,
  deleteReactionType,
  getReactionType
} = require("../../controllers/community/topic");
const router = express.Router({ mergeParams: true });
const { protect } = require("../../middleware/auth");

// router.use(protect);
router.get("/", getAllReactionType);
router.get("/:pk", getReactionType);
router.post("/", createReactionType);
router.put("/:pk", updateReactionType);
router.delete("/:pk", deleteReactionType);

module.exports = router;
