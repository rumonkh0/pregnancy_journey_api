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
const Role = require("../../models/Role");
const Media = require("../../models/Media");

router.use(protect);
router.use(authorize("superadmin"));
router.get(
  "/",
  advancedResults(Admin, [
    {
      model: Role,
      attributes: ["role"],
    },
    {
      model: Media,
      as: "profile_photo",
      attributes: ["file_name", "file_path"],
    },
  ]),
  getAdmins
);
router.get("/:adminId", getAdmin);
router.post("/", createAdmin);
router.put("/:adminId", updateAdmin);
router.post("/role/:adminId/:roleId", updateAdminRole);
router.delete("/:adminId", deleteAdmin);

module.exports = router;
