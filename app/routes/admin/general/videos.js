const express = require("express");
const Video = require("../../../models/Video");

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
  authorize("superadmin", "admin", "videos"),
  stringify("title", "description")
);
router.get("/", advancedResults(Video, undefined, "lan"), getAll(Video));
router.get("/:modelPk", getOne(Video));
router.post("/", create(Video));
router.put("/:modelPk", update(Video));
router.delete("/:modelPk", deleteOne(Video));

module.exports = router;
