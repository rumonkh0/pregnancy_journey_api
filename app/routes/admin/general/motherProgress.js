const express = require("express");
const MotherProgress = require("../../../models/progress_timeline/Mother_progress_timeline");

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

router.use(
  protect,
  authorize("superadmin", "admin", "motherprogress"),
  stringify("title", "description")
);
router.get("/", getAll(MotherProgress));
router.get("/:modelPk", getOne(MotherProgress));
router.post("/", create(MotherProgress));
router.put("/:modelPk", update(MotherProgress));
router.delete("/:modelPk", deleteOne(MotherProgress));

module.exports = router;
