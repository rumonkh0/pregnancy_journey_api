const express = require("express");
const babyListRouter = require("../baby");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/admin/users");
const advancedResults = require("../../middleware/advancedResults");
const User = require("../../models/User");

const router = express.Router();
const { protect, authorize } = require("../../middleware/auth");
router.use(authorize("superadmin", "user"));
// router.use('/:motherId/babylist', babyListRouter);

// Route to get all users
router.get("/", advancedResults(User), getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
