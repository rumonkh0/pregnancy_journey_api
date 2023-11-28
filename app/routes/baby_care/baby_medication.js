const express = require("express");
const BabyMedication = require("../../models/Baby_care_models/Baby_medication");
const {
  getHistory,
  getOne,
  update,
  create,
  deleteOne,
  deleteAll,
} = require("../../controllers/baby_care/baby_care_controller");

const router = express.Router();
const { protect } = require("../../middleware/auth");

router.use(protect);

router.get("/:babyId", getHistory(BabyMedication));
router.get("/:babyId/:modelPk", getOne(BabyMedication));
router.post("/:babyId/", create(BabyMedication));
router.put("/:babyId/:modelPk", update(BabyMedication));
router.delete("/:babyId/:modelPk", deleteOne(BabyMedication));
router.delete("/:babyId", deleteAll(BabyMedication));
module.exports = router;
