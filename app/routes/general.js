const express = require("express");
const Blog = require("../models/blogs/Blog");
const WarningSign = require("../models/Warning_sign");
const DailyTip = require("../models/daily/Daily_tip");
const DailyRead = require("../models/daily/Daily_read");
const Video = require("../models/Video");
const BabyProgressTimeline = require("../models/progress_timeline/Baby_progress_timeline");
const MotherProgressTimeline = require("../models/progress_timeline/Mother_progress_timeline");
const DrugSlider = require("../models/Drug_slider");
const BlogCategory = require("../models/blogs/Blog_category");
const advancedResults = require("../middleware/advancedResults");
const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  deleteAll,
} = require("../controllers/crudController");
const Media = require("../models/Media");

const router = express.Router();

router.get("/blogs", advancedResults(Blog, undefined, "lan"), getAll(Blog));
router.get("/warningsigns", getAll(WarningSign, { model: Media, as: "media" }));
router.get("/dailytips", getAll(DailyTip));
router.get("/dailyreads", getAll(DailyRead));
router.get("/videos", getAll(Video, { model: Media, as: "media" }));
router.get("/babyprogresstimeline", getAll(BabyProgressTimeline));
router.get("/motherprogresstimeline", getAll(MotherProgressTimeline));
router.get("/drugslider", getAll(DrugSlider));
router.get("/blogcategories", getAll(BlogCategory));

router.get("/blogs/:modelPk", getOne(Blog));
router.get(
  "/warningsigns/:modelPk",
  getOne(WarningSign, { model: Media, as: "media" })
);
router.get("/dailytips/:modelPk", getOne(DailyTip));
router.get("/dailyreads/:modelPk", getOne(DailyRead));
router.get("/videos/:modelPk", getOne(Video, { model: Media, as: "media" }));
router.get("/babyprogresstimeline/:modelPk", getOne(BabyProgressTimeline));
router.get("/motherprogresstimeline/:modelPk", getOne(MotherProgressTimeline));
router.get("/drugslider/:modelPk", getOne(DrugSlider));

module.exports = router;
