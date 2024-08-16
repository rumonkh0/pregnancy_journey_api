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
      return obj;
    });

    return res.status(200).json(res.advancedResults);
  })
);
router.get(
  "/:modelPk",
  asyncHandler(async (req, res, next) => {
    lan = req.query.lan;
    const data = await BabyGrowthWeekly.findByPk(req.params.modelPk);

    strarr.map((field) => {
      data.setDataValue(
        field,
        data[field] &&
          (JSON.parse(data[field])[lan]
            ? JSON.parse(data[field])[lan]
            : JSON.parse(data[field])["en"])
      );
    });

    return res.status(200).json({ success: true, data });
  })
);
router.post(
  "/",
  stringify(...strarr),
  create(BabyGrowthWeekly, "BabyGrowthWeekly created")
);
router.put("/:modelPk", update(BabyGrowthWeekly));
router.delete(
  "/:modelPk",
  deleteOne(BabyGrowthWeekly, "BabyGrowthWeekly deleted")
);

module.exports = router;
