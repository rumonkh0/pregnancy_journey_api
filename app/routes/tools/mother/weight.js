const express = require("express");
const Weight = require("../../../models/tools/mother/Weight");
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

router.get("/", getHistory(Weight));
router.get("/:modelPk", getOne(Weight));
router.post("/", create(Weight));
router.put("/:modelPk", update(Weight));
router.delete("/:modelPk", deleteOne(Weight));
router.delete("/", deleteAll(Weight));
module.exports = router;
