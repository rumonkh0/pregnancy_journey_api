const express = require("express");
const Blog = require("../../../models/blogs/Blog");

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
  authorize("superadmin", "admin", "blog"),
  stringify("title", "description")
);
router.get("/", getAll(Blog));
router.get("/:modelPk", getOne(Blog));
router.post("/", create(Blog));
router.put("/:modelPk", update(Blog));
router.delete("/:modelPk", deleteOne(Blog));

module.exports = router;
