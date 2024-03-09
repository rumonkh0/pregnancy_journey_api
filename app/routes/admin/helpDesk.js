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
const User = require("../../models/User");
const Media = require("../../models/Media");
const Admin = require("../../models/Admin");
router.use(protect);
router.use(authorize("superadmin", "help_desk"));

router.get(
  "/unreplyed",
  asyncHandler(async (req, res, next) => {
    const lastMessages = await HelpDesk.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"],
          include: {
            model: Media,
            as: "media",
            attributes: ["id", "file_path"],
          },
        },
        {
          model: Admin,
          attributes: ["id", "username"],
          include: {
            model: Media,
            as: "profile_photo",
            attributes: ["id", "file_path"],
          },
        },
      ],
      where: Sequelize.literal(
        `(user_id, help_desk.createdAt) IN 
          (SELECT user_id, MAX(hd.createdAt) 
           FROM help_desk hd
           GROUP BY user_id) and admin_id is null`
      ),
    });

    // const result = lastMessages.filter((message) => message.admin_id == null);

    // if (!lastMessages.length) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "no record found.",
    //   });
    // }
    // Get the feed history for the specified baby
    res.status(200).json({ success: true, data: lastMessages });
  })
);
router.get(
  "/totalunreplyed",
  asyncHandler(async (req, res, next) => {
    const totalUnreplyed = await HelpDesk.count({
      where: Sequelize.literal(
        `(user_id, help_desk.createdAt) IN 
          (SELECT user_id, MAX(hd.createdAt) 
           FROM help_desk hd
           GROUP BY user_id) and admin_id is null`
      ),
    });
    res
      .status(200)
      .json({ success: true, message: "Data found", data: totalUnreplyed });
  })
);
router.get("/:userId", getAllOfUser(HelpDesk, "asc"));
router.get(
  "/",
  asyncHandler(async () => {})
);
router.get("/:userId/:modelPk", getOne(HelpDesk));
router.post("/:userId", create(HelpDesk));
// // router.put("/:modelPk", update(HelpDesk));
router.delete("/userId/:modelPk", deleteOne(HelpDesk));
router.delete("/", deleteAll(HelpDesk));

module.exports = router;

// SELECT *
// FROM help_desk AS t1
// WHERE createdAt = (
//     SELECT MAX(createdAt)
//     FROM help_desk AS t2
//     WHERE t1.user_id = t2.user_id
//     AND t2.admin_id IS NULL
// );
