const express = require("express");

const BlogCategories = require("../../../../models/blogs/Baby_Blog_category");
const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  stringify,
} = require("../../../../controllers/crudController");

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../../../../middleware/auth");
const advancedResults = require("../../../../middleware/advancedResults");

router.use(
  protect,
  authorize("superadmin", "admin", "blogcategory"),
  stringify("title", "description")
);
router.get(
  "/",
  advancedResults(BlogCategories, undefined, "lan"),
  getAll(BlogCategories)
);
router.get("/:modelPk", getOne(BlogCategories));
router.post("/", create(BlogCategories));
router.put("/:modelPk", update(BlogCategories));
router.delete("/:modelPk", deleteOne(BlogCategories));

module.exports = router;
