const express = require("express");
const {
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  updateAdminRole,
  deleteAdmin,
} = require("../../controllers/admin/admin");
const router = express.Router();

const { protect, authorize } = require("../../middleware/auth");
const advancedResults = require("../../middleware/advancedResults");
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const BabyList = require("../../models/Baby");
const { Sequelize } = require("sequelize");
const asyncHandler = require("../../middleware/async");
const Post = require("../../models/community/Post");
const HelpDesk = require("../../models/HelpDesk");

router.use(protect);
router.use(authorize("superadmin", "admin"));
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const totalUsers = await User.count();
    const totalBabies = await BabyList.count();
    const totalPost = await Post.count();
    const totalUnpublishedPost = await Post.count({
      where: {
        published: 0,
      },
    });
    const totalPublishedPost = await Post.count({
      where: {
        published: 1,
      },
    });
    const totalUnreplyed = await HelpDesk.count({
      where: Sequelize.literal(
        `(user_id, help_desk.createdAt) IN 
          (SELECT user_id, MAX(hd.createdAt) 
           FROM help_desk hd
           GROUP BY user_id) and admin_id is null`
      ),
    });

    res.status(200).json({
      success: true,
      messase: "Dashboard data found",
      data: {
        totalUsers,
        totalBabies,
        totalPost,
        totalPublishedPost,
        totalUnpublishedPost,
        totalUnreplyed,
      },
    });
  })
);

// const totalPost = async () => {
//   return await Post.count();
// };

module.exports = router;
