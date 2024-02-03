const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  resendOTP,
  confirmEmail,
  oAuth,
} = require("../controllers/auth");
const router = express.Router();

const { protect } = require("../middleware/auth");
const uploadDirectory = "public/uploads/user/";

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
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB size limit
  },
});

router.post("/register", register);
router.post("/login", login);
router.get("/logout", protect, logout);
router.get("/me", protect, getMe);
router.put("/updatedetails", protect, upload.single('user_image_field'), updateDetails);
router.put("/updatepassword", protect, updatePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/", resetPassword);
router.post("/sendotp", protect, resendOTP);
router.post("/confirmemail", confirmEmail);
router.post("/social-auth", oAuth);

module.exports = router;
