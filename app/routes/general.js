const express = require("express");
const Blog = require("../models/blogs/Blog");
const WarningSign = require("../models/Warning_sign");
const DailyTip = require("../models/daily/Daily_tip");
const DailyRead = require("../models/daily/Daily_read");
const Video = require("../models/Video");
const BabyProgressTimeline = require("../models/progress_timeline/Baby_progress_timeline");
const MotherProgressTimeline = require("../models/progress_timeline/Mother_progress_timeline");

const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  deleteAll,
} = require("../controllers/crudController");

const router = express.Router();

router.get("/blogs", getAll(Blog));
router.get("/warningsigns", getAll(WarningSign));
router.get("/dailytips", getAll(DailyTip));
router.get("/dailyreads", getAll(DailyRead));
router.get("/videos", getAll(Video));
router.get("/babyprogresstimeline", getAll(BabyProgressTimeline));
router.get("/motherprogresstimeline", getAll(MotherProgressTimeline));


router.get("/blogs/:modelPk", getOne(Blog));
router.get("/warningsigns/:modelPk", getOne(WarningSign));
router.get("/dailytips/:modelPk", getOne(DailyTip));
router.get("/dailyreads/:modelPk", getOne(DailyRead));
router.get("/videos/:modelPk", getOne(Video));
router.get("/babyprogresstimeline/:modelPk", getOne(BabyProgressTimeline));
router.get("/motherprogresstimeline/:modelPk", getOne(MotherProgressTimeline));

module.exports = router;
