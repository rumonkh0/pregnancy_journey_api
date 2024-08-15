const express = require("express");
const BabyGrowthWeekly = require("../../../models/babyGrowthDashboardWeekly/BabyGrowthWeekly");
const {
  getAll,
  stringify,
  getOne,
  create,
  update,
  deleteOne,
} = require("../../../controllers/crudController");

const router = express.Router();

const { protect, authorize } = require("../../../middleware/auth");
const advancedResults = require("../../../middleware/advancedResults");
const asyncHandler = require("../../../middleware/async");

router.use(protect, authorize("superadmin", "admin", "babyGrowthWeek"));

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

router.get(
  "/",
  advancedResults(BabyGrowthWeekly, undefined, "lan"),
  asyncHandler(async (req, res, next) => {
    lan = req.query.lan;
    res.advancedResults.data = res.advancedResults.data.map((obj) => {
      strarr.map((field) => {
        obj.setDataValue(field, obj[field] && JSON.parse(obj[field]));
      });

      // else
      //   strarr.map((field) => {
      //     obj.setDataValue(
      //       field,
      //       obj[field] &&
      //         (JSON.parse(obj[field])[lan]
      //           ? JSON.parse(obj[field])[lan]
      //           : JSON.parse(obj[field])["en"])
      //     );
      //   });
      // obj.setDataValue(
      //   "body_change_title",
      //   obj.body_change_title &&
      //     (JSON.parse(obj.body_change_title)[lan]
      //       ? JSON.parse(obj.body_change_title)[lan]
      //       : JSON.parse(obj.body_change_title)["en"])
      // );
      // obj.setDataValue(
      //   "body_change",
      //   obj.body_change &&
      //     (JSON.parse(obj.body_change)[lan]
      //       ? JSON.parse(obj.body_change)[lan]
      //       : JSON.parse(obj.body_change)["en"])
      // );
      return obj;
    });

    return res.status(200).json(res.advancedResults);
  })
);
router.get(
  "/:modelPk",
  getOne(BabyGrowthWeekly, "BabyGrowthWeekly data found")
);
router.post(
  "/",
  stringify(
    "body_change_title",
    "body_change",
    "baby_development",
    "baby_development_title",
    "BabyGrowthWeekly updated",
    "organ_development",
    "behaviour_development",
    "to_dos",
    "dont_dos"
  ),
  create(BabyGrowthWeekly, "BabyGrowthWeekly created")
);
router.put("/:modelPk", update(BabyGrowthWeekly));
router.delete(
  "/:modelPk",
  deleteOne(BabyGrowthWeekly, "BabyGrowthWeekly deleted")
);

module.exports = router;
