const express = require("express");
const Activity = require("../../../models/tools/mother/Mother_activity");
const {
  getHistory,
  getOne,
  update,
  create,
  deleteOne,
  deleteAll,
} = require("../../../controllers/crudCrontroller");

const router = express.Router();
const { protect } = require("../../../middleware/auth");
const asyncHandler = require("../../../middleware/async");
const { Op } = require("sequelize");

filtered = (type) => {
  return asyncHandler(async (req, res, next) => {
    let startDate, endDate;

    switch (type) {
      case "day":
        startDate = new Date();
        endDate = new Date();
        startDate.setHours(0, 0, 0, 0);
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
        const { year, month } = req.params;
        startDate = new Date(year, month - 1, 1);
        endDate = new Date(year, month, 0);
        break;
      default:
        break;
    }

    console.log(startDate, " ", endDate);
    const data = await Activity.findAll({
      where: {
        user_id: req.user.id,
        createdAt: { [Op.gte]: startDate, [Op.lt]: endDate },
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

router.get("/", getHistory(Activity));
router.get("/day", filtered("day"));
router.get("/lastweek", filtered("week"));
router.get("/lastmonth", filtered("month"));
router.get("/month/:month/:year", filtered("specmonth"));
router.get("/:modelPk", getOne(Activity));
router.post("/", create(Activity));
router.put("/:modelPk", update(Activity));
router.delete("/:modelPk", deleteOne(Activity));
router.delete("/", deleteAll(Activity));
module.exports = router;
