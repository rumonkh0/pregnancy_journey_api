const express = require("express");
const HelpDesk = require("../models/HelpDesk");
const {
  getHistory,
  getOne,
  update,
  create,
  deleteOne,
  deleteAll,
} = require("../controllers/helpDesk");

const router = express.Router();
const { protect } = require("../middleware/auth");
const MotherDiet = require("../models/tools/mother/Mother_diet");

router.use(protect);

router.get("/", getHistory(HelpDesk));
router.get("/:modelPk", getOne(HelpDesk));
router.post("/", create(HelpDesk));
// router.put("/:modelPk", update(HelpDesk));
router.delete("/:modelPk", deleteOne(HelpDesk));
// router.delete("/", deleteAll(HelpDesk));

router.get("/", getHistory(MotherDiet));
router.get("/:modelPk", getOne(MotherDiet));
router.post("/", create(MotherDiet));
module.exports = router;
