const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const SizeCompareImage = require("../../../models/babyGrowthDashboardWeekly/SizeCompareImage");
const {
  getHistory,
  getOne,
  create,
  update,
  deleteOne,
} = require("../../../controllers/crudControllerAdmin");

const router = express.Router();

const { protect, authorize } = require("../../../middleware/auth");
const advancedResults = require("../../../middleware/advancedResults");
const Media = require("../../../models/Media");

router.use(protect, authorize("superadmin", "admin", "babyGrowthWeek"));

const uploadDirectory = "public/uploads/compare_images/";

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
        req.body.compare_by +
        "-" +
        req.body.week +
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
const include = { model: Media, as: "media" };
router.get(
  "/",
  //   advancedResults(SizeCompareImage, undefined),
  getHistory(SizeCompareImage, "Size compare image found")
);
router.get(
  "/:modelPk",
  getOne(SizeCompareImage, "Size compare image data found", include)
);
router.post(
  "/",
  upload.single("compare_image_field"),
  create(SizeCompareImage, "Size compare image created")
);
router.put(
  "/:modelPk",
  upload.single("compare_image_field"),
  update(SizeCompareImage, "Size compare image updated")
);
router.delete(
  "/:modelPk",
  deleteOne(SizeCompareImage, "Size compare image deleted")
);

module.exports = router;
