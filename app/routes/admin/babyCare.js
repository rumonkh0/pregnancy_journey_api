const express = require("express");
const {
  getHistory,
  getOne,
  update,
  create,
  deleteOne,
  deleteAll,
} = require("../../controllers/baby_care/baby_care_controller");
const BabyTemperature = require("../../models/Baby_care_models/Baby_temperature");
const Cvaccination = require("../../models/vaccination/Child_vaccination");

const router = express.Router();
const { protect, authorize } = require("../../middleware/auth");

router.use(protect);

const babyVaccine = () => {
  router.use(authorize("superadmin", "baby_vaccine"));
  router.get("/babyvaccination/:babyId", getHistory(Cvaccination));
  router.get("/babyvaccination/:babyId/:modelPk", getOne(Cvaccination));
  router.post("/babyvaccination/:babyId/", create(Cvaccination));
  router.put("/babyvaccination/:babyId/:modelPk", update(Cvaccination));
  router.delete("/babyvaccination/:babyId/:modelPk", deleteOne(Cvaccination));
  router.delete("/babyvaccination/:babyId", deleteAll(BabyTemperature));
};

babyVaccine();

const babyTemp = () => {
  router.get("/babytemp/:babyId", getHistory(BabyTemperature));
  router.get("/babytemp/:babyId/:modelPk", getOne(BabyTemperature));
  router.post("/babytemp/:babyId/", create(BabyTemperature));
  router.put("/babytemp/:babyId/:modelPk", update(BabyTemperature));
  router.delete("/babytemp/:babyId/:modelPk", deleteOne(BabyTemperature));
  router.delete("/babytemp/:babyId", deleteAll(BabyTemperature));
};

babyTemp();
module.exports = router;
