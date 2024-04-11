const express = require("express");
const MotherDiet = require("../../../models/tools/mother/Mother_diet");
const {
  getHistory,
  getOne,
  update,
  create,
  deleteOne,
  deleteAll,
} = require("../../../controllers/tools/mother/motherDiet");

const router = express.Router();
const { protect } = require("../../../middleware/auth");

router.use(protect);

router.get("/", getHistory(MotherDiet));
router.get("/:modelPk", getOne(MotherDiet));
router.post("/", create(MotherDiet));
// router.delete("/:modelPk", deleteOne(MotherDiet));
// router.delete("/", deleteAll(MotherDiet));
module.exports = router;
