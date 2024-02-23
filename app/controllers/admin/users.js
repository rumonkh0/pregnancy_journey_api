const User = require("../../models/User");
const asyncHandler = require("../../middleware/async");
// @desc      Get all users
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
  // try {
  //   const users = await User.findAll();
  //   res.json(users);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
});

// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const id = req.params.userId;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }
  res.status(200).json({ success: true, data: user });
});

// @desc      Create user
// @route     POST /api/v1/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const userData = req.body;
  const user = await User.create(userData);
  res.status(201).json({ success: true, message: "User created", data: user });
});

// @desc      Update user
// @route     PUT /api/v1/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
  const id = req.params.userId;
  const newData = req.body;
  const updated = await User.update(newData, { where: { id } });
  const user = await User.findByPk(id);
  if (!updated) {
    res.status(404).json({ success: "false", message: "User not found" });
    return;
  }
  res
    .status(200)
    .json({ success: true, message: "User updated", data: { user } });
});

// @desc      Delete user
// @route     DELETE /api/v1/users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.userId;
  const deleted = await User.destroy({ where: { id } });
  if (!deleted) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }
  res.status(200).json({ success: true, message: "User deleted" });
});
