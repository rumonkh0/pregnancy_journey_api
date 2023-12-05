const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const { where } = require("sequelize");

// @desc      Get  Baby get all as history
// @route     GET /api/v1/route/history
// @access    Private
exports.getHistory = (Model) => {
  return asyncHandler(async (req, res, next) => {
    try {
      // Check if the requesting mother owns the specified baby
      const data = await Model.findAll({
        where: { user_id: req.user.id },
      });
      if (!data) {
        return res.status(403).json({
          message: "no record found.",
        });
      }

      // Get the feed history for the specified baby
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
};

// @desc      Get single
// @route     GET /api/v1/route/:modelPk
// @access    Private
exports.getOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    try {
      // Extract baby ID from the request params or body
      const { modelPk } = req.params;

      // Get the feed history for the specified baby
      const data = await Model.findOne({
        where: {
          id: modelPk,
          user_id: req.user.id,
        },
      });

      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
};

// @desc      Create
// @route     POST /api/v1/route/:babyId
// @access    Private
exports.create = (Model) => {
  return asyncHandler(async (req, res, next) => {
    try {
      // Extract baby ID from the request params or body
      const { babyId } = req.params;

      // Get the feed history for the specified baby
      req.body.user_id = req.user.id;
      const babyFeed = await Model.create(req.body);

      res.status(200).json({ success: true, data: babyFeed });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message, error });
    }
  });
};

// @desc      Update
// @route     PUT /api/v1/babyfeed/:babyId/:modelPk
// @access    Private
exports.update = (Model) => {
  return asyncHandler(async (req, res) => {
    try {
      // Extract baby ID from the request params or body
      const { modelPk } = req.params;

      // Get the feed history for the specified baby
      const updated = await Model.update(req.body, {
        where: {
          id: modelPk,
          user_id: req.user.id,
        },
      });

      if (!updated[0]) {
        return res
          .status(200)
          .json({ success: false, message: "Record no modified" });
      }

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
};

// @desc      Delete
// @route     DELETE /api/v1/babyfeed/:babyId/:modelPk
// @access    Private/Admin
exports.deleteOne = (Model) => {
  return asyncHandler(async (req, res) => {
    try {
      // Extract baby ID from the request params or body
      const { modelPk } = req.params;

      // Get the feed history for the specified baby
      const deleted = await Model.destroy({
        where: { id: modelPk, user_id: req.user.id },
      });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
};

// @desc      Delete all
// @route     DELETE /api/v1/babyfeed/:babyId
// @access    Private/Admin
exports.deleteAll = (Model) => {
  return asyncHandler(async (req, res) => {
    try {
      // Get the feed history for the specified baby
      const deleted = await Model.destroy({ where: { user_id: req.user.id } });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
};
