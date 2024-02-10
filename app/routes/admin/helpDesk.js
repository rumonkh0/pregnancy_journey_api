const express = require("express");
const HelpDesk = require("../../models/HelpDesk");
const {
  getAllOfUser,
  getOne,
  update,
  create,
  deleteOne,
  deleteAll,
} = require("../../controllers/admin/adminCrudController");

const router = express.Router();
const { protect, authorize } = require("../../middleware/auth");
const asyncHandler = require("../../middleware/async");
const { Sequelize } = require("sequelize");

router.use(protect);

router.get("/:userId", getAllOfUser(HelpDesk));
router.get("/:userId/:modelPk", getOne(HelpDesk));
router.post("/:userId", create(HelpDesk));
// // router.put("/:modelPk", update(HelpDesk));
router.delete("/userId/:modelPk", deleteOne(HelpDesk));
router.delete("/", deleteAll(HelpDesk));
router.get(
  "/unreplyed",
  asyncHandler(async (req, res, next) => {
    const lastMessages = await HelpDesk.findAll({
      where: Sequelize.literal(
        `(user_id, createdAt) IN 
          (SELECT user_id, MAX(createdAt) 
           FROM help_desk 
           GROUP BY user_id)`
      ),
    });

    const result = lastMessages.filter((message) => message.admin_id == null);

    if (!lastMessages.length) {
      return res.status(403).json({
        success: false,
        message: "no record found.",
      });
    }
    // Get the feed history for the specified baby
    res.status(200).json({ success: true, data: result });
  })
);
module.exports = router;

// SELECT *
// FROM help_desk AS t1
// WHERE createdAt = (
//     SELECT MAX(createdAt)
//     FROM help_desk AS t2
//     WHERE t1.user_id = t2.user_id
//     AND t2.admin_id IS NULL
// );
