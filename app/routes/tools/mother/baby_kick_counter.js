const express = require("express");
const BabyKickCounter = require("../../../models/tools/mother/Baby_kick_counter");
const {
  getHistory,
  getOne,
  update,
  create,
  deleteOne,
  deleteAll,
} = require("../../../controllers/tools/mother/crudController");

const router = express.Router();
const { protect } = require("../../../middleware/auth");

router.use(protect);

router.get("/", getHistory(BabyKickCounter));
router.get("/:modelPk", getOne(BabyKickCounter));
router.post("/", create(BabyKickCounter));
router.put("/:modelPk", update(BabyKickCounter));
router.delete("/:modelPk", deleteOne(BabyKickCounter));
router.delete("/", deleteAll(BabyKickCounter));
module.exports = router;
