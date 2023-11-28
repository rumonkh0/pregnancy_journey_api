const express = require("express");
const { TimeoutError } = require("sequelize");
const {
  getBabyFeedsHistory,
  getSingleBabyFeed,
  createBabyFeed,
  updateBabyFeed,
  deleteBabyFeed,
  deleteAllBabyFeed,
} = require("../../controllers/baby_care/baby_feed");
const router = express.Router();
const { protect } = require("../../middleware/auth");

router.use(protect);
router.get("/:babyId", getBabyFeedsHistory);
router.get("/:babyId/:babyFeedId", getSingleBabyFeed);
router.post("/:babyId/", createBabyFeed);
router.put("/:babyId/:babyFeedId", updateBabyFeed);
router.delete("/:babyId/:feedId", deleteBabyFeed);
router.delete("/:babyId", deleteAllBabyFeed);
module.exports = router;
