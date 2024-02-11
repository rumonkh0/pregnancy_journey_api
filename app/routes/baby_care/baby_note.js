const express = require("express");
const BabyNote = require("../../models/Baby_care_models/Baby_note");
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

router.get("/:babyId", checkBabyOwner, getHistory(BabyNote));
router.get("/:babyId/:modelPk", checkBabyOwner, getOne(BabyNote));
router.post("/:babyId/", checkBabyOwner, create(BabyNote));
router.put("/:babyId/:modelPk", checkBabyOwner, update(BabyNote));
router.delete("/:babyId/:modelPk", checkBabyOwner, deleteOne(BabyNote));
router.delete("/:babyId", checkBabyOwner, deleteAll(BabyNote));
module.exports = router;
