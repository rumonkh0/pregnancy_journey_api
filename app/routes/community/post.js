const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../../controllers/community/post");
const commentRouter = require("./comment");
const reactionRouter = require("./reaction");
const router = express.Router({ mergeParams: true });
const { protect } = require("../../middleware/auth");

const uploadDirectory = "public/uploads/post/";

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
        req.user.username +
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

router.use("/:postId/comment", commentRouter);
router.use("/:postId/reaction", reactionRouter);

router.use(protect);
router.get("/", getAllPost);
router.get("/:id", getPost);
router.post("/", upload.any("2"), createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
