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
  console.log(req.params.babyId);
  try {
    const babyData = await BabyList.findByPk(req.params.babyId, {
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
      //   order: [[{ model: BabySleep }, 'createdAt', 'ASC']], // Sort by BabySleep's createdAt field
    });

    // Access related data using babyData
    const combinedData = [];
    const pushFunc = (table) => {
      if (babyData[table]) {
        let Objects = babyData[table].map((obj) => ({
          ...obj.toJSON(),
          type: table,
        }));
        combinedData.push(...Objects);
      }
    };
    // Push related data from other tables
    pushFunc("baby_sleeps");
    pushFunc("baby_breast_pumpings");
    pushFunc("baby_diapers");
    pushFunc("baby_feeds");
    pushFunc("baby_medications");
    pushFunc("baby_notes");
    pushFunc("baby_symptoms");
    pushFunc("baby_temperatures");

    // Sort the combined array by createdAt
    combinedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    res.status(200).json({ data: combinedData });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// router.use(protect);
router.get("/:babyId", getCombinedBabyData);
module.exports = router;
