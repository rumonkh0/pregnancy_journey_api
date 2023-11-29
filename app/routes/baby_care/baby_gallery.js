const path = require("path");
const express = require("express");
const multer = require("multer");
const {
  createBabyGallery,
} = require("../../controllers/baby_care/baby_gallery");
const { protect } = require("../../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/baby/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const router = express.Router();

router.post("/:babyId", protect, upload.any(), createBabyGallery);

module.exports = router;
