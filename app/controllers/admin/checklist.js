const asyncHandler = require("../../middleware/async");
const { where } = require("sequelize");
const Checklist = require("../../models/tools/mother/Checklist");

// @desc      Get  Baby get all as history
// @route     GET /api/v1/route/history
// @access    Private
exports.getAllItem = (Model) => {
  return asyncHandler(async (req, res, next) => {
    var type = req.params.type;
    const data = await Model.findAll({
      where: { type },
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
exports.getOneSubItem = (Model) => {
  return asyncHandler(async (req, res, next) => {
    // Extract baby ID from the request params or body
    const { subitem } = req.params;

    // Get the feed history for the specified baby
    const data = await Model.findAll({
      where: {
        subitem,
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
exports.createItem = (Model) => {
  return asyncHandler(async (req, res, next) => {
    if (req.body.title.trim() == "") {
      return res
        .status(400)
        .json({ success: false, message: "Please Give a title" });
    }
    const babyFeed = await Model.create(req.body);
    res.status(200).json({ success: true, message: "Created", data: babyFeed });
  });
};

// @desc      UPDATE
// @route     POST /api/v1/route/:babyId
// @access    Private
exports.updateItem = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const babyFeed = await Model.update(req.body, {
      where: { id: req.params.id },
    });
    res
      .status(200)
      .json({ success: true, message: "Item Updated", data: babyFeed });
  });
};
// @desc      UPDATE
// @route     POST /api/v1/route/:babyId
// @access    Private
exports.deleteItem = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const babyFeed = await Model.delete({ where: { id: req.params.id } });
    res
      .status(200)
      .json({ success: true, message: "Item deleted", data: babyFeed });
  });
};

// @desc      Create
// @route     POST /api/v1/route/:babyId
// @access    Private
exports.createSubItem = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const babyFeed = await Model.create(req.body);

    res.status(200).json({ success: true, message: "Created", data: babyFeed });
  });
};

// @desc      Create
// @route     POST /api/v1/route/:babyId
// @access    Private
exports.createOne = (Model) => {
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
