const express = require("express");
const DailyTips = require("../../../models/daily/Daily_tip");

const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  stringify,
} = require("../../../controllers/crudController");

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../../../middleware/auth");
const advancedResults = require("../../../middleware/advancedResults");

router.use(
  protect,
  authorize("superadmin", "admin", "dailytips"),
  stringify("title", "description")
);
router.get(
  "/",
  advancedResults(DailyTips, undefined, "lan"),
  getAll(DailyTips)
);
router.get("/:modelPk", getOne(DailyTips));
router.post("/", create(DailyTips));
router.put("/:modelPk", update(DailyTips));
router.delete("/:modelPk", deleteOne(DailyTips));

module.exports = router;
