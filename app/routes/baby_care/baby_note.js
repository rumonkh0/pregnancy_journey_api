const express = require("express");
const BabyNote = require("../../models/Baby_care_models/Baby_note");
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

router.get("/:babyId", getHistory(BabyNote));
router.get("/:babyId/:modelPk", getOne(BabyNote));
router.post("/:babyId/", create(BabyNote));
router.put("/:babyId/:modelPk", update(BabyNote));
router.delete("/:babyId/:modelPk", deleteOne(BabyNote));
router.delete("/:babyId", deleteAll(BabyNote));
module.exports = router;
