const express = require("express");
const WarningSign = require("../../../models/Warning_sign");
const router = express.Router({ mergeParams: true });
const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  stringify,
} = require("../../../controllers/crudController");

const { protect, authorize } = require("../../../middleware/auth");
const advancedResults = require("../../../middleware/advancedResults");

router.use(
  protect,
  authorize("superadmin", "admin", "warningsign"),
  stringify("title", "description")
);

router.get(
  "/",
  advancedResults(WarningSign, undefined, "lan"),
  getAll(WarningSign)
);
router.get("/:modelPk", getOne(WarningSign));
router.post("/", create(WarningSign));
router.put("/:modelPk", update(WarningSign));
router.delete("/:modelPk", deleteOne(WarningSign));

module.exports = router;
