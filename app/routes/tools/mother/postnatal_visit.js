const express = require("express");
const PostnatalVisit = require("../../../models/tools/mother/Postnatal_visit");
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

router.get("/", getHistory(PostnatalVisit));
router.get("/:modelPk", getOne(PostnatalVisit));
router.post("/", create(PostnatalVisit));
router.put("/:modelPk", update(PostnatalVisit));
router.delete("/:modelPk", deleteOne(PostnatalVisit));
router.delete("/", deleteAll(PostnatalVisit));
module.exports = router;
