const express = require("express");
const blog = require("./blog");
const blogCategories = require("./blogCategories");
const warningSign = require("./warningSign");
const dailyReads = require("./dailyReads");
const dailyTips = require("./dailyTips");
const motherProgress = require("./motherProgress");
const babyProgress = require("./babyProgress");
const drugSlider = require("./drugSlider");
const videos = require("./videos");

const router = express.Router({ mergeParams: true });

router.use("/blogs", blog);
router.use("/blogcategories", blogCategories);
router.use("/warningsigns", warningSign);
router.use("/dailyreads", dailyReads);
router.use("/dailytips", dailyTips);
router.use("/motherprogress", motherProgress);
router.use("/babyprogress", babyProgress);
router.use("/drugslider", drugSlider);
router.use("/videos", videos);

// const warning = () => {

// };
// warning();

// const dailyread = () => {
//   router.use(authorize("superadmin", "admin", "dailyread"));
//   router.get("/dailyreads", getAll(DailyRead));
//   router.get("/dailyreads/:modelPk", getOne(DailyRead));
//   router.post("/dailyreads", create(DailyRead));
//   router.put("/dailyreads/:modelPk", update(DailyRead));
//   router.delete("/dailyreads/:modelPk", deleteOne(DailyRead));
// };
// router.use("/w", dailyread);

// const dailytip = () => {
//   router.use(authorize("superadmin", "admin", "dailytip"));
//   router.get("/dailytips", getAll(DailyTip));
//   router.get("/dailytips/:modelPk", getOne(DailyTip));
//   router.post("/dailytips", create(DailyTip));
//   router.put("/dailytips/:modelPk", update(DailyTip));
//   router.delete("/dailytips/:modelPk", deleteOne(DailyTip));
// };
// dailytip();

// const video = () => {
//   router.use(authorize("superadmin", "admin", "video"));
//   router.get("/videos", getAll(Video));
//   router.get("/videos/:modelPk", getOne(Video));
//   router.post("/videos", create(Video));
//   router.put("/videos/:modelPk", update(Video));
//   router.delete("/videos/:modelPk", deleteOne(Video));
// };
// video();

// const babyProgressTimeline = () => {
//   router.use(authorize("superadmin", "admin", "babyProgressTimeline"));
//   router.get("/babyprogresstimeline", getAll(BabyProgressTimeline));
//   router.get("/babyprogresstimeline/:modelPk", getOne(BabyProgressTimeline));
//   router.post("/babyprogresstimeline", create(BabyProgressTimeline));
//   router.put("/babyprogresstimeline/:modelPk", update(BabyProgressTimeline));
//   router.delete(
//     "/babyprogresstimeline/:modelPk",
//     deleteOne(BabyProgressTimeline)
//   );
// };
// babyProgressTimeline();

// const motherProgressTimeline = () => {
//   router.use(authorize("superadmin", "admin", "motherProgressTimeline"));
//   router.get("/motherprogresstimeline", getAll(MotherProgressTimeline));
//   router.get(
//     "/motherprogresstimeline/:modelPk",
//     getOne(MotherProgressTimeline)
//   );
//   router.post("/motherprogresstimeline", create(MotherProgressTimeline));
//   router.put(
//     "/motherprogresstimeline/:modelPk",
//     update(MotherProgressTimeline)
//   );
//   router.delete(
//     "/motherprogresstimeline/:modelPk",
//     deleteOne(MotherProgressTimeline)
//   );
// };
// motherProgressTimeline();

// const drugSlider = () => {
//   router.use(authorize("superadmin", "admin", "drugSlider"));
//   router.get("/drugslider", getAll(DrugSlider));
//   router.get("/drugslider/:modelPk", getOne(DrugSlider));
//   router.post("/drugslider", create(DrugSlider));
//   router.put("/drugslider/:modelPk", update(DrugSlider));
//   router.delete("/drugslider/:modelPk", deleteOne(DrugSlider));
// };
// drugSlider();

module.exports = router;
