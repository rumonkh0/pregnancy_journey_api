const express = require("express");
const { sequelize } = require("../../config/db");
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

const BabyGrowthDev = require("../models/BabyGrowthDev");
const BabyGrowth = require("../models/BabyGrowth");
const BabyGrowthWeek = require("../models/BabyGrowthWeekly");
const DailyTipBaby = require("../models/daily/Daily_tip_baby");

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
    if (obj.description) {
      obj.setDataValue(
        "description",
        JSON.parse(obj.description)[lan]
          ? JSON.parse(obj.description)[lan]
          : JSON.parse(obj.description)["en"]
      );
    }
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

const dashboardBaby = asyncHandler(async (req, res, next) => {
  const { id, week, day, lan } = req.query;
  let baby,
    babyGrowthDev,
    BabyGrowthWeekly,
    babyGrowth,
    dailyTips,
    weightData,
    videos,
    blogs;

  //Get User Data
  // if (req.baby) {
  //   baby = await User.findOne({
  //     // attributes: ["id", "username", "first_name", "last_name", ],
  //     where: { id: req.baby.id },
  //     include: { model: Media, as: "media" },
  //   });

  //   //Get Baby List
  //   babyList = await BabyList.findAll({
  //     where: { mother_id: baby.id },
  //     include: { model: Media, as: "media" },
  //   });

  //   //Get Weight Data
  //   weightData = await WeightLog.findAll({ where: { user_id: req.baby.id } });
  // }

  //Get Baby Data
  if (req.user)
    baby = await BabyList.findOne({
      where: { id, mother_id: req.user.id },
      include: {
        model: Media,
        as: "media",
        attributes: ["file_name", "file_path"],
      },
    });

  //Baby Growth Development
  babyGrowthDev = await BabyGrowthDev.findOne({ where: { week } });

  //Baby Weight And Height Log
  babyGrowth = await BabyGrowth.findAll({
    where: { baby_id: baby.id },
    attributes: ["week", "height", "weight"],
  });

  //Baby Progress Timeline
  let babyProgressTimeline = await BabyProg.findOne({
    where: { week },
    include: { model: Media, as: "media" },
  });

  //Get All Blogs
  //   let blogs = await Blog.findAll();
  blogs = lanFilter(
    await Blog.findAll({
      include: { model: Media, as: "media" },
    }),
    lan
  );

  //Get Daily Tips
  dailyTips = lanFilter(
    await DailyTipBaby.findOne({
      where: { day },
      // include: { model: Media, as: "media" },
    }),
    lan
  );

  //Get Videos
  videos = lanFilter(
    await Video.findAll({ include: { model: Media, as: "media" } }),
    lan
  );

  res.status(200).json({
    remark: "SUCCESSFULL",
    success: true,
    message: "Baby dashboard found",
    data: {
      baby,
      babyGrowthDev,
      babyGrowth,
      dailyTips,
      weightData,
      babyProgressTimeline,
      blogs,
      videos,
    },
  });
});

const dashboard = asyncHandler(async (req, res, next) => {
  const { day, lan, week } = req.query;
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
      include: {
        model: Media,
        as: "media",
        attributes: ["file_name", "file_path"],
      },
    });

    //Get Baby List
    babyList = await BabyList.findAll({
      where: { mother_id: user.id },
      include: {
        model: Media,
        as: "media",
        attributes: ["file_name", "file_path"],
      },
    });

    //Get Weight Data
    weightData = await WeightLog.findAll({ where: { user_id: req.user.id } });
  }

  //Baby Growth Weekly
  let BabyGrowthWeekly = await BabyGrowthWeek.findOne({
    where: { week },
  });

  //Baby Progress Timeline
  let babyProgressTimeline = await BabyProg.findOne({
    where: { week },
    include: {
      model: Media,
      as: "media",
      attributes: ["file_name", "file_path"],
    },
  });

  //Mother Progress Timeline
  let motherProgressTimeline = await MotherProg.findOne({
    where: { week },
    include: {
      model: Media,
      as: "media",
      attributes: ["file_name", "file_path"],
    },
  });
  //Get All Blogs
  //   let blogs = await Blog.findAll();
  blogs = lanFilter(
    await Blog.findAll({
      order: sequelize.literal("RAND()"),
      limit: 3,
      attributes: ["id", "title"],
      include: {
        model: Media,
        as: "media",
        attributes: ["file_name", "file_path"],
      },
    }),
    lan
  );

  //Get Daily Reads
  dailyReads = lanFilter(
    await DailyRead.findOne({
      where: { day },
      include: {
        model: Media,
        as: "media",
        attributes: ["file_name", "file_path"],
      },
    }),
    lan
  );

  //Get Daily Tips
  dailyTips = lanFilter(
    await DailyTip.findOne({
      where: { day },
      include: {
        model: Media,
        as: "media",
        attributes: ["file_name", "file_path"],
      },
    }),
    lan
  );

  //Get Videos
  videos = lanFilter(
    await Video.findAll({
      include: {
        model: Media,
        as: "media",
        attributes: ["file_name", "file_path"],
      },
    }),
    lan
  );

  //Get Warning Signs
  warningSigns = lanFilter(
    await WarningSign.findAll({
      include: {
        model: Media,
        as: "media",
        attributes: ["file_name", "file_path"],
      },
    }),
    lan
  );

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
      BabyGrowthWeekly,
      babyProgressTimeline,
      motherProgressTimeline,
      blogs,
      videos,
      warningSigns,
    },
  });
});

router.get(
  "/baby",
  (req, res, next) => {
    let token = tokenCheck(req);
    if (token !== "none" && token !== undefined) {
      next();
    } else {
      dashboardBaby(req, res, next);
    }
  },
  protect,
  dashboardBaby
);

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
