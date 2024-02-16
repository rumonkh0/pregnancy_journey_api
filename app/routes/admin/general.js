const express = require("express");
const Blog = require("../../models/blogs/Blog");
const WarningSign = require("../../models/Warning_sign");
const DailyTip = require("../../models/daily/Daily_tip");
const DailyRead = require("../../models/daily/Daily_read");
const Video = require("../../models/Video");
const BabyProgressTimeline = require("../../models/progress_timeline/Baby_progress_timeline");
const MotherProgressTimeline = require("../../models/progress_timeline/Mother_progress_timeline");
const DrugSlider = require("../../models/Drug_slider");

const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
} = require("../../controllers/crudController");

const router = express.Router();
const { protect, authorize } = require("../../middleware/auth");

// router.use(protect);

const blog = () => {
  authorize("superadmin", "admin", "blog");
  router.get("/blogs", getAll(Blog));
  router.get("/blogs/:modelPk", getOne(Blog));
  router.post("/blogs/:modelPk", create(Blog));
  router.put("/blogs/:modelPk", update(Blog));
  router.delete("/blogs/:modelPk", deleteOne(Blog));
};
blog();

const warning = () => {
  authorize("superadmin", "admin", "warning");
  router.get("/warningsigns", getAll(WarningSign));
  router.get("/warningsigns/:modelPk", getOne(WarningSign));
  router.post("/warningsigns/:modelPk", create(WarningSign));
  router.put("/warningsigns/:modelPk", update(WarningSign));
  router.delete("/warningsigns/:modelPk", deleteOne(WarningSign));
};
warning();

const dailyread = () => {
  authorize("superadmin", "admin", "dailyread");
  router.get("/dailyreads", getAll(DailyRead));
  router.get("/dailyreads/:modelPk", getOne(DailyRead));
  router.post("/dailyreads/:modelPk", create(DailyRead));
  router.put("/dailyreads/:modelPk", update(DailyRead));
  router.delete("/dailyreads/:modelPk", deleteOne(DailyRead));
};
dailyread();

const dailytip = () => {
  authorize("superadmin", "admin", "dailytip");
  router.get("/dailytips", getAll(DailyTip));
  router.get("/dailytips/:modelPk", getOne(DailyTip));
  router.post("/dailytips/:modelPk", create(DailyTip));
  router.put("/dailytips/:modelPk", update(DailyTip));
  router.delete("/dailytips/:modelPk", deleteOne(DailyTip));
};
dailytip();

const video = () => {
  authorize("superadmin", "admin", "video");
  router.get("/videos", getAll(Video));
  router.get("/videos/:modelPk", getOne(Video));
  router.post("/videos/:modelPk", create(Video));
  router.put("/videos/:modelPk", update(Video));
  router.delete("/videos/:modelPk", deleteOne(Video));
};
video();

const babyProgressTimeline = () => {
  authorize("superadmin", "admin", "babyProgressTimeline");
  router.get("/babyprogresstimeline", getAll(BabyProgressTimeline));
  router.get("/babyprogresstimeline/:modelPk", getOne(BabyProgressTimeline));
  router.post("/babyprogresstimeline/:modelPk", create(BabyProgressTimeline));
  router.put("/babyprogresstimeline/:modelPk", update(BabyProgressTimeline));
  router.delete(
    "/babyprogresstimeline/:modelPk",
    deleteOne(BabyProgressTimeline)
  );
};
babyProgressTimeline();

const motherProgressTimeline = () => {
  authorize("superadmin", "admin", "motherProgressTimeline");
  router.get("/babyprogresstimeline", getAll(MotherProgressTimeline));
  router.get("/babyprogresstimeline/:modelPk", getOne(MotherProgressTimeline));
  router.post("/babyprogresstimeline/:modelPk", create(MotherProgressTimeline));
  router.put("/babyprogresstimeline/:modelPk", update(MotherProgressTimeline));
  router.delete(
    "/babyprogresstimeline/:modelPk",
    deleteOne(MotherProgressTimeline)
  );
};
motherProgressTimeline();

const drugSlider = () => {
  authorize("superadmin", "admin", "drugSlider");
  router.get("/drugslider", getAll(DrugSlider));
  router.get("/drugslider/:modelPk", getOne(DrugSlider));
  router.post("/drugslider/:modelPk", create(DrugSlider));
  router.put("/drugslider/:modelPk", update(DrugSlider));
  router.delete("/drugslider/:modelPk", deleteOne(DrugSlider));
};
drugSlider();

module.exports = router;
