const express = require("express");
const a2zCategories = require("../../../models/blogs/A2zCategory");

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
  authorize("superadmin", "admin", "a2zcategory"),
  stringify("title", "description")
);
router.get(
  "/",
  advancedResults(a2zCategories, undefined, "lan"),
  getAll(a2zCategories)
);
router.get("/:modelPk", getOne(a2zCategories));
router.post("/", create(a2zCategories));
router.put("/:modelPk", update(a2zCategories));
router.delete("/:modelPk", deleteOne(a2zCategories));

module.exports = router;
