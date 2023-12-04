const express = require("express");
const Exercise = require("../models/Exercise");
const {
  getHistory,
  getOne,
  create,
  update,
  deleteOne,
  deleteAll,
} = require("../controllers/crudCrontroller");

const router = express.Router();
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/:babyId", getHistory(Exercise));
router.get("/:babyId/:modelPk", getOne(Exercise));
router.post("/:babyId/", create(Exercise));
router.put("/:babyId/:modelPk", update(Exercise));
router.delete("/:babyId/:modelPk", deleteOne(Exercise));
router.delete("/:babyId", deleteAll(Exercise));
module.exports = router;
