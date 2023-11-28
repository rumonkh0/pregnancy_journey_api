const express = require("express");
const {
  getBabySymptomsHistory,
  getSingleSymptom,
  createBabySymptom,
  updateBabySymptom,
  deleteBabySymptom,
  deleteAllBabySymptom,
} = require("../../controllers/baby_care/baby_symptom");
const router = express.Router();
const { protect } = require("../../middleware/auth");

router.use(protect);

router.get("/:symptomId", getBabySymptomsHistory);
router.get("/:babyId/:symptomId", getSingleSymptom);
router.post("/:babyId/", createBabySymptom);
router.put("/:babyId/:symptomId", updateBabySymptom);
router.delete("/:babyId/:symptomId", deleteBabySymptom);
router.delete("/:babyId", deleteAllBabySymptom);
module.exports = router;
