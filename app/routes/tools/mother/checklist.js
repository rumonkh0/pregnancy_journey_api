const express = require("express");
const ChecklistItem = require("../../../models/tools/mother/ChecklistItem");
const {
  getAllItem,
  getOne,
  update,
  create,
  deleteOne,
  deleteAll,
} = require("../../../controllers/tools/mother/checklist");

const router = express.Router();
const { protect } = require("../../../middleware/auth");

router.use(protect);

router.get("/item", getAllItem(ChecklistItem));
// router.get("/:modelPk", getOne(ChecklistItem));
// router.post("/", create(ChecklistItem));
// router.put("/:modelPk", update(ChecklistItem));
// router.delete("/:modelPk", deleteOne(ChecklistItem));
// router.delete("/", deleteAll(ChecklistItem));
module.exports = router;
