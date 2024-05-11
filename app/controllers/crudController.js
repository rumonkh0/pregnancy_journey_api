const asyncHandler = require("../middleware/async");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const { where } = require("sequelize");
const Media = require("../models/Media");

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
        if (req.body[field] && typeof req.body[field] == "object") {
          // console.log(typeof req.body[field]);
          req.body[field] = JSON.stringify(req.body[field]);
        }
      });
    next();
  });
};

// exports.stringify = (...fields) => {
//   return asyncHandler(async (req, res, next) => {
//     const news = req.body.map((obj) => {
//       obj.title = JSON.stringify(obj.title);
//       obj.description = JSON.stringify(obj.description);
//       return obj;
//     });
//     // if (req.body)
//     //   fields.map((field) => {
//     //     if (req.body[field]) {
//     //       req.body[field] = JSON.stringify(req.body[field]);
//     //     }
//     //   });
//     next();
//   });
// };

// @desc      Get  Baby get all as history
// @route     GET /api/v1/route/history
// @access    Private
exports.getAll = (Model, include) => {
  return asyncHandler(async (req, res, next) => {
    if (res.advancedResults) return res.status(200).json(res.advancedResults);

    // console.log("ayyyyyyyyyyyy")

    lan = req.query.lan;
    const data = await Model.findAll({
      order: [["createdAt", "DESC"]],
      include: { model: Media, as: "media" },
    });

    if (!data) {
      return res.status(403).json({
        success: false,
        message: "no record found.",
      });
    }

    const newData = data.map((obj) => {
      obj.setDataValue(
        "title",
        obj.title &&
          (JSON.parse(obj.title)[lan]
            ? JSON.parse(obj.title)[lan]
            : JSON.parse(obj.title)["en"])
      );
      obj.setDataValue(
        "description",
        obj.description &&
          (JSON.parse(obj.description)[lan]
            ? JSON.parse(obj.description)[lan]
            : JSON.parse(obj.description)["en"])
      );
      return obj;
    });

    // Get the feed history for the specified baby
    res.status(200).json({ success: true, data: newData });
  });
};

// @desc      Get single
// @route     GET /api/v1/route/:modelPk
// @access    Private
exports.getOne = (Model, include) => {
  return asyncHandler(async (req, res, next) => {
    const lan = req.query.lan;
    // Extract baby ID from the request params or body
    const { modelPk } = req.params;

    // Get the feed history for the specified baby
    const data = await Model.findOne({
      where: { id: modelPk },
      include: { model: Media, as: "media" },
    });

    if (!data) {
      return res
        .status(200)
        .json({ success: false, message: "Data not found" });
    }

    if (lan == "all") {
      data.setDataValue("title", JSON.parse(data.title));
      data.setDataValue("description", JSON.parse(data.description));
    } else {
      data.setDataValue(
        "title",
        JSON.parse(data.title)[lan]
          ? JSON.parse(data.title)[lan]
          : JSON.parse(data.title)["en"]
      );
      data.setDataValue(
        "description",
        JSON.parse(data.description)[lan]
          ? JSON.parse(data.description)[lan]
          : JSON.parse(data.description)["en"]
      );
    }

    res.status(200).json({ success: true, message: "Data found", data });
  });
};

// @desc      Create
// @route     POST /api/v1/route/:babyId
// @access    Private
exports.create = (Model) => {
  return asyncHandler(async (req, res, next) => {
    let data = req.body;
    // console.log(req.body);
    // console.log(req.file);
    if (!req.file) {
      let result = await Model.create(data);

      return res.status(200).json({
        success: true,
        message: "Content created successfully",
        data: result,
      });
    }

    const { mimetype, filename, path: file_path } = req.file;
    req.media = {
      uploaded_by: req.admin.username,
      file_path,
      mime_type: mimetype,
      file_name: filename,
      file_type: path.extname(filename).slice(1),
    };

    let media, prevMedia;
    try {
      media = await Media.create(req.media);
      data.image = media.id;
    } catch (err) {
      if (req.file && req.file && req.file.path) {
        const filePath = req.file.path;
        await unlinkAsync(filePath);
      }
      return res.status(200).json({
        remark: "UNSUCCESSFULL",
        success: false,
        message: "data upload failed",
        error: err,
      });
    }
    const result = await Model.create(data);

    res.status(200).json({ success: true, message: "Created", data: result });
  });
};

// @desc      Update
// @route     PUT /api/v1/babyfeed/:babyId/:modelPk
// @access    Private
exports.update = (Model) => {
  return asyncHandler(async (req, res) => {
    var updated;
    let fieldUpdates = req.body;
    // Extract baby ID from the request params or body
    const { modelPk } = req.params;
    // Get the feed history for the specified baby
    if (!req.file) {
      updated = await Model.update(req.body, {
        where: { id: modelPk },
      });

      if (!updated[0]) {
        return res
          .status(200)
          .json({ success: false, message: "Record not modified" });
      }

      return res.status(200).json({ success: true, message: "Record updated" });
    }

    const { mimetype, filename, path: file_path } = req.file;
    req.media = {
      uploaded_by: req.admin.username,
      file_path,
      mime_type: mimetype,
      file_name: filename,
      file_type: path.extname(filename).slice(1),
    };

    let media, prevMedia;

    try {
      userWithMedia = await Model.findByPk(id, {
        include: [
          {
            model: Media,
            as: "media",
            required: false,
          },
        ],
      });

      media = await Media.create(req.media);
      req.body.image = media.id;
      //delete previous photo
      if (userWithMedia.media) {
        try {
          await unlinkAsync(userWithMedia.media.file_path);
        } catch (error) {}
        await Media.destroy({ where: { id: user.photo } });
      }
    } catch (err) {
      if (req.file && req.file && req.file.path) {
        const filePath = req.file.path;
        await unlinkAsync(filePath);
      }
      return res.status(200).json({
        remark: "UNSUCCESSFULL",
        success: false,
        message: "data upload failed",
        error: err,
      });
    }

    updated = await Model.update(req.body, {
      where: {
        id: modelPk,
      },
    });

    if (!updated[0]) {
      return res
        .status(304)
        .json({ success: false, message: "Recond no modified" });
    }
    res.status(200).json({
      success: true,
      message: "Data updated",
    });
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
