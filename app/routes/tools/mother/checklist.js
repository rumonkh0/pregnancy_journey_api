const express = require("express");
const ChecklistItem = require("../../../models/tools/mother/ChecklistItem");
const ChectlistSubItem = require("../../../models/tools/mother/ChecklistSubItem");
const ChecklistValue = require("../../../models/tools/mother/ChecklistValue");
const {
  getAllItem,
  getOneItem,
  postValues,
  update,
  create,
  deleteOne,
  deleteAll,
  getValues,
} = require("../../../controllers/tools/mother/checklist");

const router = express.Router();
const { protect } = require("../../../middleware/auth");

router.use(protect);

router.get("/item/:type", getAllItem(ChecklistItem));
router.get("/subitem/:item/:type", getOneItem(ChectlistSubItem));
router.post("/", postValues(ChecklistValue));
router.get("/", getValues(ChecklistValue));
// router.get("/:modelPk", getOne(ChecklistItem));
// router.post("/", create(ChecklistItem));
// router.put("/:modelPk", update(ChecklistItem));
// router.delete("/:modelPk", deleteOne(ChecklistItem));
// router.delete("/", deleteAll(ChecklistItem));
module.exports = router;
