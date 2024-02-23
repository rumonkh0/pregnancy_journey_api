const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const Baby = require("../models/Baby");
const asyncHandler = require("../middleware/async");
const Media = require("../models/Media");

// @desc      Get  Baby List Of Mother
// @route     GET /api/v1/babylist
// @access    Private
exports.getBabyList = asyncHandler(async (req, res, next) => {
  const babyList = await Baby.findAll({
    where: { mother_id: req.user.id },
    include: { model: Media, as: "media" },
  });
  res.json({ success: true, message: "Found babies", data: babyList });
});

// @desc      Get single baby
// @route     GET /api/v1/babylist/:id
// @access    Private
exports.getBaby = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const baby = await Baby.findAll({
    where: { id, mother_id: req.user.id },
    include: { model: Media, as: "media" },
  });
  if (!baby.length) {
    res.status(404).json({
      remark: "UNSUCCESSFULL",
      success: false,
      message: "Baby not found",
    });
    return;
  }
  res.status(200).json({ success: true, message: "Baby found", data: baby });
});

// @desc      Create baby
// @route     POST /api/v1/babylist
// @access    Private
exports.createBaby = asyncHandler(async (req, res, next) => {
  const babyData = req.body;
  babyData.mother_id = req.user.id;
  if (!req.file) {
    const baby = await Baby.create(babyData);
    return res
      .status(201)
      .json({ success: true, message: "Baby created", data: baby });
  }

  const { mimetype, filename, originalname, path: file_path } = req.file;
  // if (!mimetype.startsWith("image")) {
  //   return res.status(401).json({success: false, message: "File type must be image"})
  // }
  if (path.extname(originalname) == "image") {
    console.log("its a image");
  }
  console.log(req.file);
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
    babyData.photo = media.id;
    //delete previous photo
    // if (userWithMedia.media) {
    //   await unlinkAsync(userWithMedia.media.file_path);
    //   // await Media.destroy({ where: { id: user.photo } });
    // }
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

  let baby = await Baby.create(babyData);
  baby = await Baby.findByPk(baby.id, {
    include: { model: Media, as: "media" },
  });

  res.status(201).json({ success: true, message: "Baby created", data: baby });
});

// @desc      Update baby
// @route     PUT /api/v1/babylist/:id
// @access    Private
exports.updateBaby = asyncHandler(async (req, res) => {
  const id = req.params.babyId;
  const babyDetailsToUpdate = req.body;

  let baby = await Baby.findOne({ where: { id } });

  if (!req.file) {
    const updated = await Baby.update(babyDetailsToUpdate, {
      where: { id, mother_id: req.user.id },
    });
    if (!updated[0]) {
      return res
        .status(404)
        .json({ success: false, message: "Baby data not updated" });
    }

    baby = await Baby.findOne({ where: { id } });
    return res
      .status(200)
      .json({ success: true, message: "Baby updated", data: baby });
  }
  const { mimetype, filename, originalname, path: file_path } = req.file;
  // if (!mimetype.startsWith("image")) {
  //   return res.status(401).json({success: false, message: "File type must be image"})
  // }
  if (path.extname(originalname) == "image") {
    console.log("its a image");
  }
  console.log(req.file);
  req.media = {
    uploaded_by: req.user.username,
    file_path,
    mime_type: mimetype,
    file_name: filename,
    file_type: path.extname(filename).slice(1),
  };

  let media;
  try {
    userWithMedia = await Baby.findByPk(id, {
      include: [
        {
          model: Media,
          as: "media",
          required: false,
        },
      ],
    });

    media = await Media.create(req.media);
    babyDetailsToUpdate.photo = media.id;
    //delete previous photo
    // if (userWithMedia.media) {
    //   await unlinkAsync(userWithMedia.media.file_path);
    //   // await Media.destroy({ where: { id: user.photo } });
    // }
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

  updated = await Baby.update(babyDetailsToUpdate, {
    where: { id },
  });

  if (!updated[0]) {
    return res
      .status(304)
      .json({ success: false, message: "Recond no modified" });
  }

  babyData = await Baby.findByPk(id, {
    include: { model: Media, as: "media" },
  });

  res.status(200).json({
    success: true,
    message: "Data updated",
    data: babyData,
  });
});

// @desc      Delete baby
// @route     DELETE /api/v1/babylist/:id
// @access    Private/Admin
exports.deleteBaby = asyncHandler(async (req, res) => {
  const id = req.params.babyId;
  const deleted = await Baby.destroy({
    where: { id, mother_id: req.user.id },
  });
  if (!deleted) {
    res.status(404).json({ success: false, message: "Baby not found" });
    return;
  }
  res.json({ success: true, message: "Baby deleted" });
});
