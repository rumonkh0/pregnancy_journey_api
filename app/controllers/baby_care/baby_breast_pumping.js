const BreastPump = require("../../models/Baby_care_models/Baby_breast_pumping");
const asyncHandler = require("../../middleware/async");
const Baby = require("../../models/Baby");
const { Op } = require("sequelize");
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
  const breastPumpsHistory = await BreastPump.findAll({
    where: { baby_id: babyId },
  });

  res.status(200).json({
    success: true,
    message: "Found History",
    data: breastPumpsHistory,
  });
});

// @desc      Get single breastpump
// @route     GET /api/v1/breastpump/:babyId/:breastPumpId
// @access    Private
exports.getSingleBreastPump = asyncHandler(async (req, res, next) => {
  // Extract baby ID from the request params or body
  const { babyId, breastPumpId } = req.params;

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
  const breastPump = await BreastPump.findByPk(breastPumpId);

  res
    .status(200)
    .json({ success: true, message: "data found", data: breastPump });
});

// @desc      Create baby feed
// @route     POST /api/v1/breastpump/:babyId
// @access    Private
exports.createBreastPump = asyncHandler(async (req, res, next) => {
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
  const breastPump = await BreastPump.create(req.body);

  res
    .status(200)
    .json({ success: true, message: "Data Created", data: breastPump });
});

// @desc      Update baby feed
// @route     PUT /api/v1/breastpump/:babyId/:breastPumpId
// @access    Private
exports.updateBreastPump = asyncHandler(async (req, res) => {
  // Extract baby ID from the request params or body
  const { babyId, breastPumpId } = req.params;

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

  res.status(200).json({ success: true, message: "data updated" });
});

// @desc      Delete baby feed
// @route     DELETE /api/v1/breastpump/:babyId/:breastPumpId
// @access    Private/Admin
exports.deleteBreastPump = asyncHandler(async (req, res) => {
  // Extract baby ID from the request params or body
  const { babyId, breastPumpId } = req.params;

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
  const deleted = await BreastPump.destroy({ where: { id: breastPumpId } });

  if (!deleted)
    return res.status(200).json({ success: false, message: "data not found" });

  res.status(200).json({ success: true, message: "deleted" });
});

// @desc      Delete all baby feed
// @route     DELETE /api/v1/breastpump/:babyId/
// @access    Private/Admin
exports.deleteAllBreastPump = asyncHandler(async (req, res) => {
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
  const deleted = await BreastPump.destroy({ where: { baby_id: babyId } });

  if (!deleted)
    return res.status(200).json({ success: false, message: "data not found" });

  res.status(200).json({ success: true, message: "deleted" });
});
