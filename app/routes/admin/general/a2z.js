const express = require("express");
const A2z = require("../../../models/blogs/A2z");

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
const Media = require("../../../models/Media");

router.use(
  protect,
  authorize("superadmin", "admin", "a2z"),
  stringify("title", "description")
);
const populate = {
  model: Media,
  as: "media",
};

router.get("/", advancedResults(A2z, populate, "lan"), getAll(A2z));
router.get("/:modelPk", getOne(A2z));
router.post("/", create(A2z));
router.put("/:modelPk", update(A2z));
router.delete("/:modelPk", deleteOne(A2z));

module.exports = router;
