const BabyDiaper = require("../../models/Baby_care_models/Baby_diaper");
const asyncHandler = require("../../middleware/async");
const Baby = require("../../models/Baby");
const { where } = require("sequelize");

// @desc      Get  Baby diaper of a baby
// @route     GET /api/v1/diaper/:babyId
// @access    Private
exports.getDiapersHistory = asyncHandler(async (req, res, next) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId } = req.params;

    // Check if the requesting mother owns the specified baby
    const baby = await Baby.findOne({
      where: { id: babyId, mother_id: req.user.id },
    });

    if (!baby) {
      return res.status(403).json({
        message: "Access denied. You are not the owner of this baby.",
      });
    }
    // Get the feed history for the specified baby
    const babyDiaperHistory = await BabyDiaper.findAll({
      where: { baby_id: babyId },
    });

    res.status(200).json({ success: true, data: babyDiaperHistory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Get single diaper history
// @route     GET /api/v1/babyfeed/:babyId/:babyDiaperId
// @access    Private
exports.getSingleBabyDiaper = asyncHandler(async (req, res, next) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId, babyDiaperId } = req.params;

    // Check if the requesting mother owns the specified baby
    const baby = await Baby.findOne({
      where: { id: babyId, mother_id: req.user.id },
    });
    if (!baby) {
      return res.status(403).json({
        message: "Access denied. You are not the owner of this baby.",
      });
    }

    // Get the feed history for the specified baby
    const babyDiaper = await BabyDiaper.findByPk(babyDiaperId);

    res.status(200).json({ success: true, data: babyDiaper });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Create baby feed
// @route     POST /api/v1/babyfeed/:babyId
// @access    Private
exports.createBabyDiaper = asyncHandler(async (req, res, next) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId } = req.params;

    // Check if the requesting mother owns the specified baby
    const baby = await Baby.findOne({
      where: { id: babyId, mother_id: req.user.id },
    });
    if (!baby) {
      return res.status(403).json({
        message: "Access denied. You are not the owner of this baby.",
      });
    }

    req.body.baby_id = babyId;
    // Get the feed history for the specified baby
    const babyDiaper = await BabyDiaper.create(req.body);

    res.status(200).json({ success: true, data: babyDiaper });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Update baby feed
// @route     PUT /api/v1/babyfeed/:babyId/:babyDiaperId
// @access    Private
exports.updateBabyDiaper = asyncHandler(async (req, res) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId, babyDiaperId } = req.params;

    // Check if the requesting mother owns the specified baby
    const baby = await Baby.findOne({
      where: { id: babyId, mother_id: req.user.id },
    });
    if (!baby) {
      return res.status(403).json({
        message: "Access denied. You are not the owner of this baby.",
      });
    }

    // Get the feed history for the specified baby
    const updated = await BabyDiaper.update(req.body, {
      where: {
        id: babyDiaperId,
      },
    });

    if (!updated[0]) {
      return res
        .status(304)
        .json({ success: fase, message: "Recond no modified" });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Delete baby feed
// @route     DELETE /api/v1/babyfeed/:babyId/:babyDiaperId
// @access    Private/Admin
exports.deleteBabyDiaper = asyncHandler(async (req, res) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId, babyDiaperId } = req.params;

    // Check if the requesting mother owns the specified baby
    const baby = await Baby.findOne({
      where: { id: babyId, mother_id: req.user.id },
    });
    if (!baby) {
      return res.status(403).json({
        message: "Access denied. You are not the owner of this baby.",
      });
    }

    // Get the feed history for the specified baby
    const deleted = await BabyDiaper.destroy({ where: { id: babyDiaperId } });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Delete all baby feed
// @route     DELETE /api/v1/babyfeed/:babyId/
// @access    Private/Admin
exports.deleteAllBabyDiaper = asyncHandler(async (req, res) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId } = req.params;

    // Check if the requesting mother owns the specified baby
    const baby = await Baby.findOne({
      where: { id: babyId, mother_id: req.user.id },
    });
    if (!baby) {
      return res.status(403).json({
        message: "Access denied. You are not the owner of this baby.",
      });
    }

    // Get the feed history for the specified baby
    const deleted = await BabyDiaper.destroy({ where: { baby_id: babyId } });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
