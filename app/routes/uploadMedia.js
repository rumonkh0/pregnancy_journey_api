const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const router = express.Router();

const { protect } = require("../middleware/auth");
const asyncHandler = require("../middleware/async");
const Media = require("../models/Media");
const uploadDirectory = "public/uploads/admins/";

//Ensure that the upload directory exists; if not, create it
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
        "admin" +
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

const uploadImage = asyncHandler(async (req, res, next) => {
  const { mimetype, filename, path: file_path , originalname} = req.file;
  req.media = {
    // uploaded_by: req.user.username,
    file_path,
    mime_type: mimetype,
    file_name: filename,
    original_name: originalname,
    file_type: path.extname(filename).slice(1),
  };

  let media = await Media.create(req.media);

  const imageUrl = file_path.replace("public", "");

  return res.status(200).json({
    success: true,
    message: "image upload done",
    imageUrl,
    media,
  });
});

router.post("/", upload.single("admin_up"), uploadImage);
module.exports = router;
