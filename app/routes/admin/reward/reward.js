const express = require("express");
const Task = require("../../../models/reward/Task");

const {
  getHistory,
  getOne,
  create,
  update,
  deleteOne,
} = require("../../../controllers/crudControllerAdmin");

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../../../middleware/auth");

router.use(protect, authorize("superadmin", "admin", "Task"));


router.get("/task", getHistory(Task, 'All task found successfully'));
router.get("/:modelPk", getOne(Task, 'Task foudn successfully'));
router.post("/task", create(Task, 'Task created successfully'));
router.put("/:modelPk", update(Task, "Task updated successfully"));
router.delete("/:modelPk", deleteOne(Task, "Task deleted successfully"));

module.exports = router;
