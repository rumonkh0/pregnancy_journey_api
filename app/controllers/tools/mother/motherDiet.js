const asyncHandler = require("../../../middleware/async");
const { where } = require("sequelize");

//check owner of the model
exports.checkOwner = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { modelPk } = req.params;

    if (!req.user)
      return res.status(200).json({
        remark: "UNAUTORIZED",
        success: false,
        message: "Not authorized for access this route",
      });

    // Check if the requesting mother owns the specified baby
    const baby = await Model.findOne({
      where: { id: modelPk, user_id: req.user.id },
    });

    if (!baby) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not the owner of this data.",
      });
    }

    next();
  });

// @desc      Get  Baby get all as history
// @route     GET /api/v1/route/history
// @access    Private
exports.getHistory = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const data = await Model.findAll({
      where: { user_id: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    if (!data) {
      return res.status(403).json({
        success: false,
        message: "no record found.",
      });
    }
    // Get the feed history for the specified baby
    res.status(200).json({ success: true, message: "Data found", data });
  });
};

// @desc      Get single
// @route     GET /api/v1/route/:modelPk
// @access    Private
exports.getOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    // Extract baby ID from the request params or body
    const { modelPk } = req.params;

    // Get the feed history for the specified baby
    const data = await Model.findOne({
      where: {
        id: modelPk,
        user_id: req.user.id,
      },
    });

    if (!data) {
      return res
        .status(200)
        .json({ success: false, message: "Data not found" });
    }

    res.status(200).json({ success: true, message: "Data found", data });
  });
};

// @desc      Create
// @route     POST /api/v1/route/:babyId
// @access    Private
exports.create = (Model) => {
  return asyncHandler(async (req, res, next) => {
    // Extract baby ID from the request params or body
    const { babyId } = req.params;

    // Get the feed history for the specified baby
    req.body.user_id = req.user.id;
    const babyFeed = await Model.create(req.body);

    res.status(200).json({ success: true, message: "Created", data: babyFeed });
  });
};

// @desc      Update
// @route     PUT /api/v1/babyfeed/:babyId/:modelPk
// @access    Private
exports.update = (Model) => {
  return asyncHandler(async (req, res) => {
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
        .json({ success: false, message: "Record not modified" });
    }

    res.status(200).json({ success: true, message: "updated" });
  });
};

// @desc      Delete
// @route     DELETE /api/v1/babyfeed/:babyId/:modelPk
// @access    Private/Admin
exports.deleteOne = (Model) => {
  return asyncHandler(async (req, res) => {
    // Extract baby ID from the request params or body
    const { modelPk } = req.params;

    // Get the feed history for the specified baby
    const deleted = await Model.destroy({
      where: { id: modelPk, user_id: req.user.id },
    });

    res.status(200).json({ success: true, message: "deleted" });
  });
};

// @desc      Delete all
// @route     DELETE /api/v1/babyfeed/:babyId
// @access    Private/Admin
exports.deleteAll = (Model) => {
  return asyncHandler(async (req, res) => {
    // Get the feed history for the specified baby
    const deleted = await Model.destroy({ where: { user_id: req.user.id } });

    res.status(200).json({ success: true, message: "All data deleted" });
  });
};
