const express = require("express");
const ChecklistItem = require("../../../models/tools/mother/ChecklistItem");
const ChectlistSubItem = require("../../../models/tools/mother/ChecklistSubItem");
const ChecklistValue = require("../../../models/tools/mother/ChecklistValue");
const {
  getAllItem,
  getOneItem,
  postValues,
  postBabyValues,
  getValues,
  getBabyValues,
  checkBabyOwner,
} = require("../../../controllers/tools/mother/checklist");

const router = express.Router();
const { protect } = require("../../../middleware/auth");

router.use(protect);

router.get("/item/:type", getAllItem(ChecklistItem));
router.get("/subitem/:item/:type", getOneItem(ChectlistSubItem));
router.post("/mother", postValues(ChecklistValue));
router.get("/mother", getValues(ChecklistValue));
router.post("/baby/:babyId", checkBabyOwner, postBabyValues(ChecklistValue));
router.get("/baby/:babyId", checkBabyOwner, getBabyValues(ChecklistValue));
// router.get("/:modelPk", getOne(ChecklistItem));
// router.post("/", create(ChecklistItem));
// router.put("/:modelPk", update(ChecklistItem));
// router.delete("/:modelPk", deleteOne(ChecklistItem));
// router.delete("/", deleteAll(ChecklistItem));
module.exports = router;
