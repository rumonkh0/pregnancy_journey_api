const express = require("express");
const BabyTemp = require("../../models/Baby_care_models/Baby_temperature");
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

router.get("/:babyId", getHistory(BabyTemp));
router.get("/:babyId/:modelPk", getOne(BabyTemp));
router.post("/:babyId/", create(BabyTemp));
router.put("/:babyId/:modelPk", update(BabyTemp));
router.delete("/:babyId/:modelPk", deleteOne(BabyTemp));
router.delete("/:babyId", deleteAll(BabyTemp));
module.exports = router;
