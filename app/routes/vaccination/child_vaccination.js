const express = require("express");
const Cvaccination = require("../../models/vaccination/Child_vaccination");
const {
  getHistory,
  getOne,
  create,
  update,
  deleteOne,
  deleteAll,
  checkBabyOwner,
} = require("../../controllers/baby_care/baby_care_controller");

const router = express.Router();
const { protect } = require("../../middleware/auth");

router.use(protect);

router.get("/:babyId", checkBabyOwner, getHistory(Cvaccination));
router.get("/:babyId/:modelPk", checkBabyOwner, getOne(Cvaccination));
router.post("/:babyId/", checkBabyOwner, create(Cvaccination));
router.put("/:babyId/:modelPk", checkBabyOwner, update(Cvaccination));
router.delete("/:babyId/:modelPk", checkBabyOwner, deleteOne(Cvaccination));
router.delete("/:babyId", checkBabyOwner, deleteAll(Cvaccination));
module.exports = router;
