const express = require("express");
const Mood = require("../../../models/tools/mother/Mother_mood_tracker");
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
const asyncHandler = require("../../../middleware/async");
const { Sequelize, Op } = require("sequelize");

filteredstat = (type) => {
  return asyncHandler(async (req, res, next) => {
    let startDate, endDate;

    switch (type) {
      case "week":
        startDate = new Date();
        endDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "month":
        startDate = new Date();
        endDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        break;
      default:
        return res.status(200).json({ success: false, message: "type error" });
        break;
    }
    const today = new Date();
    let lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    // Fetch mood counts for each distinct mood type in the last 7 days
    const moodCounts = await Mood.findAll({
      attributes: [
        "current_mood",
        [Sequelize.fn("COUNT", "current_mood"), "count"],
      ],
      where: {
        user_id: req.user.id,
        mood_time: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      group: ["current_mood"],
    });

    // console.log(JSON.parse(JSON.stringify(moodCounts)));

    // Calculate total mood entries in the last 7 days
    const totalMoods = moodCounts.reduce(
      (total, mood) => total + mood.dataValues.count,
      0
    );

    // Calculate percentages for each mood
    const moodPercentages = moodCounts.map((mood) => ({
      mood: mood.dataValues.current_mood,
      percentage: ((mood.dataValues.count / totalMoods) * 100).toFixed(2),
    }));

    res.status(200).json({ success: true, data: moodPercentages });
  });
};

filtered = (type) => {
  return asyncHandler(async (req, res, next) => {
    let startDate, endDate;

    switch (type) {
      case "day":
        startDate = new Date();
        endDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        break;
      case "specday":
        var { year, month, day } = req.params;
        startDate = new Date(year, month - 1, day);
        day++;
        endDate = new Date(year, month - 1, day);
        break;
      case "week":
        startDate = new Date();
        endDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "month":
        startDate = new Date();
        endDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        break;
      case "specmonth":
        var { year, month } = req.params;
        startDate = new Date(year, month - 1, 1);
        endDate = new Date(year, month, 0);
        break;
      default:
        return res.status(200).json({ success: false, message: "type error" });
        break;
    }
    const data = await Mood.findAll({
      where: {
        user_id: req.user.id,
        mood_time: { [Op.gte]: startDate, [Op.lt]: endDate },
      },
      order: [["createdAt", "DESC"]],
    });
    if (!data) {
      return res.status(403).json({
        success: false,
        message: "no record found.",
      });
    }
    // Get the feed history for the specified baby
    res.status(200).json({ success: true, data });
  });
};

router.use(protect);

router.get("/", getHistory(Mood));
router.get("/today", filtered("day"));
router.get("/specday/:day/:month/:year", filtered("specday"));
router.get("/month/:month/:year", filtered("specmonth"));
router.get("/weekstat", filteredstat("week"));
router.get("/monthstat", filteredstat("month"));
router.get("/:modelPk", getOne(Mood));
router.post("/", create(Mood));
router.put("/:modelPk", update(Mood));
router.delete("/:modelPk", deleteOne(Mood));
router.delete("/", deleteAll(Mood));
module.exports = router;
