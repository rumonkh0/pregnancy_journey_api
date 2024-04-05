const express = require("express");
const {
  getAllItem,
  getOneItem,
  getOneSubItem,
  createItem,
  createSubItem,
  createOne,
  updateItem,
} = require("../../controllers/admin/checklist");
const ChectlistItem = require("../../models/tools/mother/ChecklistItem");
const ChectlistSubItem = require("../../models/tools/mother/ChecklistSubItem");
const Chectlist = require("../../models/tools/mother/Checklist");

const router = express.Router();
const { protect, authorize } = require("../../middleware/auth");
const ChecklistItem = require("../../models/tools/mother/ChecklistItem");
router.use(protect, authorize("superadmin", "admin", "user"));
// router.use('/:motherId/babylist', babyListRouter);

// Route to get all users
router.get("/item", getAllItem(ChectlistItem));
router.post("/item", createItem(ChecklistItem));
router.get("/subitem/:item", getOneItem(ChectlistSubItem));
router.post("/subitem", createSubItem(ChectlistSubItem));
router.get("/:subitem", getOneSubItem(Chectlist));
router.post("/", createOne(Chectlist));
// router.get("/:userId", getUser);
// router.post("/", createUser);
// router.put("/:userId", upload.single("user_image_field"), updateUser);
// router.delete("/:userId", deleteUser);

module.exports = router;
