const asyncHandler = require("../../middleware/async");
const Baby = require("../../models/Baby");
const { where, col } = require("sequelize");
const BabyGallery = require("../../models/Baby_care_models/Baby_gallery");
const Media = require("../../models/Media");

// @desc      Upload babay image and title
// @route     POST /api/v1/babygallery
// @access    Private
exports.createBabyGallery = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  if (!req.files.length)
    res.status(200).json({ success: true, message: "please insert an image" });

  req.body.image = req.files[0].path;
  try {
    // Extract baby ID from the request params or body
    const { babyId } = req.params;

    // Check if the requesting mother owns the specified baby
    const baby = await Baby.findOne({
      where: { id: babyId, mother_id: req.user.id },
    });
    if (!baby) {
      return res.status(403).json({
        message: "Access denied. You are not the owner of this baby.",
      });
    }

    req.body.baby_id = babyId;
    console.log(req.body);
    // Get the feed history for the specified baby
    const babygallery = await BabyGallery.create(req.body);

    res.status(200).json({ success: true, data: babygallery });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

exports.getAll = asyncHandler(async (req, res, next) => {
  // Check if the requesting mother owns the specified baby
  const baby = await Baby.findOne({
    where: { id: req.params.babyId, mother_id: req.user.id },
  });
  if (!baby) {
    return res.status(403).json({
      success: false,
      message: "Access denied. You are not the owner of this baby.",
    });
  }

  const allPhoto = await BabyGallery.findAll({
    include: [
      {
        model: Media,
        as: "media",
        required: false,
      },
    ],
  });
  res.status(200).json({ success: true, data: allPhoto });
});

exports.getOne = asyncHandler(async (req, res, next) => {
  const { babyId, galleryId } = req.params;
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

  const allPhoto = await BabyGallery.findOne({
    where: { id: galleryId, baby_id: babyId },
    include: [
      {
        model: Media,
        as: "media",
        required: false,
      },
    ],
  });
  res.status(200).json({ success: true, data: allPhoto });
});

// @desc      Delete baby feed
// @route     DELETE /api/v1/babyfeed/:babyId/:babyFeedId
// @access    Private/Admin
exports.deleteBabyFeed = asyncHandler(async (req, res) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId, feedId } = req.params;

    // Check if the requesting mother owns the specified baby
    const baby = await Baby.findOne({
      where: { id: babyId, mother_id: req.user.id },
    });
    if (!baby) {
      return res.status(403).json({
        message: "Access denied. You are not the owner of this baby.",
      });
    }

    // Get the feed history for the specified baby
    const deleted = await BabyFeed.destroy({ where: { id: feedId } });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
