const BabySymptom = require("../../models/Baby_care_models/Baby_symptom");
const asyncHandler = require("../../middleware/async");
const Baby = require("../../models/Baby");
const { where } = require("sequelize");

// @desc      Get  Baby Feed history of a baby
// @route     GET /api/v1/symptom/:babyId
// @access    Private
exports.getBabySymptomsHistory = asyncHandler(async (req, res, next) => {
  try {
    // Extract baby ID from the request params or body
    const { symptomId } = req.params;

    // Check if the requesting mother owns the specified baby
    const baby = await Baby.findOne({
      where: { id: symptomId, mother_id: req.user.id },
    });
    if (!baby) {
      return res.status(403).json({
        message: "Access denied. You are not the owner of this baby.",
      });
    }

    // Get the feed history for the specified baby
    const babySymptomHistory = await BabySymptom.findAll({
      where: { baby_id: symptomId },
    });

    res.status(200).json({ success: true, data: babySymptomHistory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Get single symptom
// @route     GET /api/v1/symptom/:symptomId/
// @access    Private
exports.getSingleSymptom = asyncHandler(async (req, res, next) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId, symptomId } = req.params;

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
    const symptom = await BabySymptom.findByPk(symptomId);

    res.status(200).json({ success: true, data: symptom });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Create baby feed
// @route     POST /api/v1/symptom/:symptomId
// @access    Private
exports.createBabySymptom = asyncHandler(async (req, res, next) => {
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
    // Get the feed history for the specified baby
    const symptom = await BabySymptom.create(req.body);

    res.status(200).json({ success: true, data: symptom });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Update baby feed
// @route     PUT /api/v1/symptom/:symptomId/:symptomId
// @access    Private
exports.updateBabySymptom = asyncHandler(async (req, res) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId, symptomId } = req.params;

    // Check if the requesting mother owns the specified baby
    const baby = await Baby.findOne({
      where: { id: symptomId, mother_id: req.user.id },
    });
    if (!baby) {
      return res.status(403).json({
        message: "Access denied. You are not the owner of this baby.",
      });
    }

    // Get the feed history for the specified baby
    const updated = await BabySymptom.update(req.body, {
      where: {
        id: symptomId,
      },
    });

    if (!updated[0]) {
      return res
        .status(304)
        .json({ success: fase, message: "Recond no modified" });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Delete baby feed
// @route     DELETE /api/v1/symptom/:symptomId/:symptomId
// @access    Private/Admin
exports.deleteBabySymptom = asyncHandler(async (req, res) => {
  try {
    // Extract baby ID from the request params or body
    const { babyId, symptomId } = req.params;

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
    const deleted = await BabySymptom.destroy({ where: { id: symptomId } });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc      Delete all baby feed
// @route     DELETE /api/v1/symptom/:symptomId/
// @access    Private/Admin
exports.deleteAllBabySymptom = asyncHandler(async (req, res) => {
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

    // Get the feed history for the specified baby
    const deleted = await BabySymptom.destroy({
      where: { baby_id: babyId },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
