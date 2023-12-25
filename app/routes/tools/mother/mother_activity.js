const express = require("express");
const Activity = require("../../../models/tools/mother/Mother_activity");
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

router.get("/", getHistory(Activity));
router.get("/:modelPk", getOne(Activity));
router.post("/", create(Activity));
router.put("/:modelPk", update(Activity));
router.delete("/:modelPk", deleteOne(Activity));
router.delete("/", deleteAll(Activity));
module.exports = router;
     