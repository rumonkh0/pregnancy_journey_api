///this controller for users
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const { where } = require("sequelize");

// @desc      Get  Baby get all as history
// @route     GET /api/v1/route/history
// @access    Private
exports.getHistory = (Model, message) => {
  return asyncHandler(async (req, res, next) => {
    if (res.advancedResults) return res.status(200).json(res.advancedResults);
    const data = await Model.findAll();
    if (!data) {
      return res.status(403).json({
        success: false,
        message: "no record found.",
      });
    }

    // Get the feed history for the specified baby
    res.status(200).json({ success: true, message, data });
  });
};

// @desc      Get single
// @route     GET /api/v1/route/:modelPk
// @access    Private
exports.getOne = (Model, message) => {
  return asyncHandler(async (req, res, next) => {
    // Extract baby ID from the request params or body
    const { modelPk } = req.params;

    // Get the feed history for the specified baby
    const data = await Model.findOne({
      where: {
        id: modelPk,
      },
    });

    res.status(200).json({ success: true, message, data });
  });
};

// @desc      Create
// @route     POST /api/v1/route/:babyId
// @access    Private
exports.create = (Model, message) => {
  return asyncHandler(async (req, res, next) => {
    const data = await Model.create(req.body);

    res.status(200).json({ success: true, message, data });
  });
};

// @desc      Update
// @route     PUT /api/v1/babyfeed/:babyId/:modelPk
// @access    Private
exports.update = (Model, message) => {
  return asyncHandler(async (req, res) => {
    // Extract baby ID from the request params or body
    const { modelPk } = req.params;

    // Get the feed history for the specified baby
    const updated = await Model.update(req.body, {
      where: {
        id: modelPk,
      },
    });

    if (!updated[0]) {
      return res
        .status(200)
        .json({ success: false, message: "Record not modified" });
    }

    res.status(200).json({ success: true, message });
  });
};

// @desc      Delete
// @route     DELETE /api/v1/babyfeed/:babyId/:modelPk
// @access    Private/Admin
exports.deleteOne = (Model, message) => {
  return asyncHandler(async (req, res) => {
    // Extract baby ID from the request params or body
    const { modelPk } = req.params;

    // Get the feed history for the specified baby
    const deleted = await Model.destroy({
      where: { id: modelPk },
    });

    res.status(200).json({ success: true, message });
  });
};

// @desc      Delete all
// @route     DELETE /api/v1/babyfeed/:babyId
// @access    Private/Admin
exports.deleteAll = (Model) => {
  return asyncHandler(async (req, res) => {
    // Get the feed history for the specified baby
    const deleted = await Model.destroy({
      where: {},
      truncate: false,
    });

    res.status(200).json({ success: true, message: "All deleted" });
  });
};
