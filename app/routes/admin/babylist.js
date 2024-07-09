const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Baby = require("../../models/Baby");
const Media = require("../../models/Media");
const {
  getHistory,
  getOne,
  create,
  update,
  deleteOne,
} = require("../../controllers/crudControllerAdmin");
const router = express.Router();
const { protect } = require("../../middleware/auth");
const asyncHandler = require("../../middleware/async");

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
router.get("/", getHistory);
router.get(
  "/mother/:motherId",
  asyncHandler(async (req, res, next) => {
    // Extract baby ID from the request params or body
    const { motherId } = req.params;

    // Get the feed history for the specified baby
    const data = await Baby.findAll({
      where: {
        mother_id: motherId,
      },
    });

    res.status(200).json({ success: true, message: 'Found Babies', data });
  })
);
router.get("/:id", getOne);
router.post("/", upload.single("baby_image_field"), create);
router.put("/:babyId", upload.single("baby_image_field"), update);
router.delete("/:babyId", deleteOne);

module.exports = router;
