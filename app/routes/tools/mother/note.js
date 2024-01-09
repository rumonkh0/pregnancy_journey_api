const express = require("express");
const Note = require("../../../models/tools/mother/Note");
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

router.get("/", getHistory(Note));
router.get("/:modelPk", getOne(Note));
router.post("/", create(Note));
router.put("/:modelPk", update(Note));
router.delete("/:modelPk", deleteOne(Note));
router.delete("/", deleteAll(Note));
module.exports = router;
