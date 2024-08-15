const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const {
  getAllComment,
  getComment,
  createComment,
  updateComment,
  deleteComment,
  checkOwner,
  reportComment,
} = require("../../controllers/community/comment");
const router = express.Router({ mergeParams: true });
const reactionRouter = require("./reaction");
const replyRouter = require("./reply");
const { protect } = require("../../middleware/auth");

const uploadDirectory = "public/uploads/comment/";

router.use(protect);

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
    console.log(req.user.username);
    cb(
      null,
      file.fieldname +
        "-" +
        // req.user.username +
        // "-" +
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

router.use("/:commentId/reaction", reactionRouter);
router.use("/:commentId/reply", replyRouter);

router.get("/", getAllComment);
router.get("/:id", getComment);
router.post("/report/:id", reportComment);
router.post("/", upload.single("comment_image_field"), createComment);
router.put("/:id", updateComment);
router.delete("/:id", checkOwner, deleteComment);

module.exports = router;
