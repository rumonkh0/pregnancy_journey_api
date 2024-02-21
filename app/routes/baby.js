const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const {
  getBabyList,
  getBaby,
  createBaby,
  updateBaby,
  deleteBaby,
} = require("../controllers/baby");
const User = require("../models/Baby");
const router = express.Router({ mergeParams: true });
const { protect } = require("../middleware/auth");
const uploadDirectory = "public/uploads/baby/";

// Ensure that the upload directory exists; if not, create it
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

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
  // fileFilter: (req, file, cb) => {
  //   if (file.mimetype.startsWith("image")) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error('Invalid file type. Only octet-stream files are allowed.'));
  //   }
  // },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB size limit
  },
});

router.use(protect);
router.get("/", getBabyList);
router.get("/:id", getBaby);
router.post("/", createBaby);
router.put("/:babyId", upload.single("baby_image_field"), updateBaby);
router.delete("/:babyId", deleteBaby);

module.exports = router;
