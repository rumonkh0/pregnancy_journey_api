const express = require("express");
const asyncHandler = require("../middleware/async");
const { protect } = require("../middleware/auth");
const User = require("../models/User");
const Blog = require("../models/blogs/Blog");
const BabyList = require("../models/Baby");
const DailyRead = require("../models/daily/Daily_read");
const DailyTip = require("../models/daily/Daily_tip");
const WeightLog = require("../models/tools/mother/Weight");
const WarningSign = require("../models/Warning_sign");
const Video = require("../models/Video");
const Media = require("../models/Media");
const BabyProg = require("../models/progress_timeline/Baby_progress_timeline");
const MotherProg = require("../models/progress_timeline/Mother_progress_timeline");
const { tokenCheck } = require("../middleware/auth");
const router = express.Router();

// router.use(protect);
const objLangFilter = (obj, lan) => {
  try {
    obj.setDataValue(
      "title",
      JSON.parse(obj.title)[lan]
        ? JSON.parse(obj.title)[lan]
        : JSON.parse(obj.title)["en"]
    );
    obj.setDataValue(
      "description",
      JSON.parse(obj.description)[lan]
        ? JSON.parse(obj.description)[lan]
        : JSON.parse(obj.description)["en"]
    );
    return obj;
  } catch (error) {}
};

const lanFilter = (data, lan) => {
  if (data) {
    if (Array.isArray(data)) {
      return data.map((obj) => {
        return objLangFilter(obj, lan);
      });
    } else {
      return objLangFilter(data, lan);
    }
  }
};

const dashboard = asyncHandler(async (req, res, next) => {
  const { day, lan } = req.query;
  let user,
    babyList,
    babySize,
    dailyReads,
    dailyTips,
    weightData,
    videos,
    blogs,
    blogCategories,
    warningSigns;

  //Get User Data
  if (req.user) {
    user = await User.findOne({
      // attributes: ["id", "username", "first_name", "last_name", ],
      where: { id: req.user.id },
      include: { model: Media, as: "media" },
    });

    //Get Baby List
    babyList = await BabyList.findAll({
      where: { mother_id: user.id },
      include: { model: Media, as: "media" },
    });

    //Get Weight Data
    weightData = await WeightLog.findAll({ where: { user_id: req.user.id } });
  }
  //Baby Progress Timeline
  let babyProgressTimeline = await BabyProg.findOne({
    where: { day },
  });

  //Mother Progress Timeline
  let motherProgressTimeline = await MotherProg.findOne({
    where: { day },
  });
  //Get All Blogs
  //   let blogs = await Blog.findAll();
  blogs = lanFilter(await Blog.findAll(), lan);

  //Get Daily Reads
  dailyReads = lanFilter(await DailyRead.findOne({ where: { day } }), lan);

  //Get Daily Tips
  dailyTips = lanFilter(await DailyTip.findOne({ where: { day } }), lan);

  //Get Videos
  videos = lanFilter(
    await Video.findAll({ include: { model: Media, as: "media" } }),
    lan
  );

  //Get Warning Signs
  warningSigns = lanFilter(await WarningSign.findAll(), lan);

  res.status(200).json({
    remark: "SUCCESSFULL",
    success: true,
    message: "dashboard found",
    data: {
      user,
      babyList,
      babySize,
      dailyReads,
      dailyTips,
      weightData,
      babyProgressTimeline,
      motherProgressTimeline,
      blogs,
      videos,
      warningSigns,
    },
  });
});

router.get(
  "/",
  (req, res, next) => {
    let token = tokenCheck(req);
    if (token !== "none" && token !== undefined) {
      next();
    } else {
      dashboard(req, res, next);
    }
  },
  protect,
  dashboard
);

module.exports = router;
