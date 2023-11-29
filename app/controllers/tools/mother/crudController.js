const asyncHandler = require("../../../middleware/async");
const Baby = require("../../../models/Baby");
const { where } = require("sequelize");

// @desc      Get  Baby get all as history
// @route     GET /api/v1/route/:modelPk
// @access    Private
exports.getHistory = (Model) => {
  return asyncHandler(async (req, res, next) => {
    // Get the feed history for the specified baby
    const History = await Model.fundAll({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });

    res.status(200).json({ success: true, data: History });
  });
};

// @desc      Get single
// @route     GET /api/v1/babyfeed/:babyId/:modelPk
// @access    Private
exports.getOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    // Get the feed history for the specified baby
    const result = await Model.findOne({
      where: { id: req.params.pk, user_id: req.user.id },
    });

    res.status(200).json({ success: true, data: result });
  });
};

// @desc      Create
// @route     POST /api/v1/route/:babyId
// @access    Private
exports.create = (Model) => {
  return asyncHandler(async (req, res, next) => {
    req.body.user_id = req.user.id;
    // Get the feed history for the specified baby
    const data = await Model.create(req.body);

    res.status(200).json({ success: true, data: data });
  });
};

// @desc      Update
// @route     PUT /api/v1/babyfeed/:babyId/:modelPk
// @access    Private
exports.update = (Model) => {
  return asyncHandler(async (req, res) => {
    // Get the feed history for the specified baby
    const updated = await Model.update(req.body, {
      where: {
        id: req.params.pk,
        user_id: req.user.id,
      },
    });

    if (!updated[0]) {
      return res
        .status(200)
        .json({ success: false, message: "Recond not modified" });
    }

    res.status(200).json({ success: true });
  });
};

// @desc      Delete
// @route     DELETE /api/v1/babyfeed/:babyId/:modelPk
// @access    Private/Admin
exports.deleteOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    // Get the feed history for the specified baby
    const deleted = await Model.destroy({
      where: { id: req.params.pk, user_id: req.user.user_id },
    });

    res.status(200).json({ success: true });
  });
};

// @desc      Delete all
// @route     DELETE /api/v1/babyfeed/:babyId
// @access    Private/Admin
exports.deleteAll = (Model) => {
  return asyncHandler(async (req, res) => {
    // Get the feed history for the specified baby
    const deleted = await Model.destroy({
      where: { id: req.params.pk, user_id: req.user.id },
    });

    res.status(200).json({ success: true });
  });
};
