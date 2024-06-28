const express = require("express");
const HelpDesk = require("../models/HelpDesk");
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

const router = express.Router();
const { protect } = require("../middleware/auth");
const MotherDiet = require("../models/tools/mother/Mother_diet");

router.use(protect);

router.get("/", getHistory(HelpDesk));
router.get("/:modelPk", getOne(HelpDesk));
router.post("/", upload.single("help_desk_image"), create(HelpDesk));
// router.put("/:modelPk", update(HelpDesk));
router.delete("/:modelPk", deleteOne(HelpDesk));
// router.delete("/", deleteAll(HelpDesk));

router.get("/", getHistory(MotherDiet));
router.get("/:modelPk", getOne(MotherDiet));
router.post("/", create(MotherDiet));
module.exports = router;
