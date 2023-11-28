const asyncHandler = require("../../middleware/async");
const Baby = require("../../models/Baby");
const { where } = require("sequelize");

// @desc      Get  Baby Feed history of a baby
// @route     GET /api/v1/fabyfeed/:babyId
// @access    Private
exports.getHistory = (Model) => {
  return asyncHandler(async (req, res, next) => {
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
      const babyFeedsHistory = await Model.findAll({
        where: { baby_id: babyId },
      });

      res.status(200).json({ success: true, data: babyFeedsHistory });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
};

// @desc      Get single babyfeed
// @route     GET /api/v1/babyfeed/:babyId/:modelPk
// @access    Private
exports.getOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    try {
      // Extract baby ID from the request params or body
      const { babyId, modelPk } = req.params;

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
      const babyFeed = await Model.findByPk(modelPk);
      console.log(modelPk);

      res.status(200).json({ success: true, data: babyFeed });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
};

// @desc      Create baby feed
// @route     POST /api/v1/babyfeed/:babyId
// @access    Private
exports.create = (Model) => {
  return asyncHandler(async (req, res, next) => {
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
      const babyFeed = await Model.create(req.body);

      res.status(200).json({ success: true, data: babyFeed });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
};

// @desc      Update baby feed
// @route     PUT /api/v1/babyfeed/:babyId/:modelPk
// @access    Private
exports.update = (Model) => {
  return asyncHandler(async (req, res) => {
    try {
      // Extract baby ID from the request params or body
      const { babyId, modelPk } = req.params;

      // Check if the requesting mother owns the specified baby
      const baby = await Baby.findOne({
        where: { id: babyId, mother_id: req.user.id },
      });
      if (!baby) {
        return res.status(403).json({
          message: "Access denied. You are not the owner of this baby.",
        });
      }

      console.log(req.body);

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

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
};

// @desc      Delete baby feed
// @route     DELETE /api/v1/babyfeed/:babyId/:modelPk
// @access    Private/Admin
exports.deleteOne = (Model) => {
  return asyncHandler(async (req, res) => {
    try {
      // Extract baby ID from the request params or body
      const { babyId, modelPk } = req.params;

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
      const deleted = await Model.destroy({ where: { id: modelPk } });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
};

// @desc      Delete all baby feed
// @route     DELETE /api/v1/babyfeed/:babyId/
// @access    Private/Admin
exports.deleteAll = (Model) => {
  return asyncHandler(async (req, res) => {
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
      const deleted = await Model.destroy({ where: { baby_id: babyId } });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
};
