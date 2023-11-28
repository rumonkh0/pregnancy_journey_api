const express = require("express");
const BabySleep = require("../../models/Baby_care_models/Baby_sleep");
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

router.get("/:babyId", getHistory(BabySleep));
router.get("/:babyId/:modelPk", getOne(BabySleep));
router.post("/:babyId/", create(BabySleep));
router.put("/:babyId/:modelPk", update(BabySleep));
router.delete("/:babyId/:modelPk", deleteOne(BabySleep));
router.delete("/:babyId", deleteAll(BabySleep));
module.exports = router;
