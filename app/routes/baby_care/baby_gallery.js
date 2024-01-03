const path = require("path");
const fs = require("fs");
const express = require("express");
const multer = require("multer");
const {
  createBabyGallery,
  getAll,
  getOne,
  checkBabyOwner,
  updateBabyGallery,
  deleteBabygallery,
} = require("../../controllers/baby_care/baby_gallery");
const { protect } = require("../../middleware/auth");
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
  //     cb(null, false);
  //   }
  // },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB size limit
  },
});

const router = express.Router();

router.post(
  "/:babyId",
  protect,
  checkBabyOwner,
  upload.single('baby_Image_file'),
  createBabyGallery
);
router.put(
  "/:babyId/:modelPk",
  protect,
  checkBabyOwner,
  upload.single('baby_Image_file'),
  updateBabyGallery
);
router.get("/:babyId", protect, checkBabyOwner, getAll);
router.get("/:babyId/:modelPk", protect, checkBabyOwner, getOne);
router.delete("/:babyId/:modelPk", protect, checkBabyOwner, deleteBabygallery);

module.exports = router;
