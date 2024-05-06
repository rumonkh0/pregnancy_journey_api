const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const DailyReads = require("../../../models/daily/Daily_read");

const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  stringify,
} = require("../../../controllers/crudController");

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../../../middleware/auth");
const advancedResults = require("../../../middleware/advancedResults");

const uploadDirectory = "public/uploads/dailyreads/";

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



router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error
    res.status(400).json({ error: "File upload error: " + err.message });
  } else {
    // Other errors
    next(err);
  }
});

router.use(
  protect,
  authorize("superadmin", "admin", "dailyreads"),
  stringify("title", "description")
);

router.get(
  "/",
  advancedResults(DailyReads, undefined, "lan"),
  getAll(DailyReads)
);
router.get("/:modelPk", getOne(DailyReads));
router.post("/", upload.single("dailyreads_image"), create(DailyReads));
router.put("/:modelPk", upload.single("dailyreads_image"), update(DailyReads));
router.delete("/:modelPk", deleteOne(DailyReads));

module.exports = router;
