const express = require("express");
const DrugSlider = require("../../../models/Drug_slider");

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
  authorize("superadmin", "admin", "dailytips"),
  stringify("title", "description")
);
router.get(
  "/",
  advancedResults(DrugSlider, undefined, "lan"),
  getAll(DrugSlider)
);
router.get("/:modelPk", getOne(DrugSlider));
router.post("/", create(DrugSlider));
router.put("/:modelPk", update(DrugSlider));
router.delete("/:modelPk", deleteOne(DrugSlider));

module.exports = router;
