const express = require("express");
const BabySleep = require("../../models/Baby_care_models/Baby_sleep");
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

router.get("/:babyId", checkBabyOwner, getHistory(BabySleep));
router.get("/:babyId/:modelPk", checkBabyOwner, getOne(BabySleep));
router.post("/:babyId/", checkBabyOwner, create(BabySleep));
router.put("/:babyId/:modelPk", checkBabyOwner, update(BabySleep));
router.delete("/:babyId/:modelPk", checkBabyOwner, deleteOne(BabySleep));
router.delete("/:babyId", checkBabyOwner, deleteAll(BabySleep));
module.exports = router;
