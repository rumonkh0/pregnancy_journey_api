const express = require("express");
const HelpDesk = require("../models/HelpDesk");
const {
  getHistory,
  getOne,
  update,
  create,
  deleteOne,
  deleteAll,
} = require("../controllers/tools/mother/crudController");

const router = express.Router();
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/", getHistory(HelpDesk));
router.get("/:modelPk", getOne(HelpDesk));
router.post("/", create(HelpDesk));
// router.put("/:modelPk", update(HelpDesk));
router.delete("/:modelPk", deleteOne(HelpDesk));
// router.delete("/", deleteAll(HelpDesk));
module.exports = router;
