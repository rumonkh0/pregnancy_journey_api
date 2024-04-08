const asyncHandler = require("../../../middleware/async");
const { where } = require("sequelize");
const Checklist = require("../../../models/tools/mother/Checklist");

// @desc      Get  Baby get all as history
// @route     GET /api/v1/route/history
// @access    Private
exports.getAllItem = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const data = await Model.findAll({
      where: {
        type: req.params.type,
      },
      order: [["order", "ASC"]],
    });
    if (!data) {
      return res.status(403).json({
        success: false,
        message: "no record found.",
      });
    }
    // Get the feed history for the specified baby
    res.status(200).json({ success: true, data });
  });
};

// @desc      Get single
// @route     GET /api/v1/route/:modelPk
// @access    Private
exports.getOneItem = (Model) => {
  return asyncHandler(async (req, res, next) => {
    // Extract baby ID from the request params or body
    const { item } = req.params;

    // Get the feed history for the specified baby
    const data = await Model.findAll({
      where: {
        item,
      },
      include: {
        model: Checklist,
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

// @desc      Get single
// @route     GET /api/v1/route/:modelPk
// @access    Private
exports.postValues = (Model) => {
  return asyncHandler(async (req, res, next) => {
    req.body.user_id = req.user.id;
    req.body.check_values = JSON.stringify(req.body.check_values);

    var data = await Model.findByPk(req.user.id);
    if (data)
      data = await Model.update(req.body, { where: { user_id: req.user.id } });
    else data = await Model.create(req.body);

    data = await Model.findByPk(req.user.id);
    data.check_values = JSON.parse(data.check_values);

    res.status(200).json({
      success: true,
      data,
    });
  });
};

// @desc      Get single
// @route     GET /api/v1/route/:modelPk
// @access    Private
exports.getValues = (Model) => {
  return asyncHandler(async (req, res, next) => {
    req.body.check_values = JSON.stringify(req.body.check_values);

    const data = await Model.findOne({ where: { user_id: req.user.id } });
    data.check_values = JSON.parse(data.check_values);

    res.status(200).json({
      success: true,
      values: data,
    });
  });
};
