const express = require("express");
const Symptom = require("../../../models/tools/mother/Mother_symptom");
const {
  getHistory,
  getOne,
  update,
  create,
  deleteOne,
  deleteAll,
} = require("../../../controllers/tools/mother/crudController");

const router = express.Router();
const { protect } = require("../../../middleware/auth");

router.use(protect);

router.get("/", getHistory(Symptom));
router.get("/:modelPk", getOne(Symptom));
router.post("/", create(Symptom));
router.put("/:modelPk", update(Symptom));
router.delete("/:modelPk", deleteOne(Symptom));
router.delete("/", deleteAll(Symptom));
module.exports = router;
