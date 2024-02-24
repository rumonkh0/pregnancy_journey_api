const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const babyListRouter = require("../baby");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/admin/users");
const advancedResults = require("../../middleware/advancedResults");
const User = require("../../models/User");

const uploadDirectory = "public/uploads/user/";

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

const router = express.Router();
const { protect, authorize } = require("../../middleware/auth");
router.use(protect, authorize("superadmin", "admin", "user"));
// router.use('/:motherId/babylist', babyListRouter);

// Route to get all users
router.get("/", advancedResults(User), getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.put("/:userId", upload.single("user_image_field"), updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
