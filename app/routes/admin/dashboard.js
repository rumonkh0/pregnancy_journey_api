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
const asyncHandler = require("../../middleware/async");

router.use(protect);
router.use(authorize("superadmin", "admin"));
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const totalUsers = await User.count();
    const totalBabies = await BabyList.count();

    res.status(200).json({
      success: true,
      messase: "Dashboard data found",
      data: {
        totalUsers,
        totalBabies,
      },
    });
  })
);

module.exports = router;
