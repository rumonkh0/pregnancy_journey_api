const asyncHandler = require("../../../middleware/async");
const { Op } = require("sequelize");
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
    const fromDate = req.query.from_date;
    const toDate = req.query.to_date;

    // Construct the where condition based on the provided dates
    let whereCondition = { user_id: req.user.id };
    if (fromDate && toDate) {
      // If both from_date and to_date are provided, fetch records within the date range
      whereCondition = {
        ...whereCondition,
        createdAt: {
          [Op.between]: [fromDate, toDate],
        },
      };
    } else if (fromDate) {
      const startDate = new Date(fromDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(fromDate);
      endDate.setHours(23, 59, 59, 999);
      whereCondition = {
        ...whereCondition,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      };
    }

    console.log(whereCondition);

    const data = await Model.findAll({
      where: whereCondition,
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
exports.deleteOne = (Model, message) => {
  return asyncHandler(async (req, res) => {
    // Extract baby ID from the request params or body
    const { modelPk } = req.params;

    // Get the feed history for the specified baby
    const deleted = await Model.destroy({
      where: { id: modelPk, user_id: req.user.id },
    });

    res
      .status(200)
      .json({ success: true, message: message ? message : "deleted" });
  });
};

// @desc      Delete all
// @route     DELETE /api/v1/babyfeed/:babyId
// @access    Private/Admin
exports.deleteAll = (Model, message) => {
  return asyncHandler(async (req, res) => {
    // Get the feed history for the specified baby
    const deleted = await Model.destroy({ where: { user_id: req.user.id } });

    res
      .status(200)
      .json({ success: true, message: message ? message : "All data deleted" });
  });
};

// // @desc      Get  Baby get all as history
// // @route     GET /api/v1/route/:modelPk
// // @access    Private
// exports.getHistory = (Model) => {
//   return asyncHandler(async (req, res, next) => {
//     // Get the feed history for the specified baby
//     const history = await Model.findAll({
//       where: { user_id: req.user.id },
//       order: [["createdAt", "DESC"]],
//     });

//     if (history)
//       return res
//         .status(200)
//         .json({ success: true, message: "Data found", data: history });

//     res.status(200).json({ success: false, message: "Data not found" });
//   });
// };

// // @desc      Get single
// // @route     GET /api/v1/babyfeed/:babyId/:modelPk
// // @access    Private
// exports.getOne = (Model) => {
//   return asyncHandler(async (req, res, next) => {
//     // Get the feed history for the specified baby
//     const result = await Model.findOne({
//       where: { id: req.params.pk, user_id: req.user.id },
//     });

//     if (result)
//       return res
//         .status(200)
//         .json({ success: true, message: "Data found", data: result });

//     res.status(200).json({ success: false, message: "No Data found" });
//   });
// };

// // @desc      Create
// // @route     POST /api/v1/route/:babyId
// // @access    Private
// exports.create = (Model) => {
//   return asyncHandler(async (req, res, next) => {
//     req.body.user_id = req.user.id;
//     // Get the feed history for the specified baby
//     const data = await Model.create(req.body);

//     res.status(200).json({ success: true, message: "Data created", data });
//   });
// };

// // @desc      Update
// // @route     PUT /api/v1/babyfeed/:babyId/:modelPk
// // @access    Private
// exports.update = (Model) => {
//   return asyncHandler(async (req, res) => {
//     // Get the feed history for the specified baby
//     const updated = await Model.update(req.body, {
//       where: {
//         id: req.params.pk,
//         user_id: req.user.id,
//       },
//     });

//     if (!updated[0]) {
//       return res
//         .status(200)
//         .json({ success: false, message: "Recond not modified" });
//     }

//     res.status(200).json({ success: true, message: "Data updated" });
//   });
// };

// // @desc      Delete
// // @route     DELETE /api/v1/babyfeed/:babyId/:modelPk
// // @access    Private/Admin
// exports.deleteOne = (Model) => {
//   return asyncHandler(async (req, res, next) => {
//     // Get the feed history for the specified baby
//     const deleted = await Model.destroy({
//       where: { id: req.params.pk, user_id: req.user.id },
//     });

//     if (deleted)
//       return res.status(200).json({ success: true, message: "Data deleted" });

//     res.status(200).json({ success: false, message: "Data not found" });
//   });
// };

// // @desc      Delete all
// // @route     DELETE /api/v1/babyfeed/:babyId
// // @access    Private/Admin
// exports.deleteAll = (Model) => {
//   return asyncHandler(async (req, res) => {
//     // Get the feed history for the specified baby
//     const deleted = await Model.destroy({
//       where: { user_id: req.user.id },
//     });

//     res.status(200).json({ success: true, message: "All data deleted" });
//   });
// };
