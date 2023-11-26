const User = require("../models/user");
const asyncHandler = require("../middleware/async");
// @desc      Get all users
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const id = req.params.userId;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// @desc      Create user
// @route     POST /api/v1/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const userData = req.body; // Assuming data comes in as JSON in the request body
  try {
    const user = await User.create(userData);
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// @desc      Update user
// @route     PUT /api/v1/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
  const id = req.params.userId;
  const newData = req.body;
  try {
    const updated = await User.update(newData, { where: { id } });
    if (!updated) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "User updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// @desc      Delete user
// @route     DELETE /api/v1/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.userId;
  try {
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});
