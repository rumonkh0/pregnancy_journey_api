const BabyFeed = require("../../models/Baby_care_models/Baby_feed");
const asyncHandler = require("../../middleware/async");
const Baby = require("../../models/Baby");
const { where } = require("sequelize");

// @desc      Get  Baby Feed history of a baby
// @route     GET /api/v1/fabyfeed/:babyId
// @access    Private
exports.getBabyFeedsHistory = asyncHandler(async (req, res, next) => {
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
    const babyFeedsHistory = await BabyFeed.findAll({
      where: { baby_id: babyId },
    });

    res.status(200).json({ success: true, data: babyFeedsHistory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Get single babyfeed
// @route     GET /api/v1/babyfeed/:babyId/:babyFeedId
// @access    Private
exports.getSingleBabyFeed = asyncHandler(async (req, res, next) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId, babyFeedId } = req.params;

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
    const babyFeed = await BabyFeed.findByPk(babyFeedId);

    res.status(200).json({ success: true, data: babyFeed });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Create baby feed
// @route     POST /api/v1/babyfeed/:babyId
// @access    Private
exports.createBabyFeed = asyncHandler(async (req, res, next) => {
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
    const babyFeed = await BabyFeed.create(req.body);

    res.status(200).json({ success: true, data: babyFeed });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Update baby feed
// @route     PUT /api/v1/babyfeed/:babyId/:babyFeedId
// @access    Private
exports.updateBabyFeed = asyncHandler(async (req, res) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId, babyFeedId } = req.params;

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
    const updated = await BabyFeed.update(req.body, {
      where: {
        id: babyFeedId,
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
// @route     DELETE /api/v1/babyfeed/:babyId/:babyFeedId
// @access    Private/Admin
exports.deleteBabyFeed = asyncHandler(async (req, res) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId, feedId } = req.params;

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
    const deleted = await BabyFeed.destroy({ where: { id: feedId } });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Delete all baby feed
// @route     DELETE /api/v1/babyfeed/:babyId/
// @access    Private/Admin
exports.deleteAllBabyFeed = asyncHandler(async (req, res) => {
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
    const deleted = await BabyFeed.destroy({ where: { baby_id: babyId } });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
