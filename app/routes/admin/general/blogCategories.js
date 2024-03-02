const express = require("express");
const blogCategories = require("../../../models/blogs/Blog_category");

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
  authorize("superadmin", "admin", "blogcategory"),
  stringify("title", "description")
);
router.get(
  "/",
  advancedResults(blogCategories, undefined, "lan"),
  getAll(blogCategories)
);
router.get("/:modelPk", getOne(blogCategories));
router.post("/", create(blogCategories));
router.put("/:modelPk", update(blogCategories));
router.delete("/:modelPk", deleteOne(blogCategories));

module.exports = router;
