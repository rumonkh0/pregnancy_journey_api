const express = require("express");

const router = express.Router();
const { protect } = require("../middleware/auth");
const asyncHandler = require("../middleware/async");
const BabyGrowthWeekly = require("../models/babyGrowthDashboardWeekly/BabyGrowthWeekly");

router.use(protect);

router.get(
  "/sizeguide/:week",
  asyncHandler(async (req, res, next) => {})
);
router.get(
  "/development/:week",
  asyncHandler(async (req, res, next) => {})
);
router.get(
  "/bodychange/:week",
  asyncHandler(async (req, res, next) => {
    BabyGrowthWeekly.findOne({ where: { week: req.params.week } });
  })
);
module.exports = router;
