const Baby = require("../models/Baby");
const asyncHandler = require("../middleware/async");

// @desc      Get  Baby List Of Mother
// @route     GET /api/v1/babylist
// @access    Private
exports.getBabyList = asyncHandler(async (req, res, next) => {
  try {
    const babyList = await Baby.findAll({
      where: { mother_id: req.user.id },
    });
    res.json(babyList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Get single baby
// @route     GET /api/v1/babylist/:id
// @access    Private
exports.getBaby = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  try {
    const baby = await Baby.findAll({
      where: { id, mother_id: req.user.id },
    });
    if (!baby.length) {
      res.status(404).json({ message: "Baby not found" });
      return;
    }
    res.status(200).json({ success: true, data: baby });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch baby" });
  }
});

// @desc      Create baby
// @route     POST /api/v1/babylist
// @access    Private
exports.createBaby = asyncHandler(async (req, res, next) => {
  const babyData = req.body;
  babyData.mother_id = req.user.id;
  try {
    const baby = await Baby.create(babyData);
    res.status(201).json({ message: "Baby created", baby });
  } catch (error) {
    res.status(500).json({ error: "Failed to create baby" });
  }
});

// @desc      Update baby
// @route     PUT /api/v1/babylist/:id
// @access    Private
exports.updateBaby = asyncHandler(async (req, res) => {
  const id = req.params.babyId;
  const newData = req.body;
  try {
    const updated = await Baby.update(newData, {
      where: { id, mother_id: req.user.id },
    });
    if (!updated[0]) {
      res.status(404).json({ message: "Baby not found" });
      return;
    }
    res.json({ message: "Baby updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// @desc      Delete baby
// @route     DELETE /api/v1/babylist/:id
// @access    Private/Admin
exports.deleteBaby = asyncHandler(async (req, res) => {
  const id = req.params.babyId;
  try {
    const deleted = await Baby.destroy({
      where: { id, mother_id: req.user.id },
    });
    if (!deleted) {
      res.status(404).json({ message: "Baby not found" });
      return;
    }
    res.json({ message: "Baby deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});
