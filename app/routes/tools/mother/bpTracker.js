const express = require("express");
const BpTracker = require("../../../models/tools/mother/BpTracker");
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

router.get("/", (getHistory(BpTracker)));
router.get("/:modelPk", getOne(BpTracker));
router.post("/", create(BpTracker));
router.put("/:modelPk", update(BpTracker));
router.delete("/:modelPk", deleteOne(BpTracker));
router.delete("/", deleteAll(BpTracker));
module.exports = router;
