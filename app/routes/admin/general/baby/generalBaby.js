const path = require("path");
const fs = require("fs");
const express = require("express");
const multer = require("multer");
const blog = require("./blog");
const blogCategories = require("./blogCategories");
const warningSign = require("../warningSign");
const dailyReads = require("../dailyReads");
const dailyTips = require("../dailyTips");
const motherProgress = require("../motherProgress");
const babyProgress = require("../babyProgress");
const drugSlider = require("../drugSlider");
const videos = require("../videos");

const uploadDirectory = "public/uploads/general/";

// Ensure that the upload directory exists; if not, create it
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}
const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        "admin" +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB size limit
  },
});

const router = express.Router({ mergeParams: true });

router.use("/blogs", upload.single("blog_image"), blog);
router.use(
  "/blogcategories",
  upload.single("blog_category_image"),
  blogCategories
);
router.use("/warningsigns", upload.single("warning_image"), warningSign);
router.use("/dailyreads", upload.single("dailyreads_image"), dailyReads);
router.use("/dailytips", upload.single("dailytips_image"), dailyTips);
router.use(
  "/motherprogress",
  upload.single("motherprogress_image"),
  motherProgress
);
router.use("/babyprogress", upload.single("babyprogress_image"), babyProgress);
router.use("/drugslider", upload.single("drugslider_image"), drugSlider);
router.use("/videos", upload.single("videos_image"), videos);

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
