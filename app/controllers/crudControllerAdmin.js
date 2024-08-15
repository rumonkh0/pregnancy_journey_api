///this controller for users
const asyncHandler = require("../middleware/async");
const Media = require("../models/Media");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const { where } = require("sequelize");

// @desc      Get  Get all data
// @route     GET /api/v1/route/history
// @access    Private
exports.getHistory = (Model, message) => {
  return asyncHandler(async (req, res, next) => {
    if (res.advancedResults) return res.status(200).json(res.advancedResults);
    const data = await Model.findAll();
    if (!data) {
      return res.status(403).json({
        remark: "FAILED",
        success: false,
        message: "No record found.",
      });
    }

    // Get the feed history for the specified baby
    res
      .status(200)
      .json({ remark: "SUCCESSFUL", success: true, message, data });
  });
};

// @desc      Get single
// @route     GET /api/v1/route/:modelPk
// @access    Private
exports.getOne = (Model, message, include) => {
  return asyncHandler(async (req, res, next) => {
    // Extract baby ID from the request params or body
    const { modelPk } = req.params;

    // Get single data for the specified model
    const data = await Model.findOne({
      where: {
        id: modelPk,
      },
      include: include ? include : null,
    });

    res.status(200).json({ success: true, message, data });
  });
};

// @desc      Create
// @route     POST /api/v1/route/:babyId
// @access    Private
exports.create = (Model, message) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.file) {
      const data = await Model.create(req.body);
      return res.status(200).json({ success: true, message, data });
    }

    const {
      mimetype,
      filename,
      originalname,
      path: file_path,
      size,
    } = req.file;

    req.media = {
      uploaded_by: req.admin.username,
      file_path,
      mime_type: mimetype,
      file_size: size,
      file_name: filename,
      original_name: originalname,
      file_type: path.extname(filename).slice(1),
    };

    let media;
    try {
      media = await Media.create(req.media);
      req.body.image = media.id;
    } catch (err) {
      console.log(err);
      if (req.file && req.file.path) {
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

    let data = await Model.create(req.body);
    data = await Model.findByPk(data.id, {
      include: { model: Media, as: "media" },
    });

    res.status(201).json({ success: true, message, data: data });
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
    if (!req.file) {
      const updated = await Model.update(req.body, {
        where: {
          id: modelPk,
        },
      });

      if (!updated[0]) {
        return res
          .status(400)
          .json({ success: false, message: "Record not modified" });
      }

      return res.status(200).json({ success: true, message });
    }

    let media, userWithMedia;

    try {
      userWithMedia = await Model.findByPk(modelPk, {
        include: [
          {
            model: Media,
            as: "media",
            required: false,
          },
        ],
      });

      //delete previous photo
      if (userWithMedia.media) {
        try {
          await unlinkAsync(userWithMedia.media.file_path);
          await Media.destroy({ where: { id: userWithMedia.image } });
        } catch (error) {}
      }
    } catch (err) {
      return res.status(400).json({
        remark: "UNSUCCESSFULL",
        success: false,
        message: "Previous media data remove failed",
        err,
      });
    }

    const {
      mimetype,
      filename,
      originalname,
      path: file_path,
      size,
    } = req.file;

    req.media = {
      uploaded_by: req.admin.username,
      file_path,
      mime_type: mimetype,
      file_size: size,
      file_name: filename,
      original_name: originalname,
      file_type: path.extname(filename).slice(1),
    };

    try {
      media = await Media.create(req.media);
      req.body.image = media.id;
    } catch (err) {
      console.log(err);
      if (req.file && req.file.path) {
        const filePath = req.file.path;
        await unlinkAsync(filePath);
      }
      return res.status(400).json({
        remark: "UNSUCCESSFULL",
        success: false,
        message: "data upload failed",
        error: err,
      });
    }

    const updated = await Model.update(req.body, {
      where: {
        id: modelPk,
      },
    });

    if (!updated[0]) {
      return res
        .status(400)
        .json({ success: false, message: "Record not modified" });
    }

    return res.status(200).json({ success: true, message });
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
