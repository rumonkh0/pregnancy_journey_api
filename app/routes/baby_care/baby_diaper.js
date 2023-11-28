const express = require("express");
const { TimeoutError } = require("sequelize");
const {
  getDiapersHistory,
  getSingleBabyDiaper,
  createBabyDiaper,
  updateBabyDiaper,
  deleteBabyDiaper,
  deleteAllBabyDiaper
} = require("../../controllers/baby_care/baby_diaper");
const router = express.Router();
const { protect } = require("../../middleware/auth");

router.use(protect);

router.get("/:babyId", getDiapersHistory);
router.get("/:babyId/:babyDiaperId", getSingleBabyDiaper);
router.post("/:babyId/", createBabyDiaper);
router.put("/:babyId/:babyDiaperId", updateBabyDiaper);
router.delete("/:babyId/:babyDiaperId", deleteBabyDiaper);
router.delete("/:babyId", deleteAllBabyDiaper);
module.exports = router;
