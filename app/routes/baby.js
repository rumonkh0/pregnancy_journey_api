const express = require("express");
const { getBabyList, getBaby, createBaby, updateBaby, deleteBaby } = require("../controllers/baby");
const User = require("../models/Baby");
const router = express.Router({ mergeParams: true });
const { protect } = require("../middleware/auth");

router.use(protect);
router.get("/", getBabyList);
router.get("/:id", getBaby);
router.post("/", createBaby);
router.put("/:babyId", updateBaby);
router.delete("/:babyId", deleteBaby);

module.exports = router;
