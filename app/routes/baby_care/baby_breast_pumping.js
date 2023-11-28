const express = require("express");
const {
  getBabyBreastPumpsHistory,
  getSingleBreastPump,
  createBreastPump,
  updateBreastPump,
  deleteBreastPump,
  deleteAllBreastPump
} = require("../../controllers/baby_care/baby_breast_pumping");
const router = express.Router();
const { protect } = require("../../middleware/auth");

router.use(protect);

router.get("/:babyId", getBabyBreastPumpsHistory);
router.get("/:babyId/:breastPumpId", getSingleBreastPump);
router.post("/:babyId/", createBreastPump);
router.put("/:babyId/:breastPumpId", updateBreastPump);
router.delete("/:babyId/:breastPumpId", deleteBreastPump);
router.delete("/:babyId", deleteAllBreastPump);
module.exports = router;
