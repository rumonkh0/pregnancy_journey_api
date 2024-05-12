const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../../middleware/auth");
const {
  sendToAll,
  sendToUser,
  sendToCountry,
} = require("../../controllers/admin/notification");

router.use(protect);
router.use(authorize("superadmin", "notification"));

router.post("/all", sendToAll);
router.post("/user/:id", sendToUser);
router.post("/country/:country", sendToCountry);

module.exports = router;
