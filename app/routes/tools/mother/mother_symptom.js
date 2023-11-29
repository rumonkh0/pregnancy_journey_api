const express = require("express");
const symptom = require("../../../models/tools/mother/Mother_symptom");
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

router.get("/", getHistory(symptom));
router.get("/:pk", getOne(symptom));
router.post("/", create(symptom));
router.put("/:pk", update(symptom));
router.delete("/:pk", deleteOne(symptom));
router.delete("/", deleteAll(symptom));
module.exports = router;
