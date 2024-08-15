const express = require("express");
const SizeCompareWord = require("../../../models/babyGrowthDashboardWeekly/SizeCompareWord");
const {
  getHistory,
  getOne,
  create,
  update,
  deleteOne,
} = require("../../../controllers/crudControllerAdmin");

const router = express.Router();

const { protect, authorize } = require("../../../middleware/auth");
const advancedResults = require("../../../middleware/advancedResults");
const asyncHandler = require("../../../middleware/async");

router.use(protect, authorize("superadmin", "admin", "babyGrowthWeek"));
// getHistory(SizeCompareWord, "SizeCompareWord data found")
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    if (res.advancedResults) return res.status(200).json(res.advancedResults);
    const data = await SizeCompareWord.findAll({
      order: [["order", "asc"]],
    });
    if (!data) {
      return res.status(403).json({
        success: false,
        message: "no record found.",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Size compare words found", data });
  })
);
router.get(
  "/:modelPk",
  getOne(SizeCompareWord, "Size compare word found")
);
router.post("/", create(SizeCompareWord, "Size compare word created"));
router.put("/:modelPk", update(SizeCompareWord, "Size compare word updated"));
router.delete(
  "/:modelPk",
  deleteOne(SizeCompareWord, "Size compare word deleted")
);

module.exports = router;
