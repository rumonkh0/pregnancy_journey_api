const express = require("express");
const contractionTime = require("../../../models/tools/mother/Mother_contraction_time");
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

router.get("/", getHistory(contractionTime));
router.get("/:pk", getOne(contractionTime));
router.post("/", create(contractionTime));
router.put("/:pk", update(contractionTime));
router.delete("/:pk", deleteOne(contractionTime));
router.delete("/", deleteAll(contractionTime));
module.exports = router;
