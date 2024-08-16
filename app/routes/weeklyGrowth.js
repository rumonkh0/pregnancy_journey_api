const express = require("express");

const router = express.Router();
const { protect } = require("../middleware/auth");
const asyncHandler = require("../middleware/async");
const BabyGrowthWeekly = require("../models/babyGrowthDashboardWeekly/BabyGrowthWeekly");

router.use(protect);
const strarr = [
  "body_change_title",
  "body_change",
  "baby_development",
  "baby_development_title",
  "BabyGrowthWeekly updated",
  "organ_development",
  "behaviour_development",
  "to_dos",
  "dont_dos",
];

const sizeGuideArr = [
  "id",
  "week",
  "organ_development",
  "behaviour_development",
];
const devarr = [
  "id",
  "week",
  "weight",
  "size",
  "baby_development_title",
  "baby_development",
];
const bodychangeArr = [
  "id",
  "week",
  "body_change_title",
  "body_change",
  "to_dos",
  "dont_dos",
];

router.get(
  "/sizeguide/:week",
  asyncHandler(async (req, res, next) => {
    lan = req.query.lan;
    const data = await BabyGrowthWeekly.findOne({
      where: { week: req.params.week },
      attributes: [...sizeGuideArr],
    });

    // filter language data
    strarr.map((field) => {
      data.setDataValue(
        field,
        data[field] &&
          (JSON.parse(data[field])[lan]
            ? JSON.parse(data[field])[lan]
            : JSON.parse(data[field])["en"])
      );
    });
    return res.status(200).json({
      remark: "SUCCESSFULL",
      message: "Bodychange data found",
      data,
    });
  })
);
router.get(
  "/development/:week",
  asyncHandler(async (req, res, next) => {
    lan = req.query.lan;
    const data = await BabyGrowthWeekly.findOne({
      where: { week: req.params.week },
      attributes: [...devarr],
    });

    // filter language data
    strarr.map((field) => {
      data.setDataValue(
        field,
        data[field] &&
          (JSON.parse(data[field])[lan]
            ? JSON.parse(data[field])[lan]
            : JSON.parse(data[field])["en"])
      );
    });
    return res.status(200).json({
      remark: "SUCCESSFULL",
      message: "Bodychange data found",
      data,
    });
  })
);
router.get(
  "/bodychange/:week",
  asyncHandler(async (req, res, next) => {
    lan = req.query.lan;
    const data = await BabyGrowthWeekly.findOne({
      where: { week: req.params.week },
      attributes: [...bodychangeArr],
    });

    // filter language data
    strarr.map((field) => {
      data.setDataValue(
        field,
        data[field] &&
          (JSON.parse(data[field])[lan]
            ? JSON.parse(data[field])[lan]
            : JSON.parse(data[field])["en"])
      );
    });
    return res.status(200).json({
      remark: "SUCCESSFULL",
      message: "Bodychange data found",
      data,
    });
  })
);
module.exports = router;
