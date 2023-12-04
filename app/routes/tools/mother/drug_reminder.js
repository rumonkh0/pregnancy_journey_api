const express = require("express");
const DrugReminder = require("../../../models/tools/mother/Drug_reminder");
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

router.get("/", getHistory(DrugReminder));
router.get("/:modelPk", getOne(DrugReminder));
router.post("/", create(DrugReminder));
router.put("/:modelPk", update(DrugReminder));
router.delete("/:modelPk", deleteOne(DrugReminder));
router.delete("/", deleteAll(DrugReminder));
module.exports = router;
