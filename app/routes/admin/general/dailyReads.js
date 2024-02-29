const express = require("express");
const DailyReads = require("../../../models/daily/Daily_read");

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
  authorize("superadmin", "admin", "dailyreads"),
  stringify("title", "description")
);
router.get(
  "/",
  advancedResults(DailyReads, undefined, "lan"),
  getAll(DailyReads)
);
router.get("/:modelPk", getOne(DailyReads));
router.post("/", create(DailyReads));
router.put("/:modelPk", update(DailyReads));
router.delete("/:modelPk", deleteOne(DailyReads));

module.exports = router;
