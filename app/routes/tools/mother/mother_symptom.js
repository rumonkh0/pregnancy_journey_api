const express = require("express");
const symptom = require("../../../models/tools/mother/Mother_symptom");
const {
  getHistory,
  getOne,
  update,
  create,
  deleteOne,
  deleteAll,
} = require("../../../controllers/crudCrontroller");

const router = express.Router();
const { protect } = require("../../../middleware/auth");

router.use(protect);

router.get("/", getHistory(symptom));
router.get("/:modelPk", getOne(symptom));
router.post("/", create(symptom));
router.put("/:modelPk", update(symptom));
router.delete("/:modelPk", deleteOne(symptom));
router.delete("/", deleteAll(symptom));
module.exports = router;
