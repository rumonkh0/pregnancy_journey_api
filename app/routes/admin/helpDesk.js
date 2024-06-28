const express = require("express");
const { Op, literal } = require("sequelize");
const HelpDesk = require("../../models/HelpDesk");
const {
  getAllOfUser,
  getOne,
  update,
  create,
  deleteOne,
  deleteAll,
} = require("../../controllers/admin/adminCrudController");

const router = express.Router();
const { protect, authorize } = require("../../middleware/auth");
const asyncHandler = require("../../middleware/async");
const { Sequelize } = require("sequelize");
const User = require("../../models/User");
const Media = require("../../models/Media");
const Admin = require("../../models/Admin");

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

router.use(protect);
router.use(authorize("superadmin", "help_desk"));

router.get(
  "/unreplyed",
  asyncHandler(async (req, res, next) => {
    const lastMessages = await HelpDesk.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"],
          include: {
            model: Media,
            as: "media",
            attributes: ["id", "file_path"],
          },
        },
        {
          model: Admin,
          attributes: ["id", "username"],
          include: {
            model: Media,
            as: "profile_photo",
            attributes: ["id", "file_path"],
          },
        },
      ],
      where: Sequelize.literal(
        `(user_id, help_desk.createdAt) IN 
          (SELECT user_id, MAX(hd.createdAt) 
           FROM help_desk hd
           GROUP BY user_id) and admin_id is null`
      ),
    });

    // const result = lastMessages.filter((message) => message.admin_id == null);

    // if (!lastMessages.length) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "no record found.",
    //   });
    // }
    // Get the feed history for the specified baby
    res.status(200).json({ success: true, data: lastMessages });
  })
);

//total Unreplyed messages
router.get(
  "/totalunreplyed",
  asyncHandler(async (req, res, next) => {
    const totalUnreplyed = await HelpDesk.count({
      where: Sequelize.literal(
        `(user_id, help_desk.createdAt) IN 
          (SELECT user_id, MAX(hd.createdAt) 
           FROM help_desk hd
           GROUP BY user_id) and admin_id is null`
      ),
    });
    res
      .status(200)
      .json({ success: true, message: "Data found", data: totalUnreplyed });
  })
);

router.get(
  "/",
  asyncHandler(async () => {
    console.log("User");
  })
);

router.get(
  "/allmessages",
  asyncHandler(async (req, res, next) => {
    const lastMessages = await HelpDesk.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"],
          include: {
            model: Media,
            as: "media",
            attributes: ["id", "file_path"],
          },
        },
        {
          model: Admin,
          attributes: ["id", "username"],
          include: {
            model: Media,
            as: "profile_photo",
            attributes: ["id", "file_path"],
          },
        },
      ],
      where: Sequelize.literal(
        `(user_id, help_desk.createdAt) IN 
          (SELECT user_id, MAX(hd.createdAt) 
           FROM help_desk hd
           GROUP BY user_id)`
      ),
    });

    // const result = lastMessages.filter((message) => message.admin_id == null);

    // if (!lastMessages.length) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "no record found.",
    //   });
    // }
    // Get the feed history for the specified baby
    res.status(200).json({ success: true, data: lastMessages });
  })
);

router.get(
  "/alldoctor",
  asyncHandler(async (req, res, next) => {
    const allDoctor = await Admin.findAll({
      where: { type: "doctor" },
    });
    res.status(200).json({ success: true, data: allDoctor });
  })
);

// router.get(
//   "/allmessages",
//   asyncHandler(async (req, res, next) => {
//     //code for fetching all messages
//     try {
//       const lastMessages = await User.findAll({
//         attributes: ["id", "username"],
//         include: [
//           {
//             model: HelpDesk,
//             attributes: ["id", "message", "createdAt"],
//             limit: 1,
//             order: [["createdAt", "DESC"]],
//             required: false, // Include users even if they have no messages
//           },
//         ],
//         // Optional: where clause to filter users if needed
//       });

//       // Convert the results to JSON and clean up the data structure
//       const result = lastMessages
//         .map((user) => {
//           const userJSON = user.toJSON();
//           console.log(userJSON);
//           const lastMessage =
//             userJSON.help_desks.length > 0 ? userJSON.help_desks[0] : null;
//           delete userJSON.help_desks;
//           return {
//             ...userJSON,
//             lastMessage,
//           };
//         })
//         .filter((user) => user.lastMessage !== null);

//       console.log(JSON.stringify(result, null, 2));
//       res.status(200).json({ success: true, data: result });
//     } catch (err) {
//       console.error("Error fetching last messages:", err);
//     }
//   })
// );

router.get("/:userId/:modelPk", getOne(HelpDesk));
router.post("/:userId", upload.single("help_desk_image"), create(HelpDesk));
// // router.put("/:modelPk", update(HelpDesk));
router.delete("/userId/:modelPk", deleteOne(HelpDesk));
router.delete("/", deleteAll(HelpDesk));
router.get("/:userId", getAllOfUser(HelpDesk, "asc"));

module.exports = router;

// SELECT *
// FROM help_desk AS t1
// WHERE createdAt = (
//     SELECT MAX(createdAt)
//     FROM help_desk AS t2
//     WHERE t1.user_id = t2.user_id
//     AND t2.admin_id IS NULL
// );
