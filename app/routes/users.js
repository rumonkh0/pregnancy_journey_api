const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const router = express.Router();

// Route to get all users
router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
