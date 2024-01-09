const express = require("express");
const Blog = require("../models/blogs/Blog");
const WarningSign = require("../models/Warning_sign");
const DailyTip = require("../models/daily/Daily_tip");
const DailyRead = require("../models/daily/Daily_read");
const Video = require("../models/Video");

const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  deleteAll,
} = require("../controllers/crudController");

const router = express.Router();
const { protect } = require("../middleware/auth");

router.get("/blogs", getAll(Blog));
router.get("/blogs/:modelPk", getOne(Blog));
router.get("/warningsigns", getAll(WarningSign));
router.get("/warningsigns/:modelPk", getOne(WarningSign));
router.get("/dailytips", getAll(DailyTip));
router.get("/dailytips/:modelPk", getOne(DailyTip));
router.get("/dailyreads", getAll(DailyRead));
router.get("/dailyreads/:modelPk", getOne(DailyRead));
router.get("/videos", getAll(Video));
router.get("/videos/:modelPk", getOne(Video));

module.exports = router;
