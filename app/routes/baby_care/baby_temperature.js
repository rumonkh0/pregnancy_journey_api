const express = require("express");
const BabyTemp = require("../../models/Baby_care_models/Baby_temperature");
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

router.get("/:babyId", checkBabyOwner, getHistory(BabyTemp));
router.get("/:babyId/:modelPk", checkBabyOwner, getOne(BabyTemp));
router.post("/:babyId", checkBabyOwner, create(BabyTemp));
router.put("/:babyId/:modelPk", checkBabyOwner, update(BabyTemp));
router.delete("/:babyId/:modelPk", checkBabyOwner, deleteOne(BabyTemp));
router.delete("/:babyId", checkBabyOwner, deleteAll(BabyTemp));
module.exports = router;
