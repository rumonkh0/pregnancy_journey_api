const Admin = require("../../models/Admin");
const path = require("path");
const fs = require("fs");
const asyncHandler = require("../../middleware/async");
const Role = require("../../models/Role");
const Media = require("../../models/Media");
const AdminRole = require("../../models/AdminRole");

// @desc      Get all admins
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getRoles = asyncHandler(async (req, res, next) => {
  const admins = await Role.findAll({ attributes: ["id", "role"] });
  res.status(200).json({ success: true, data: admins });
});

// @desc      Get all admins
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getAdmins = asyncHandler(async (req, res, next) => {
  if (res.advancedResults) return res.status(200).json(res.advancedResults);
  // try {
  const admins = await Admin.findAll({
    include: [
      {
        model: Role,
        attributes: ["role"],
      },
      {
        model: Media,
        as: "profile_photo",
        attributes: ["file_name", "file_path"],
      },
    ],
  });
  res.status(200).json({ success: true, data: admins });
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
});

// @desc      Get single admin
// @route     GET /api/v1/admins/:id
// @access    Private/Admin
exports.getAdmin = asyncHandler(async (req, res, next) => {
  const id = req.params.adminId;
  const admin = await Admin.findOne({
    where: { id },
    include: [
      {
        model: Role,
        attributes: ["role"],
      },
      {
        model: Media,
        as: "profile_photo",
        attributes: ["file_name", "file_path"],
      },
    ],
  });
  if (!admin) {
    res.status(404).json({ success: false, message: "Admin not found" });
    return;
  }
  res.status(200).json({ success: true, data: admin });
});

// @desc      Create admin
// @route     POST /api/v1/admins
// @access    Private/Admin
exports.createAdmin = asyncHandler(async (req, res, next) => {
  const adminData = req.body;
  const admin = await Admin.create(adminData);
  res
    .status(201)
    .json({ success: true, message: "Admin created", data: admin });
});

// @desc      Update admin
// @route     PUT /api/v1/admins/:id
// @access    Private/Admin
exports.updateAdmin = asyncHandler(async (req, res) => {
  const id = req.params.adminId;
  const newData = req.body;

  // Find the admin by id
  var admin = await Admin.findOne({
    where: { id },
    include: { model: Media, as: "profile_photo" },
  });

  if (!admin) {
    return res.status(404).json({
      success: false,
      message: "Admin not found",
      error: "Admin not found",
    });
  }
  let adminData;

  if (!req.file) {
    var updated = await Admin.update(newData, {
      where: {
        id,
      },
    });

    if (!updated[0]) {
      return res
        .status(304)
        .json({ success: false, message: "Recond no modified" });
    }

    adminData = await Admin.findByPk(id);

    return res.status(200).json({
      success: true,
      message: "Admin information updated successfully",
      data: adminData,
    });
  }

  const { mimetype, filename, path: file_path, originalname, size } = req.file;
  // console.log(req.file);
  req.media = {
    uploaded_by: req.admin.username,
    file_path,
    mime_type: mimetype,
    file_size: size,
    file_name: filename,
    original_name: originalname,
    file_type: path.extname(filename).slice(1),
  };

  let media, prevMedia;

  try {
    userWithMedia = await Admin.findByPk(id, {
      include: [
        {
          model: Media,
          as: "profile_photo",
          required: false,
        },
      ],
    });

    media = await Media.create(req.media);
    newData.photo = media.id;
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

  updated = await Admin.update(newData, { where: { id } });
  admin = await Admin.findByPk(id, {
    include: { model: Media, as: "profile_photo" },
  });
  if (!updated[0]) {
    res.status(404).json({ success: "false", message: "Admin not found" });
    return;
  }
  res
    .status(200)
    .json({ success: true, message: "Admin updated", data: { admin } });
});

// @desc      Update admin
// @route     PUT /api/v1/admins/:id
// @access    Private/Admin
exports.updateAdminRole = asyncHandler(async (req, res) => {
  const adminId = req.params.adminId;
  const roleId = req.params.roleId;

  const prev = await AdminRole.findOne({
    where: { admin_id: adminId, role_id: roleId },
  });

  if (prev) {
    await AdminRole.destroy({ where: { admin_id: adminId, role_id: roleId } });
  } else {
    await AdminRole.create({ admin_id: adminId, role_id: roleId });
  }

  res.status(200).json({ success: true, message: "Role updated" });
});

// @desc      Delete admin
// @route     DELETE /api/v1/admins/:id
// @access    Private/Admin
exports.deleteAdmin = asyncHandler(async (req, res) => {
  const id = req.params.adminId;
  const deleted = await Admin.destroy({ where: { id } });
  if (!deleted) {
    res.status(404).json({ success: false, message: "Admin not found" });
    return;
  }
  res.json({ success: true, message: "Admin deleted" });
});
