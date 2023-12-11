const BreastPump = require("../../models/Baby_care_models/Baby_breast_pumping");
const asyncHandler = require("../../middleware/async");
const Baby = require("../../models/Baby");
const { where } = require("sequelize");

//Check owner of baby
// exports.checkOwner = asyncHandler(async (req, res, next) => {
//   // Check if the requesting mother owns the specified baby
//   const baby = await Baby.findOne({
//     where: { id: babyId, mother_id: req.user.id },
//   });
//   if (!baby) {
//     return res.status(403).json({
//       success: false,
//       message: "Access denied. You are not the owner of this baby.",
//     });
//   }
// });

// @desc      Get  Baby Feed history of a baby
// @route     GET /api/v1/breastpump/:babyId
// @access    Private
exports.getBabyBreastPumpsHistory = asyncHandler(async (req, res, next) => {
  // Extract baby ID from the request params or body
  const { babyId } = req.params;

  // Check if the requesting mother owns the specified baby
  const baby = await Baby.findOne({
    where: { id: babyId, mother_id: req.user.id },
  });
  if (!baby) {
    return res.status(403).json({
      success: false,
      message: "Access denied. You are not the owner of this baby.",
    });
  }

  // Get the feed history for the specified baby
  const breastPumpsHistory = await BreastPump.findAll({
    where: { baby_id: babyId },
  });

  res
    .status(200)
    .json({ success: true, messae: "Found History", data: breastPumpsHistory });
});

// @desc      Get single breastpump
// @route     GET /api/v1/breastpump/:babyId/:breastPumpId
// @access    Private
exports.getSingleBreastPump = asyncHandler(async (req, res, next) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId, breastPumpId } = req.params;

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
    const breastPump = await BreastPump.findByPk(breastPumpId);

    res.status(200).json({ success: true, data: breastPump });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Create baby feed
// @route     POST /api/v1/breastpump/:babyId
// @access    Private
exports.createBreastPump = asyncHandler(async (req, res, next) => {
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
    const breastPump = await BreastPump.create(req.body);

    res.status(200).json({ success: true, data: breastPump });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Update baby feed
// @route     PUT /api/v1/breastpump/:babyId/:breastPumpId
// @access    Private
exports.updateBreastPump = asyncHandler(async (req, res) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId, breastPumpId } = req.params;

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
    const updated = await BreastPump.update(req.body, {
      where: {
        id: breastPumpId,
      },
    });

    if (!updated[0]) {
      return res
        .status(304)
        .json({ success: false, message: "Recond no modified" });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Delete baby feed
// @route     DELETE /api/v1/breastpump/:babyId/:breastPumpId
// @access    Private/Admin
exports.deleteBreastPump = asyncHandler(async (req, res) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId, breastPumpId } = req.params;

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
    const deleted = await BreastPump.destroy({ where: { id: breastPumpId } });

    if (!deleted)
      return res
        .status(200)
        .json({ success: false, message: "data not found" });

    res.status(200).json({ success: true, messae: "deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Delete all baby feed
// @route     DELETE /api/v1/breastpump/:babyId/
// @access    Private/Admin
exports.deleteAllBreastPump = asyncHandler(async (req, res) => {
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
    const deleted = await BreastPump.destroy({ where: { baby_id: babyId } });

    if (!deleted)
      return res
        .status(200)
        .json({ success: false, message: "data not found" });

    res.status(200).json({ success: true, message: "deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
