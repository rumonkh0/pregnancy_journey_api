const asyncHandler = require("../../middleware/async");
const Baby = require("../../models/Baby");
const { where } = require("sequelize");

exports.checkBabyOwner = asyncHandler(async (req, res, next) => {
  const { babyId } = req.params;

  if (!req.user)
    return res.status(200).json({
      remark: "UNAUTORIZED",
      success: false,
      message: "not authorized for access this route",
    });

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

  next();
});

// @desc      Get  Baby get all as history
// @route     GET /api/v1/route/:modelPk
// @access    Private
exports.getHistory = (Model) => {
  return asyncHandler(async (req, res, next) => {
    // Extract baby ID from the request params or body
    const { babyId } = req.params;

    // Get the feed history for the specified baby
    const history = await Model.findAll({
      where: { baby_id: babyId },
    });

    res
      .status(200)
      .json({ success: true, message: "Data found", data: history });
  });
};

// @desc      Get single
// @route     GET /api/v1/babyfeed/:babyId/:modelPk
// @access    Private
exports.getOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    // Extract baby ID from the request params or body
    const { babyId, modelPk } = req.params;

    // Get the feed history for the specified baby
    const babyFeed = await Model.findByPk(modelPk);

    res
      .status(200)
      .json({ success: true, message: "Data found", data: babyFeed });
  });
};

// @desc      Create
// @route     POST /api/v1/route/:babyId
// @access    Private
exports.create = (Model) => {
  return asyncHandler(async (req, res, next) => {
    // Extract baby ID from the request params or body
    const { babyId } = req.params;

    req.body.baby_id = babyId;
    // Get the feed history for the specified baby
    const babyFeed = await Model.create(req.body);

    res
      .status(200)
      .json({ success: true, message: "Data found", data: babyFeed });
  });
};

// @desc      Update
// @route     PUT /api/v1/babyfeed/:babyId/:modelPk
// @access    Private
exports.update = (Model) => {
  return asyncHandler(async (req, res) => {
    // Extract baby ID from the request params or body
    const { babyId, modelPk } = req.params;

    // Get the feed history for the specified baby
    const updated = await Model.update(req.body, {
      where: {
        id: modelPk,
      },
    });

    if (!updated[0]) {
      return res
        .status(200)
        .json({ success: false, message: "Recond no modified" });
    }

    res.status(200).json({ success: true, message: "data updated" });
  });
};

// @desc      Delete
// @route     DELETE /api/v1/babyfeed/:babyId/:modelPk
// @access    Private/Admin
exports.deleteOne = (Model) => {
  return asyncHandler(async (req, res) => {
    // Extract baby ID from the request params or body
    const { babyId, modelPk } = req.params;

    // Get the feed history for the specified baby
    const deleted = await Model.destroy({ where: { id: modelPk } });

    res.status(200).json({ success: true, message: "data deleted" });
  });
};

// @desc      Delete all
// @route     DELETE /api/v1/babyfeed/:babyId
// @access    Private/Admin
exports.deleteAll = (Model) => {
  return asyncHandler(async (req, res) => {
    // Extract baby ID from the request params or body
    const { babyId } = req.params;

    // Get the feed history for the specified baby
    const deleted = await Model.destroy({ where: { baby_id: babyId } });

    res.status(200).json({ success: true, message: "All data deleted" });
  });
};
