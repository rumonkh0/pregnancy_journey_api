const express = require("express");
const Cvaccination = require("../../models/vaccination/Child_vaccination");
const {
  getHistory,
  getOne,
  create,
  update,
  deleteOne,
  deleteAll,
} = require("../../controllers/baby_care/baby_care_controller");

const router = express.Router();
const { protect } = require("../../middleware/auth");

router.use(protect);

router.get("/:babyId", getHistory(Cvaccination));
router.get("/:babyId/:modelPk", getOne(Cvaccination));
router.post("/:babyId/", create(Cvaccination));
router.put("/:babyId/:modelPk", update(Cvaccination));
router.delete("/:babyId/:modelPk", deleteOne(Cvaccination));
router.delete("/:babyId", deleteAll(Cvaccination));
module.exports = router;