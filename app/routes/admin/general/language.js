const express = require("express");
const Language = require("../../../models/Language");
const router = express.Router({ mergeParams: true });
const {
  getHistory,
  getOne,
  create,
  update,
  deleteOne,
} = require("../../../controllers/crudControllerAdmin");

const { protect, authorize } = require("../../../middleware/auth");
const advancedResults = require("../../../middleware/advancedResults");

router.use(protect, authorize("superadmin", "admin", "languages"));

router.get(
  "/",
  advancedResults(Language, undefined),
  getHistory(Language, "All languages found")
);
router.get("/:modelPk", getOne(Language, "Language data found"));
router.post("/", create(Language, "Language created"));
router.put("/:modelPk", update(Language, "Language updated"));
router.delete("/:modelPk", deleteOne(Language, "Language deleted"));

module.exports = router;
