const asyncHandler = require("../middleware/async");
const { where } = require("sequelize");

/*
|-----------------------------------------------------------------------------------------------|
|                                                                                               |
|  This Controller Is For General Use Which Have Multilingual Field And Users Can Get Any Data  |
|                                                                                               |
|-----------------------------------------------------------------------------------------------|
*/

exports.stringify = (...fields) => {
  return asyncHandler(async (req, res, next) => {
    if (req.body)
      fields.map((field) => {
        if (req.body[field]) {
          req.body[field] = JSON.stringify(req.body[field]);
        }
      });
    next();
  });
};

// @desc      Get  Baby get all as history
// @route     GET /api/v1/route/history
// @access    Private
exports.getAll = (Model) => {
  return asyncHandler(async (req, res, next) => {
    lan = req.query.lan;
    const data = await Model.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (!data) {
      return res.status(403).json({
        success: false,
        message: "no record found.",
      });
    }

    const newData = data.map((obj) => {
      obj.setDataValue("title", JSON.parse(obj.title)[lan || "en"]);
      obj.setDataValue("description", JSON.parse(obj.description)[lan || "en"]);
      return obj;
    });

    // Get the feed history for the specified baby
    res.status(200).json({ success: true, data: newData });
  });
};

// @desc      Get single
// @route     GET /api/v1/route/:modelPk
// @access    Private
exports.getOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const lan = req.query.lan;
    // Extract baby ID from the request params or body
    const { modelPk } = req.params;

    // Get the feed history for the specified baby
    const data = await Model.findOne({
      where: { id: modelPk },
    });

    if (!data) {
      return res
        .status(200)
        .json({ success: false, message: "Data not found" });
    }

    data.title = JSON.parse(data.title)[lan || "en"];
    data.description = JSON.parse(data.description)[lan || "en"];

    res.status(200).json({ success: true, message: "Data found", data });
  });
};

// @desc      Create
// @route     POST /api/v1/route/:babyId
// @access    Private
exports.create = (Model) => {
  return asyncHandler(async (req, res, next) => {
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
      where: { id: modelPk },
    });

    if (!updated[0]) {
      return res
        .status(200)
        .json({ success: false, message: "Record no modified" });
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
      where: { id: modelPk },
    });

    res.status(200).json({ success: true, message: "deleted" });
  });
};

// @desc      Delete all
// @route     DELETE /api/v1/babyfeed/:babyId
// @access    Private/Admin
// exports.deleteAll = (Model) => {
//   return asyncHandler(async (req, res) => {
//     // Get the feed history for the specified baby
//     const deleted = await Model.destroy({ where: { user_id: req.user.id } });

//     res.status(200).json({ success: true, message: "All data deleted" });
//   });
// };
