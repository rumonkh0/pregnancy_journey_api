const express = require("express");
const Mvaccination = require("../../models/vaccination/Mother_vaccine");
const {
  getHistory,
  getOne,
  create,
  update,
  deleteOne,
  deleteAll,
} = require("../../controllers/crudCrontroller");
const { protect } = require("../../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/", getHistory(Mvaccination));
router.get("/:modelPk", getOne(Mvaccination));
router.post("/", create(Mvaccination));
router.put("/:modelPk", update(Mvaccination));
router.delete("/:modelPk", deleteOne(Mvaccination));
router.delete("/", deleteAll(Mvaccination));
module.exports = router;
