const BabyFeed = require("../../models/Baby_care_models/Baby_feed");
const asyncHandler = require("../../middleware/async");
const Baby = require("../../models/Baby");
const { Op } = require("sequelize");
const { where } = require("sequelize");

// @desc      Get  Baby Feed history of a baby
// @route     GET /api/v1/fabyfeed/:babyId
// @access    Private
exports.getBabyFeedsHistory = asyncHandler(async (req, res, next) => {
  // Extract baby ID from the request params or body
  const { babyId } = req.params;
  const fromDate = req.query.from_date;
  const toDate = req.query.to_date;

  // Construct the where condition based on the provided dates
  let whereCondition = { id: babyId, mother_id: req.user.id };
  if (fromDate && toDate) {
    // If both from_date and to_date are provided, fetch records within the date range
    whereCondition = {
      ...whereCondition,
      createdAt: {
        [Op.between]: [fromDate, toDate],
      },
    };
  } else if (fromDate) {
    const startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(fromDate);
    endDate.setHours(23, 59, 59, 999);
    whereCondition = {
      ...whereCondition,
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    };
  }

  // Check if the requesting mother owns the specified baby
  const baby = await Baby.findOne({
    where: whereCondition,
  });
  if (!baby) {
    return res.status(403).json({
      success: false,
      message: "Access denied. You are not the owner of this baby.",
    });
  }

  // Get the feed history for the specified baby
  const babyFeedsHistory = await BabyFeed.findAll({
    where: { baby_id: babyId },
  });

  res
    .status(200)
    .json({ success: true, message: "Data found", data: babyFeedsHistory });
});

// @desc      Get single babyfeed
// @route     GET /api/v1/babyfeed/:babyId/:babyFeedId
// @access    Private
exports.getSingleBabyFeed = asyncHandler(async (req, res, next) => {
  // Extract baby ID from the request params or body
  const { babyId, babyFeedId } = req.params;

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
  const babyFeed = await BabyFeed.findByPk(babyFeedId);

  res
    .status(200)
    .json({ success: true, message: "Data found", data: babyFeed });
});

// @desc      Create baby feed
// @route     POST /api/v1/babyfeed/:babyId
// @access    Private
exports.createBabyFeed = asyncHandler(async (req, res, next) => {
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

  req.body.baby_id = babyId;
  // Get the feed history for the specified baby
  const babyFeed = await BabyFeed.create(req.body);

  res
    .status(200)
    .json({ success: true, message: "Data created", data: babyFeed });
});

// @desc      Update baby feed
// @route     PUT /api/v1/babyfeed/:babyId/:babyFeedId
// @access    Private
exports.updateBabyFeed = asyncHandler(async (req, res) => {
  // Extract baby ID from the request params or body
  const { babyId, babyFeedId } = req.params;

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

  res.status(200).json({ success: true, message: "Data updated" });
});

// @desc      Delete baby feed
// @route     DELETE /api/v1/babyfeed/:babyId/:babyFeedId
// @access    Private/Admin
exports.deleteBabyFeed = asyncHandler(async (req, res) => {
  // Extract baby ID from the request params or body
  const { babyId, feedId } = req.params;

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
  const deleted = await BabyFeed.destroy({ where: { id: feedId } });

  res.status(200).json({ success: true, message: "Data deleted" });
});

// @desc      Delete all baby feed
// @route     DELETE /api/v1/babyfeed/:babyId/
// @access    Private/Admin
exports.deleteAllBabyFeed = asyncHandler(async (req, res) => {
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
  const deleted = await BabyFeed.destroy({ where: { baby_id: babyId } });

  res.status(200).json({ success: true, message: "All data deleted" });
});
