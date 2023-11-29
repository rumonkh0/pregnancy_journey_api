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

const router = express.Router();
const { protect } = require("../../middleware/auth");

// Retrieve data from related tables based on baby_id and sort by createdAt
const getCombinedBabyData = async (req, res, next) => {
  try {
    const babyData = await BabyList.findOne({
      where: {
        id: req.params.babyId,
        mother_id: req.user.id,
      },
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
    res.status(200).json({ data: combinedData });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

router.use(protect);
router.get("/:babyId", getCombinedBabyData);
module.exports = router;
