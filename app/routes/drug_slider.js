const express = require("express");
const DrugSlider = require("../models/Drug_slider");
const {
  getHistory,
  getOne,
  create,
  update,
  deleteOne,
  deleteAll,
} = require("../controllers/crudCrontroller");

const router = express.Router();
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/:babyId", getHistory(DrugSlider));
router.get("/:babyId/:modelPk", getOne(DrugSlider));
router.post("/:babyId/", create(DrugSlider));
router.put("/:babyId/:modelPk", update(DrugSlider));
router.delete("/:babyId/:modelPk", deleteOne(DrugSlider));
router.delete("/:babyId", deleteAll(DrugSlider));
module.exports = router;
