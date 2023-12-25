const express = require("express");
const Mood = require("../../../models/tools/mother/Mother_mood_tracker");
const {
  getHistory,
  getOne,
  update,
  create,
  deleteOne,
  deleteAll,
} = require("../../../controllers/crudCrontroller");

const router = express.Router();
const { protect } = require("../../../middleware/auth");

router.use(protect);

router.get("/", getHistory(Mood));
router.get("/:modelPk", getOne(Mood));
router.post("/", create(Mood));
router.put("/:modelPk", update(Mood));
router.delete("/:modelPk", deleteOne(Mood));
router.delete("/", deleteAll(Mood));
module.exports = router;
