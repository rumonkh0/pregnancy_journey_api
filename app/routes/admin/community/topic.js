const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const {
  getAllReactionType,
  createReactionType,
  updateReactionType,
  deleteReactionType,
  getReactionType,
} = require("../../../controllers/admin/community/topic");
const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../../../middleware/auth");
router.use(protect);
router.use(authorize("superadmin", "admin", "community"));

const uploadDirectory = "public/uploads/post_topic/";

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

// router.use(protect);
router.get("/", getAllReactionType);
router.get("/:pk", getReactionType);
router.post("/", upload.single("topic_image"), createReactionType);
router.put("/:pk", upload.single("topic_image"), updateReactionType);
router.delete("/:pk", deleteReactionType);

module.exports = router;
