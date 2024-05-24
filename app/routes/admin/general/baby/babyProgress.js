const express = require("express");
const BabyProgress = require("../../../models/progress_timeline/Baby_progress_timeline");

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
  authorize("superadmin", "admin", "babyprogress"),
  stringify("title", "description")
);
router.get(
  "/",
  advancedResults(BabyProgress, undefined, "lan"),
  getAll(BabyProgress)
);
router.get("/:modelPk", getOne(BabyProgress));
router.post("/", create(BabyProgress));
router.put("/:modelPk", update(BabyProgress));
router.delete("/:modelPk", deleteOne(BabyProgress));

module.exports = router;
