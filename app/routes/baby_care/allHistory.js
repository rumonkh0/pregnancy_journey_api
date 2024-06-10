const express = require("express");
const BabyList = require("../../models/Baby");
const BabySleep = require("../../models/Baby_care_models/Baby_sleep");
const BabyPump = require("../../models/Baby_care_models/Baby_breast_pumping");
const BabyDiaper = require("../../models/Baby_care_models/Baby_diaper");
const babyFeed = require("../../models/Baby_care_models/Baby_feed");
const BabyMedication = require("../../models/Baby_care_models/Baby_medication");
const BabyNote = require("../../models/Baby_care_models/Baby_note");
const babySymptom = require("../../models/Baby_care_models/Baby_symptom");
const BabyTemp = require("../../models/Baby_care_models/Baby_temperature");
const { Op } = require("sequelize");

const router = express.Router();
const { protect } = require("../../middleware/auth");

// Retrieve data from related tables based on baby_id and sort by createdAt
const getCombinedBabyData = async (req, res, next) => {
  try {
    const fromDate = req.query.from_date; // Get the 'from_date' query parameter
    const toDate = req.query.to_date; // Get the 'to_date' query parameter

    const whereCondition = {
      id: req.params.babyId,
      mother_id: req.user.id,
    };

    // Add date filtering conditions if 'from_date' and 'to_date' are provided
    if (fromDate && toDate) {
      whereCondition.createdAt = {
        [Op.between]: [fromDate, toDate],
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
    const babyData = await BabyList.findOne({
      where: whereCondition,
      include: [
        { model: BabySleep },
        { model: BabyPump },
        { model: BabyDiaper },
        { model: babyFeed },
        { model: BabyMedication },
        { model: BabyNote },
        { model: babySymptom },
        { model: BabyTemp },
      ],
    });

    if (!babyData) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not the mother of this baby.",
      });
    }

    // Access related data using babyData
    const combinedData = [];
    const pushData = (table) => {
      if (babyData[table]) {
        let Objects = babyData[table].map((obj) => ({
          ...obj.toJSON(),
          type: table,
        }));
        combinedData.push(...Objects);
      }
    };
    // Push related data from other tables
    pushData("baby_sleeps");
    pushData("baby_breast_pumpings");
    pushData("baby_diapers");
    pushData("baby_feeds");
    pushData("baby_medications");
    pushData("baby_notes");
    pushData("baby_symptoms");
    pushData("baby_temperatures");

    // Sort the combined array by createdAt
    combinedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    res.status(200).json({
      success: true,
      message: "Filtered result prepared",
      data: combinedData,
    });
  } catch (error) {
    // console.error("Error:", error);
    throw error;
  }
};

router.use(protect);
router.get("/:babyId", getCombinedBabyData);
module.exports = router;
