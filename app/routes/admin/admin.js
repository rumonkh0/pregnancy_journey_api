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

router.use(protect);
router.use(authorize("superadmin"));
router.get("/", advancedResults(Admin), getAdmins);
router.get("/:adminId", getAdmin);
router.post("/", createAdmin);
router.put("/:adminId", updateAdmin);
router.post("/role/:adminId/:roleId", updateAdminRole);
router.delete("/:adminId", deleteAdmin);

module.exports = router;
