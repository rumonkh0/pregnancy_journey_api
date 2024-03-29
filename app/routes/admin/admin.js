const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const {
  getAdmins,
  getRoles,
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

const uploadDirectory = "public/uploads/admin/";

// Ensure that the upload directory exists; if not, create it
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        req.admin.username +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB size limit
  },
});

router.get("/roles", getRoles);
router.get("/:adminId", getAdmin);
router.post("/", createAdmin);
router.put("/:adminId", upload.single("admin_image_field"), updateAdmin);
router.post("/role/:adminId/:roleId", updateAdminRole);
router.delete("/:adminId", deleteAdmin);

module.exports = router;
