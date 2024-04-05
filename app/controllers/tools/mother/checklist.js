const asyncHandler = require("../../../middleware/async");
const { where } = require("sequelize");

// @desc      Get  Baby get all as history
// @route     GET /api/v1/route/history
// @access    Private
exports.getAllItem = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const data = await Model.findAll({
      order: [["order", "DESC"]],
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
