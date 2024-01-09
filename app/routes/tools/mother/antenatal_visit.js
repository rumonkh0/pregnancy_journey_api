const express = require("express");
const AntenatalVisit = require("../../../models/tools/mother/Antenatal_visit");
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

router.get("/", getHistory(AntenatalVisit));
router.get("/:modelPk", getOne(AntenatalVisit));
router.post("/", create(AntenatalVisit));
router.put("/:modelPk", update(AntenatalVisit));
router.delete("/:modelPk", deleteOne(AntenatalVisit));
router.delete("/", deleteAll(AntenatalVisit));
module.exports = router;
