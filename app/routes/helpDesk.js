const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const HelpDesk = require("../models/HelpDesk");
const Media = require("../models/Media");
const asyncHandler = require("../middleware/async");
const {
  getHistory,
  getOne,
  update,
  create,
  deleteOne,
  deleteAll,
} = require("../controllers/helpDesk");

const uploadDirectory = "public/uploads/helpdesk/";

// Ensure that the upload directory exists; if not, create it
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".docx"];

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

const router = express.Router();
const { protect } = require("../middleware/auth");
const MotherDiet = require("../models/tools/mother/Mother_diet");

router.use(protect);

router.get("/", getHistory(HelpDesk));
router.get("/:modelPk", getOne(HelpDesk));
router.post(
  "/",
  upload.single("help_desk_image"),
  asyncHandler(async (req, res, next) => {
    if (!req.file) {
      if (!req.message) {
        return res.status(404).json({
          success: false,
          message: "message is required",
        });
      }

      await HelpDesk.create(req.body);
      return res.status(200).json({ success: true, message: "Message Sent" });
    }

    const { mimetype, filename, path: file_path } = req.file;
    req.media = {
      uploaded_by: req.user.username,
      file_path,
      mime_type: mimetype,
      file_name: filename,
      file_type: path.extname(filename).slice(1),
    };

    // console.log(req.media);

    let media;
    try {
      media = await Media.create(req.media);
      req.body.image = media.id;
    } catch (err) {
      console.log(err);
      if (req.file && req.file.path) {
        const filePath = req.file.path;
        await unlinkAsync(filePath);
      }
      return res.status(200).json({
        remark: "UNSUCCESSFULL",
        success: false,
        message: "data upload failed",
        error: err,
      });
    }

    /////////////////////////////////////////////////////////

    // Get the feed history for the specified baby
    console.log(req.body.image);
    req.body.user_id = req.user.id;
    const babyFeed = await HelpDesk.create(req.body);

    res.status(200).json({ success: true, message: "Created", data: babyFeed });
  })
);
// router.put("/:modelPk", update(HelpDesk));
router.delete("/:modelPk", deleteOne(HelpDesk));
// router.delete("/", deleteAll(HelpDesk));

router.get("/", getHistory(MotherDiet));
router.get("/:modelPk", getOne(MotherDiet));
router.post("/", create(MotherDiet));
module.exports = router;
