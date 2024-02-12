const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const asyncHandler = require("../../middleware/async");
const Baby = require("../../models/Baby");
const { where } = require("sequelize");
const BabyGallery = require("../../models/Baby_care_models/Baby_gallery");
const Media = require("../../models/Media");

//Check baby owner middleware
exports.checkBabyOwner = asyncHandler(async (req, res, next) => {
  const { babyId } = req.params;

  // Check if the requesting mother owns the specified baby
  const baby = await Baby.findOne({
    where: { id: babyId, mother_id: req.user.id },
  });

  if (!baby) {
    return res.status(403).json({
      success: false,
      message: "Access denied. You are not the owner of this baby.",
    });
  }

  next();
});

// @desc      Get all babay image and title
// @route     POST /api/v1/babygallery/:babyId
// @access    Private
exports.getAll = asyncHandler(async (req, res, next) => {
  const { babyId } = req.params;

  const allPhoto = await BabyGallery.findAll({
    where: { baby_id: babyId },
    include: [
      {
        model: Media,
        as: "media",
        required: false,
      },
    ],
  });
  res
    .status(200)
    .json({ success: true, message: "Data found", data: allPhoto });
});

// @desc      Get single babay image and title
// @route     POST /api/v1/babygallery/:babyId/:modelPk
// @access    Private
exports.getOne = asyncHandler(async (req, res, next) => {
  const { babyId, modelPk } = req.params;

  const allPhoto = await BabyGallery.findOne({
    where: { id: modelPk, baby_id: babyId },
    include: [
      {
        model: Media,
        as: "media",
        required: false,
      },
    ],
  });
  res
    .status(200)
    .json({ success: true, message: "Data found", data: allPhoto });
});

// @desc      Upload babay image and title
// @route     POST /api/v1/babygallery
// @access    Private
exports.createBabyGallery = asyncHandler(async (req, res, next) => {
  if (!req.file)
    return res
      .status(200)
      .json({ success: false, message: "please insert an image" });
  const { mimetype, filename, path: file_path } = req.file;

  req.body.image = req.file.path;

  req.media = {
    uploaded_by: req.user.username,
    file_path,
    mime_type: mimetype,
    file_name: filename,
    file_type: path.extname(filename).slice(1),
  };
  let media;
  try {
    media = await Media.create(req.media);
  } catch (err) {
    if (req.file && req.file && req.file.path) {
      const filePath = req.file.path;
      await unlinkAsync(filePath);
    }
    return res.status(200).json({ success: false, message: err });
  }
  // Extract baby ID from the request params or body
  const { babyId } = req.params;

  req.body.baby_id = babyId;
  req.body.file_id = media.id;
  // Get the feed history for the specified baby
  const babygallery = await BabyGallery.create(req.body);

  res
    .status(200)
    .json({ success: true, message: "Data created", data: babygallery });
});

// @desc      update babay image and title
// @route     PUT /api/v1/babygallery
// @access    Private
exports.updateBabyGallery = asyncHandler(async (req, res, next) => {
  let babygallery;
  const { babyId, modelPk } = req.params;

  if (!req.files.length) {
    babygallery = await BabyGallery.update(req.body, {
      where: { id: modelPk, baby_id: babyId },
    });

    if (!babygallery[0]) {
      return res
        .status(304)
        .json({ success: false, message: "Recond no modified" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Baby updated", data: babygallery });
  }

  const { mimetype, filename, path: file_path } = req.files[0];
  req.body.image = req.files[0].path;

  req.media = {
    uploaded_by: req.user.username,
    file_path,
    mime_type: mimetype,
    file_name: filename,
    file_type: path.extname(filename).slice(1),
  };

  let media, prevMedia;
  try {
    babygallery = await BabyGallery.findByPk(modelPk, {
      include: [
        {
          model: Media,
          as: "media",
          required: false,
        },
      ],
    });
    media = await Media.create(req.media);
    req.body.file_id = media.id;
    //delete previous photo
    if (babygallery.media) {
      await unlinkAsync(babygallery.media.file_path);
      await Media.destroy({ where: { id: babygallery.file_id } });
    }
  } catch (err) {
    if (req.files && req.files[0] && req.files[0].path) {
      const filePath = req.files[0].path;
      await unlinkAsync(filePath);
    }
    return res
      .status(200)
      .json({ success: false, message: "Data not updated", message: err });
  }

  req.body.baby_id = babyId;
  babygallery = await BabyGallery.update(req.body, {
    where: { id: modelPk },
  });

  res
    .status(200)
    .json({ success: true, message: "Data updated", data: babygallery });
});

// @desc      Delete baby feed
// @route     DELETE /api/v1/babyfeed/:babyId/:babyFeedId
// @access    Private/Admin
exports.deleteBabygallery = asyncHandler(async (req, res) => {
  // Extract baby ID from the request params or body
  const { babyId, modelPk } = req.params;

  const gallery = await BabyGallery.findOne({
    where: { id: modelPk, baby_id: babyId },
    include: [
      {
        model: Media,
        as: "media",
        required: false,
      },
    ],
  });

  if (!gallery)
    return res.status(200).json({ success: false, message: "data not found" });

  // Get the feed history for the specified baby
  const deleted = await BabyGallery.destroy({ where: { id: modelPk } });
  if (gallery.media) {
    await Media.destroy({ where: { id: file_id } });
    await unlinkAsync(file_path);
  }

  res
    .status(200)
    .json({ success: true, message: "Data deleted", data: deleted });
});
