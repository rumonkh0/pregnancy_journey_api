const express = require("express");
const BabyMedication = require("../../models/Baby_care_models/Baby_medication");
const {
  getHistory,
  getOne,
  update,
  create,
  deleteOne,
  deleteAll,
  checkBabyOwner,
} = require("../../controllers/baby_care/baby_care_controller");

const router = express.Router();
const { protect } = require("../../middleware/auth");

router.use(protect);

router.get("/:babyId", checkBabyOwner, getHistory(BabyMedication));
router.get("/:babyId/:modelPk", checkBabyOwner, getOne(BabyMedication));
router.post("/:babyId/", checkBabyOwner, create(BabyMedication));
router.put("/:babyId/:modelPk", checkBabyOwner, update(BabyMedication));
router.delete("/:babyId/:modelPk", checkBabyOwner, deleteOne(BabyMedication));
router.delete("/:babyId", checkBabyOwner, deleteAll(BabyMedication));
module.exports = router;
