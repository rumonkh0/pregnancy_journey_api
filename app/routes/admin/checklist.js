const express = require("express");
const {
  getAllItem,
  getOneItem,
  getOneSubItem,
  createItem,
  createSubItem,
  createOne,
  updateItem,
  deleteItem,
} = require("../../controllers/admin/checklist");
const ChectlistItem = require("../../models/tools/mother/ChecklistItem");
const ChectlistSubItem = require("../../models/tools/mother/ChecklistSubItem");
const Chectlist = require("../../models/tools/mother/Checklist");

const router = express.Router();
const { protect, authorize } = require("../../middleware/auth");
const ChecklistItem = require("../../models/tools/mother/ChecklistItem");
router.use(protect, authorize("superadmin", "admin", "user"));
// router.use('/:motherId/babylist', babyListRouter);

// nav main items
router.get("/item", getAllItem(ChectlistItem));
router.post("/item", createItem(ChecklistItem));
router.put("/item/:id", updateItem(ChecklistItem));
router.delete("/item/:id", deleteItem(ChecklistItem));

//all subitems and its checkitems under a item
router.get("/subitem/:item", getOneItem(ChectlistSubItem));
router.post("/subitem", createSubItem(ChectlistSubItem));


router.get("/:subitem", getOneSubItem(Chectlist));

//create checklist
router.post("/", createOne(Chectlist));

module.exports = router;
