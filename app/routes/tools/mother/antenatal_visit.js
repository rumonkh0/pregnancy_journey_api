const express = require("express");
const AntenatalVisit = require("../../../models/tools/mother/Antenatal_visit");
const {
  checkOwner,
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

router.get("/", checkOwner(AntenatalVisit), getHistory(AntenatalVisit));
router.get("/:modelPk", checkOwner(AntenatalVisit), getOne(AntenatalVisit));
router.post("/", create(AntenatalVisit));
router.put("/:modelPk", checkOwner(AntenatalVisit), update(AntenatalVisit));
router.delete(
  "/:modelPk",
  checkOwner(AntenatalVisit),
  deleteOne(AntenatalVisit)
);
router.delete("/", deleteAll(AntenatalVisit));
module.exports = router;
