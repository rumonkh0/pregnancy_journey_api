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
const router = express.Router({ mergeParams: true });
const { protect } = require("../middleware/auth");

const uploadDirectory = "public/uploads/baby/";

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

router.use(protect);
router.get("/", getBabyList);
router.get("/:id", getBaby);
router.post("/", upload.single("baby_image_field"), createBaby);
router.put("/:babyId", upload.single("baby_image_field"), updateBaby);
router.delete("/:babyId", deleteBaby);

module.exports = router;
